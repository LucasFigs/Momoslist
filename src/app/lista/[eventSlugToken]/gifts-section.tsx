import { expiredReservationWhere } from "@/lib/reservation-policy";
import { safeStoreUrl } from "@/lib/store-url";
import { prisma } from "@/lib/prisma";
import {
  computeGiftAvailability,
  ACTIVE_RESERVATION_STATUSES,
} from "@/lib/gift-availability";
import { formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import { GiftCard } from "./gift-card";
import { FundCard } from "./fund-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift as GiftIcon, SearchX } from "lucide-react";
import type { Gift } from "@prisma/client";
import type { Guest } from "@prisma/client";

interface GiftsSectionProps {
  gifts: Gift[];
  guest: Guest | null;
  isIdentified: boolean;
  query: string;
  sort: string;
  /** URL da própria lista, sem parâmetros — destino do "Limpar busca". */
  clearHref: string;
  /** O casal cadastrou a chave Pix? Sem ela ninguém consegue contribuir com uma vaquinha. */
  pixConfigured: boolean;
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export async function GiftsSection({
  gifts,
  guest,
  isIdentified,
  query,
  sort,
  clearHref,
  pixConfigured,
}: GiftsSectionProps) {
  const giftIds = gifts.map((gift) => gift.id);

  // Rendering never writes. Expired unpaid holds do not consume stock.
  const expired = expiredReservationWhere();
  const fundIds = gifts
    .filter((gift) => gift.kind === "FUND")
    .map((gift) => gift.id);
  const activeContributionStatuses = ["DECLARED", "CONFIRMED"] as const;
  const [activeCounts, myReservations, contributionSums, myContributionRows] =
    await Promise.all([
      giftIds.length
        ? prisma.giftReservation.groupBy({
            by: ["giftId"],
            where: {
              giftId: { in: giftIds },
              status: { in: [...ACTIVE_RESERVATION_STATUSES] },
              NOT: expired,
            },
            _count: { _all: true },
          })
        : [],
      guest && giftIds.length
        ? prisma.giftReservation.findMany({
            where: {
              guestId: guest.id,
              giftId: { in: giftIds },
              status: { in: ["TEMPORARY", "CONFIRMED", "COMPLETED"] },
              NOT: expired,
            },
          })
        : [],
      fundIds.length
        ? prisma.contribution.groupBy({
            by: ["giftId", "status"],
            where: {
              giftId: { in: fundIds },
              status: { in: [...activeContributionStatuses] },
            },
            _sum: { amountInCents: true },
            _count: { _all: true },
          })
        : [],
      guest && fundIds.length
        ? prisma.contribution.findMany({
            where: {
              guestId: guest.id,
              giftId: { in: fundIds },
              status: { in: [...activeContributionStatuses] },
            },
            orderBy: { declaredAt: "desc" },
          })
        : [],
    ]);
  const activeCountByGiftId = new Map(
    activeCounts.map((row) => [row.giftId, row._count._all]),
  );
  const myReservationByGiftId = new Map(
    myReservations.map((row) => [row.giftId, row]),
  );
  const fundTotalsByGiftId = new Map<string, FundTotals>();
  for (const gift of gifts) {
    if (gift.kind !== "FUND") continue;
    const rows = contributionSums.filter((row) => row.giftId === gift.id);
    const confirmed = rows.find((row) => row.status === "CONFIRMED");
    const declared = rows.find((row) => row.status === "DECLARED");
    fundTotalsByGiftId.set(gift.id, {
      goalInCents: gift.priceInCents,
      confirmedInCents: confirmed?._sum.amountInCents ?? 0,
      pendingInCents: declared?._sum.amountInCents ?? 0,
      contributionsCount:
        (confirmed?._count._all ?? 0) + (declared?._count._all ?? 0),
    });
  }

  const withAvailability = gifts.map((gift) => ({
    gift,
    availability: computeGiftAvailability(
      gift.quantity,
      activeCountByGiftId.get(gift.id) ?? 0,
    ),
  }));

  const normalizedQuery = normalize(query.trim());
  const filtered = normalizedQuery
    ? withAvailability.filter(
        ({ gift }) =>
          normalize(gift.name).includes(normalizedQuery) ||
          (gift.description &&
            normalize(gift.description).includes(normalizedQuery)),
      )
    : withAvailability;

  // Em vaquinha o valor que o convidado de fato paga é o mínimo, não a meta.
  const effectivePrice = (gift: Gift) =>
    gift.kind === "FUND"
      ? (gift.minContributionInCents ?? gift.priceInCents)
      : gift.priceInCents;

  // "Fora de jogo": presente/item Pix esgotado, ou vaquinha que já bateu a meta — não precisa mais de atenção.
  const isOutOfPlay = ({ gift, availability }: (typeof filtered)[number]) =>
    gift.kind === "FUND"
      ? computeFundProgress(fundTotalsByGiftId.get(gift.id)!).reached
      : availability.status === "UNAVAILABLE";

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return effectivePrice(a.gift) - effectivePrice(b.gift);
      case "price_desc":
        return effectivePrice(b.gift) - effectivePrice(a.gift);
      default:
        // Sugeridos: mantém a ordem de cadastro, só empurrando o que não precisa mais de atenção para o fim.
        return Number(isOutOfPlay(a)) - Number(isOutOfPlay(b));
    }
  });

  if (gifts.length === 0) {
    return (
      <EmptyState
        icon={GiftIcon}
        title="Esta lista ainda não tem presentes"
        description="O casal ainda não cadastrou nenhum presente. Volte em breve!"
      />
    );
  }

  if (sorted.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Nenhum presente encontrado"
        description={
          query
            ? `Não achamos nada para “${query}”. Tente buscar por outro nome.`
            : "Tente buscar por outro nome."
        }
        action={
          <Button variant="outline" size="sm" asChild>
            <Link href={clearHref} replace scroll={false}>
              Limpar busca
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      {query && (
        <p role="status" className="mb-4 text-sm text-muted-foreground">
          {sorted.length === 1
            ? "1 presente encontrado"
            : `${sorted.length} presentes encontrados`}{" "}
          para “{query}”
        </p>
      )}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map(({ gift, availability }) => {
          if (gift.kind === "FUND") {
            return (
              <FundCard
                key={gift.id}
                gift={{
                  id: gift.id,
                  name: gift.name,
                  description: gift.description,
                  imageUrl: gift.imageUrl,
                  minInCents: gift.minContributionInCents ?? 1,
                }}
                totals={fundTotalsByGiftId.get(gift.id)!}
                reached={
                  computeFundProgress(fundTotalsByGiftId.get(gift.id)!).reached
                }
                myContributions={myContributionRows
                  .filter((row) => row.giftId === gift.id)
                  .map((row) => ({
                    id: row.id,
                    amountInCents: row.amountInCents,
                    status: row.status as "DECLARED" | "CONFIRMED",
                  }))}
                isIdentified={isIdentified}
                pixConfigured={pixConfigured}
              />
            );
          }

          const mine = myReservationByGiftId.get(gift.id);
          return (
            <GiftCard
              key={gift.id}
              gift={{
                id: gift.id,
                name: gift.name,
                description: gift.description,
                imageUrl: gift.imageUrl,
                purchaseUrl:
                  gift.kind === "PRODUCT"
                    ? safeStoreUrl(gift.purchaseUrl)
                    : null,
                priceLabel: formatCentsToBRL(
                  mine?.amountInCents ?? gift.priceInCents,
                ),
              }}
              availability={availability}
              isIdentified={isIdentified}
              pixOnly={gift.kind === "PIX"}
              pixConfigured={pixConfigured}
              myReservation={
                mine
                  ? {
                      id: mine.id,
                      status: mine.status as
                        | "TEMPORARY"
                        | "CONFIRMED"
                        | "COMPLETED",
                      paymentMethod: mine.paymentMethod,
                      pixStatus: mine.pixStatus,
                      expiresAt: mine.expiresAt.toISOString(),
                    }
                  : null
              }
            />
          );
        })}
      </div>
    </>
  );
}

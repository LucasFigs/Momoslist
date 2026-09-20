import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateEventAction } from "@/actions/event.actions";
import type { GuestSelection } from "./guest-selections";
import { EventDashboardView } from "./event-dashboard-view";
import { computeGiftAvailability, ACTIVE_RESERVATION_STATUSES } from "@/lib/gift-availability";
import { formatCentsToBRL } from "@/lib/utils";
import type { FundTotals } from "@/lib/fund";
import type { FundOverviewItem } from "./funds-overview";
import type { RsvpItem } from "./rsvp-panel";
import type { MessageItem } from "./messages-panel";
import { summarizeRsvps } from "@/lib/rsvp";

export const metadata: Metadata = { title: "Gerenciar lista" };

export default async function EventoPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const now = new Date();

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      // Confirmações de presença (só o dono vê nome, e-mail e telefone).
      rsvps: { include: { guest: { select: { name: true, email: true, phone: true } } } },
      gifts: {
        orderBy: { createdAt: "asc" },
        include: {
          reservations: {
            // Só a página pública marca TEMPORARY vencida como EXPIRED; aqui ela
            // precisa ser ignorada na leitura, senão infla "reservados".
            where: {
              status: { in: [...ACTIVE_RESERVATION_STATUSES] },
              NOT: { status: "TEMPORARY", expiresAt: { lt: now } },
            },
            include: { guest: { select: { name: true, email: true } } },
          },
          // Vaquinha: só o que conta na barra (a cancelada não entra).
          contributions: {
            where: { status: { in: ["DECLARED", "CONFIRMED"] } },
            include: { guest: { select: { name: true, email: true } } },
            orderBy: { declaredAt: "desc" },
          },
        },
      },
    },
  });

  if (!event || event.ownerId !== session.user.id) {
    notFound();
  }

  // Métricas da aba Resumo (seção 16 do documento)
  const totalGifts = event.gifts.length;
  let selectedUnits = 0;
  let availableUnits = 0;
  let pixPendingCents = 0;
  let pixConfirmedCents = 0;
  const selections: GuestSelection[] = [];
  const fundTotals: Record<string, FundTotals> = {};
  const funds: FundOverviewItem[] = [];
  // Recadinhos dos convidados: reservas e contribuições ativas (as canceladas nem chegam aqui).
  const messageItems: MessageItem[] = [];

  for (const gift of event.gifts) {
    if (gift.kind === "FUND") {
      // Vaquinha não tem unidades: não entra em "reservados/disponíveis", só no dinheiro.
      let confirmed = 0;
      let pending = 0;
      for (const contribution of gift.contributions) {
        if (contribution.status === "CONFIRMED") confirmed += contribution.amountInCents;
        else pending += contribution.amountInCents;
      }
      pixConfirmedCents += confirmed;
      pixPendingCents += pending;

      const totals: FundTotals = {
        goalInCents: gift.priceInCents,
        confirmedInCents: confirmed,
        pendingInCents: pending,
        contributionsCount: gift.contributions.length,
      };
      fundTotals[gift.id] = totals;
      for (const contribution of gift.contributions) {
        if (!contribution.message) continue;
        messageItems.push({
          id: `c-${contribution.id}`,
          guestName: contribution.guest.name ?? contribution.guest.email,
          giftName: gift.name,
          kind: "FUND",
          amountLabel: formatCentsToBRL(contribution.amountInCents),
          message: contribution.message,
          at: contribution.declaredAt.toISOString(),
        });
      }
      funds.push({
        giftId: gift.id,
        name: gift.name,
        imageUrl: gift.imageUrl,
        minInCents: gift.minContributionInCents ?? 1,
        totals,
        contributions: gift.contributions.map((contribution) => ({
          id: contribution.id,
          guestName: contribution.guest.name ?? contribution.guest.email,
          amountInCents: contribution.amountInCents,
          status: contribution.status as "DECLARED" | "CONFIRMED",
          declaredAt: contribution.declaredAt.toISOString(),
        })),
      });
      continue;
    }

    const active = gift.reservations.length;
    selectedUnits += active;
    availableUnits += computeGiftAvailability(gift.quantity, active).availableUnits;

    for (const reservation of gift.reservations) {
      if (reservation.message) {
        messageItems.push({
          id: `r-${reservation.id}`,
          guestName: reservation.guest.name ?? reservation.guest.email,
          giftName: gift.name,
          kind: gift.kind === "PIX" ? "PIX" : "PRODUCT",
          amountLabel: null,
          message: reservation.message,
          at: (reservation.messageAt ?? reservation.reservedAt).toISOString(),
        });
      }
      if (reservation.paymentMethod === "PIX") {
        if (reservation.pixStatus === "DECLARED") pixPendingCents += gift.priceInCents;
        if (reservation.pixStatus === "CONFIRMED") pixConfirmedCents += gift.priceInCents;
      }
      selections.push({
        reservationId: reservation.id,
        reservedAt: reservation.reservedAt.toISOString(),
        giftName: gift.name,
        guestName: reservation.guest.name ?? reservation.guest.email,
        priceLabel: formatCentsToBRL(gift.priceInCents),
        paymentMethod: reservation.paymentMethod,
        status: reservation.status,
        pixStatus: reservation.pixStatus,
      });
    }
  }

  // ISO 8601 ordena corretamente como texto.
  selections.sort((a, b) => b.reservedAt.localeCompare(a.reservedAt));

  // Confirmação de presença: itens para a aba e o total de pessoas para o Resumo.
  const rsvpItems: RsvpItem[] = event.rsvps.map((rsvp) => ({
    id: rsvp.id,
    name: rsvp.guest.name,
    email: rsvp.guest.email,
    phone: rsvp.guest.phone,
    status: rsvp.status,
    companionAdults: rsvp.companionAdults,
    companionChildren: rsvp.companionChildren,
    answeredAt: rsvp.updatedAt.toISOString(),
  }));
  const rsvpSummary = summarizeRsvps(rsvpItems);

  const primaryMetrics = [
    { label: "Total arrecadado via Pix", value: formatCentsToBRL(pixConfirmedCents) },
    { label: "Presentes reservados", value: String(selectedUnits) },
    { label: "Presentes disponíveis", value: String(availableUnits) },
  ];
  const secondaryMetrics = [
    { label: "Total de presentes", value: String(totalGifts) },
    { label: "Pix pendentes", value: formatCentsToBRL(pixPendingCents) },
    // Só aparece se o recurso está ligado ou já tem respostas: não polui quem não usa.
    ...(event.rsvpEnabled || rsvpSummary.responses > 0
      ? [{ label: "Pessoas confirmadas", value: String(rsvpSummary.people) }]
      : []),
  ];

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const publicUrl = `${protocol}://${host}/lista/${event.slug}-${event.secureToken}`;

  const boundUpdateAction = updateEventAction.bind(null, event.id);

  return (
    <EventDashboardView
      event={event}
      primaryMetrics={primaryMetrics}
      secondaryMetrics={secondaryMetrics}
      selections={selections}
      publicUrl={publicUrl}
      updateAction={boundUpdateAction}
      funds={funds}
      fundTotals={fundTotals}
      pixConfigured={Boolean(event.pixKey && event.pixKeyType)}
      rsvpEnabled={event.rsvpEnabled}
      rsvpItems={rsvpItems}
      messageItems={messageItems}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateEventAction } from "@/actions/event.actions";
import type { GuestSelection } from "./guest-selections";
import { statusLabel, statusVariant } from "./gift-selection-status";
import { EventDashboardView } from "./event-dashboard-view";
import { computeGiftAvailability, ACTIVE_RESERVATION_STATUSES } from "@/lib/gift-availability";
import { formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import type { FundOverviewItem } from "./funds-overview";
import type { RsvpItem } from "./rsvp-panel";
import type { MessageItem } from "./messages-panel";
import type { PendingApprovalItem } from "./pending-approvals-panel";
import type { MetricDetailItem, SummaryMetricGroup } from "./summary-metrics";
import { summarizeRsvps } from "@/lib/rsvp";

const shortDate = (iso: string) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(new Date(iso));

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
  let selectedUnits = 0;
  let availableUnits = 0;
  let pixPendingCents = 0;
  let pixConfirmedCents = 0;
  const selections: GuestSelection[] = [];
  const fundTotals: Record<string, FundTotals> = {};
  const funds: FundOverviewItem[] = [];
  // Recadinhos dos convidados: reservas e contribuições ativas (as canceladas nem chegam aqui).
  const messageItems: MessageItem[] = [];
  // Todo Pix aguardando confirmação, de qualquer tipo de item — mostrado logo abaixo do cabeçalho.
  const pendingApprovals: PendingApprovalItem[] = [];
  // O que compõe cada número do Resumo — clicar no valor mostra esta lista (ver summary-metrics.tsx).
  const availableGiftDetails: MetricDetailItem[] = [];
  const productCatalogDetails: MetricDetailItem[] = [];
  const fundCatalogDetails: MetricDetailItem[] = [];
  const pixConfirmedDetails: MetricDetailItem[] = [];

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
      const progress = computeFundProgress(totals);
      fundCatalogDetails.push({
        id: gift.id,
        title: gift.name,
        subtitle: progress.reached ? "Meta atingida" : `${progress.percent}% da meta`,
        value: `${formatCentsToBRL(progress.raisedInCents)} de ${formatCentsToBRL(totals.goalInCents)}`,
      });
      for (const contribution of gift.contributions) {
        if (contribution.status === "CONFIRMED") {
          pixConfirmedDetails.push({
            id: contribution.id,
            title: gift.name,
            subtitle: `${contribution.guest.name ?? contribution.guest.email} · ${shortDate(contribution.declaredAt.toISOString())}`,
            value: formatCentsToBRL(contribution.amountInCents),
            badge: { label: "Vaquinha", tone: "neutral" },
          });
        }
        if (contribution.status === "DECLARED") {
          pendingApprovals.push({
            id: contribution.id,
            source: "contribution",
            giftKind: "FUND",
            guestName: contribution.guest.name ?? contribution.guest.email,
            itemName: gift.name,
            amountLabel: formatCentsToBRL(contribution.amountInCents),
            at: contribution.declaredAt.toISOString(),
          });
        }
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
    const availability = computeGiftAvailability(gift.quantity, active);
    selectedUnits += active;
    availableUnits += availability.availableUnits;

    productCatalogDetails.push({
      id: gift.id,
      title: gift.name,
      subtitle: gift.kind === "PIX" ? "Só Pix" : "Presente",
      value: `${availability.availableUnits} de ${gift.quantity} disponíveis`,
    });
    if (availability.availableUnits > 0) {
      availableGiftDetails.push({
        id: gift.id,
        title: gift.name,
        subtitle: gift.kind === "PIX" ? "Só Pix" : "Presente",
        value: `${availability.availableUnits} de ${gift.quantity}`,
      });
    }

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
        if (reservation.pixStatus === "DECLARED") {
          pixPendingCents += gift.priceInCents;
          pendingApprovals.push({
            id: reservation.id,
            source: "reservation",
            giftKind: gift.kind === "PIX" ? "PIX" : "PRODUCT",
            guestName: reservation.guest.name ?? reservation.guest.email,
            itemName: gift.name,
            amountLabel: formatCentsToBRL(gift.priceInCents),
            at: (reservation.pixDeclaredAt ?? reservation.reservedAt).toISOString(),
          });
        }
        if (reservation.pixStatus === "CONFIRMED") {
          pixConfirmedCents += gift.priceInCents;
          pixConfirmedDetails.push({
            id: reservation.id,
            title: gift.name,
            subtitle: `${reservation.guest.name ?? reservation.guest.email} · ${shortDate((reservation.pixConfirmedAt ?? reservation.reservedAt).toISOString())}`,
            value: formatCentsToBRL(gift.priceInCents),
            badge: { label: gift.kind === "PIX" ? "Pix" : "Presente", tone: "neutral" },
          });
        }
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
    companionNames: rsvp.companionNames,
    answeredAt: rsvp.updatedAt.toISOString(),
  }));
  const rsvpSummary = summarizeRsvps(rsvpItems);

  // "Reservados" e "Pix pendente/confirmado" reaproveitam listas já prontas (selections, pendingApprovals):
  // uma só fonte de verdade para a tela e para o detalhe por trás do número.
  const reservedDetails: MetricDetailItem[] = selections.map((selection) => ({
    id: selection.reservationId,
    title: selection.giftName,
    subtitle: `${selection.guestName} · ${shortDate(selection.reservedAt)}`,
    badge: { label: statusLabel(selection), tone: statusVariant(selection) },
  }));
  const pixPendingDetails: MetricDetailItem[] = pendingApprovals.map((item) => ({
    id: item.id,
    title: item.itemName,
    subtitle: `${item.guestName} · ${shortDate(item.at)}`,
    value: item.amountLabel,
    badge: { label: "Aguardando", tone: "pending" },
  }));
  const attendingDetails: MetricDetailItem[] = rsvpItems
    .filter((item) => item.status === "ATTENDING")
    .map((item) => {
      const people = 1 + item.companionAdults + item.companionChildren;
      return {
        id: item.id,
        title: item.name,
        subtitle: `${people === 1 ? "1 pessoa" : `${people} pessoas`} · ${shortDate(item.answeredAt)}`,
      };
    });

  const metricGroups: SummaryMetricGroup[] = [
    {
      title: "Presentes",
      metrics: [
        {
          id: "reserved",
          label: "Reservados",
          value: String(selectedUnits),
          details: reservedDetails,
          emptyMessage: "Ainda ninguém escolheu um presente.",
        },
        {
          id: "available",
          label: "Disponíveis",
          value: String(availableUnits),
          details: availableGiftDetails,
          emptyMessage: "Nenhum presente disponível no momento — todos foram escolhidos.",
        },
        {
          id: "product-catalog",
          label: "Cadastrados",
          value: String(productCatalogDetails.length),
          details: productCatalogDetails,
          emptyMessage: "Nenhum presente cadastrado ainda.",
        },
      ],
    },
    // Vaquinhas ficam à parte de "presentes": são metas coletivas, não itens com estoque.
    ...(fundCatalogDetails.length > 0
      ? [
          {
            title: "Vaquinhas",
            metrics: [
              {
                id: "fund-catalog",
                label: "Cadastradas",
                value: String(fundCatalogDetails.length),
                details: fundCatalogDetails,
                emptyMessage: "Nenhuma vaquinha cadastrada ainda.",
              },
            ],
          },
        ]
      : []),
    {
      title: "Pix",
      metrics: [
        {
          id: "pix-confirmed",
          label: "Confirmado",
          value: formatCentsToBRL(pixConfirmedCents),
          details: pixConfirmedDetails,
          emptyMessage: "Nenhum Pix confirmado ainda.",
        },
        {
          id: "pix-pending",
          label: "Aguardando confirmação",
          value: formatCentsToBRL(pixPendingCents),
          details: pixPendingDetails,
          emptyMessage: "Nenhum Pix aguardando confirmação.",
        },
      ],
    },
    // Só aparece se o recurso está ligado ou já tem respostas: não polui quem não usa.
    ...(event.rsvpEnabled || rsvpSummary.responses > 0
      ? [
          {
            title: "Confirmação de presença",
            metrics: [
              {
                id: "rsvp-people",
                label: "Pessoas confirmadas",
                value: String(rsvpSummary.people),
                details: attendingDetails,
                emptyMessage: "Ainda ninguém confirmou presença.",
              },
            ],
          },
        ]
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
      metricGroups={metricGroups}
      selections={selections}
      publicUrl={publicUrl}
      updateAction={boundUpdateAction}
      funds={funds}
      fundTotals={fundTotals}
      pixConfigured={Boolean(event.pixKey && event.pixKeyType)}
      rsvpEnabled={event.rsvpEnabled}
      rsvpItems={rsvpItems}
      messageItems={messageItems}
      pendingApprovals={pendingApprovals}
    />
  );
}

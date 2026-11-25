import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { expiredReservationWhere } from "@/lib/reservation-policy";
import { GiftHistoryView, type HistoryGift, type HistoryRecord } from "./gift-history-view";

const reservationLabels = { TEMPORARY: "Temporária", CONFIRMED: "Selecionada", COMPLETED: "Compra informada", CANCELLED: "Cancelada", EXPIRED: "Expirada" } as const;
const contributionLabels = { DECLARED: "Declarada", CONFIRMED: "Confirmada", CANCELLED: "Cancelada" } as const;
const pixLabels = { NOT_APPLICABLE: null, NOT_DECLARED: "Pix não declarado", DECLARED: "Pix declarado", CONFIRMED: "Pix confirmado" } as const;

function dates(entries: [string, Date | null][]) {
  return entries.flatMap(([label, at]) => at ? [{ label, at: at.toISOString() }] : []);
}

/** Somente leitura: autorização na consulta; histórico não participa dos totais de estoque. */
export async function GiftHistory({ eventId }: { eventId: string }) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const gifts = await prisma.gift.findMany({
    where: { eventId, event: { ownerId: session.user.id }, OR: [
      { kind: { in: ["PRODUCT", "PIX"] }, quantity: 0 },
      { reservations: { some: { OR: [{ status: { in: ["CANCELLED", "EXPIRED"] } }, expiredReservationWhere()] } } },
      { contributions: { some: { status: "CANCELLED" } } },
    ] },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    include: {
      reservations: { include: { guest: { select: { name: true } } }, orderBy: [{ reservedAt: "desc" }, { id: "asc" }] },
      contributions: { include: { guest: { select: { name: true } } }, orderBy: [{ declaredAt: "desc" }, { id: "asc" }] },
    },
  });
  const items: HistoryGift[] = gifts.map((gift) => ({
    id: gift.id, name: gift.name, withdrawn: gift.kind !== "FUND" && gift.quantity === 0,
    records: [
      ...gift.reservations.map((row): HistoryRecord => ({
        id: `r-${row.id}`, kind: "Reserva", guestName: row.guest.name,
        status: row.status, statusLabel: reservationLabels[row.status],
        statusTone: row.status === "COMPLETED" ? "success" : row.status === "TEMPORARY" ? "pending" : "neutral",
        paymentLabel: row.paymentMethod === "PIX" ? pixLabels[row.pixStatus] : row.paymentMethod === "EXTERNAL_PURCHASE" ? "Compra em loja" : null,
        paymentTone: row.pixStatus === "CONFIRMED" ? "success" : row.pixStatus === "DECLARED" ? "pending" : "neutral",
        amountInCents: row.amountInCents ?? gift.priceInCents, referenceAmount: row.amountInCents === null,
        dates: dates([
          ["Reserva feita", row.reservedAt],
          ...(["TEMPORARY", "EXPIRED"].includes(row.status) ? [["Prazo da reserva", row.expiresAt] as [string, Date]] : []),
          ["Cancelamento", row.cancelledAt], ["Compra informada", row.purchaseConfirmedAt],
          ["Presente recebido", row.receivedAt], ["Pix declarado", row.pixDeclaredAt], ["Pix confirmado", row.pixConfirmedAt],
        ]),
        message: row.message, messagePublic: row.messagePublic, messageHidden: row.messageHidden,
      })),
      ...gift.contributions.map((row): HistoryRecord => ({
        id: `c-${row.id}`, kind: "Contribuição", guestName: row.guest.name,
        status: row.status, statusLabel: contributionLabels[row.status],
        statusTone: row.status === "CONFIRMED" ? "success" : row.status === "DECLARED" ? "pending" : "neutral",
        paymentLabel: "Pix", paymentTone: "neutral", amountInCents: row.amountInCents, referenceAmount: false,
        dates: dates([["Contribuição declarada", row.declaredAt], ["Confirmação", row.confirmedAt], ["Cancelamento", row.cancelledAt]]),
        message: row.message, messagePublic: row.messagePublic, messageHidden: row.messageHidden,
      })),
    ],
  }));
  return <GiftHistoryView gifts={items} />;
}

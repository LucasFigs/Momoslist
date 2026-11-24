import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatCentsToBRL } from "@/lib/utils";

/** Consulta somente leitura: histórico não participa dos totais de estoque. */
export async function GiftHistory({ eventId }: { eventId: string }) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const gifts = await prisma.gift.findMany({
    where: { eventId, event: { ownerId: session.user.id }, OR: [
      { kind: { in: ["PRODUCT", "PIX"] }, quantity: 0 },
      { reservations: { some: { status: { in: ["CANCELLED", "EXPIRED"] } } } },
      { contributions: { some: { status: "CANCELLED" } } },
    ] },
    orderBy: { createdAt: "asc" },
    include: {
      reservations: { include: { guest: { select: { name: true } } }, orderBy: { reservedAt: "desc" } },
      contributions: { include: { guest: { select: { name: true } } }, orderBy: { declaredAt: "desc" } },
    },
  });
  if (!gifts.some((gift) => gift.reservations.length || gift.contributions.length)) return null;
  return <section className="container pb-12" aria-label="Histórico preservado">
    <details className="rounded-lg border border-border bg-card p-4">
      <summary className="cursor-pointer font-medium">Histórico preservado de presentes retirados, reservas e contribuições canceladas</summary>
      <p className="my-3 text-sm text-muted-foreground">Somente os organizadores veem este histórico. A retirada não altera pagamentos nem a privacidade dos recadinhos.</p>
      {gifts.map((gift) => <div key={gift.id} className="mt-4">
        <h3 className="font-medium">{gift.name}{gift.kind !== "FUND" && gift.quantity === 0 ? " · Retirado" : ""}</h3>
        <ul className="space-y-2 text-sm">
          {gift.reservations.map((row) => <li key={row.id} className="rounded-md bg-muted p-3">
            <p>{row.guest.name} · Reserva {row.status} · Pix {row.pixStatus} · {formatCentsToBRL(row.amountInCents ?? gift.priceInCents)}</p>
            {row.message && <p className="whitespace-pre-wrap break-words">{row.message} · {row.messagePublic ? "Público" : "Privado"}{row.messageHidden ? " · Oculto" : ""}</p>}
          </li>)}
          {gift.contributions.map((row) => <li key={row.id} className="rounded-md bg-muted p-3">
            <p>{row.guest.name} · Contribuição {row.status} · {formatCentsToBRL(row.amountInCents)}</p>
            {row.message && <p className="whitespace-pre-wrap break-words">{row.message} · {row.messagePublic ? "Público" : "Privado"}{row.messageHidden ? " · Oculto" : ""}</p>}
          </li>)}
        </ul>
      </div>)}
    </details>
  </section>;
}

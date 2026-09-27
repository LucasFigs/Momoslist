import { MessageCircleHeart } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/empty-state";
import { DuckAvatar } from "@/components/duck-avatar";

interface BoardMessage {
  id: string;
  guestId: string;
  guestName: string;
  message: string;
  /** ISO 8601 */
  at: string;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Mural público: recadinhos de quem presenteou ou contribuiu, com nome e data — mas sem dizer qual presente
 * ou quanto cada um deu, isso continua só com o casal (mesmo princípio de "guest-selections": o recado é
 * público, a reserva em si não).
 */
export async function MessageBoardSection({ eventId }: { eventId: string }) {
  const [reservations, contributions] = await Promise.all([
    prisma.giftReservation.findMany({
      where: { gift: { eventId }, status: { in: ["CONFIRMED", "COMPLETED"] }, message: { not: null } },
      select: {
        id: true,
        message: true,
        messageAt: true,
        reservedAt: true,
        guest: { select: { id: true, name: true } },
      },
    }),
    prisma.contribution.findMany({
      where: { gift: { eventId }, status: { in: ["DECLARED", "CONFIRMED"] }, message: { not: null } },
      select: { id: true, message: true, declaredAt: true, guest: { select: { id: true, name: true } } },
    }),
  ]);

  const items: BoardMessage[] = [
    ...reservations.map((r) => ({
      id: `r-${r.id}`,
      guestId: r.guest.id,
      guestName: r.guest.name,
      message: r.message as string,
      at: (r.messageAt ?? r.reservedAt).toISOString(),
    })),
    ...contributions.map((c) => ({
      id: `c-${c.id}`,
      guestId: c.guest.id,
      guestName: c.guest.name,
      message: c.message as string,
      at: c.declaredAt.toISOString(),
    })),
  ].sort((a, b) => b.at.localeCompare(a.at));

  if (items.length === 0) {
    return (
      <EmptyState
        icon={MessageCircleHeart}
        title="O mural ainda tá quietinho por aqui"
        description="Assim que o primeiro recadinho chegar, ele aparece bem aqui."
      />
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
              <DuckAvatar seed={item.guestId} className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{item.guestName}</p>
              <p className="text-xs text-muted-foreground">{dateFormatter.format(new Date(item.at))}</p>
            </div>
          </div>

          <blockquote className="whitespace-pre-wrap break-words border-l-2 border-primary-border pl-3 text-[15px] leading-relaxed text-foreground">
            {item.message}
          </blockquote>
        </li>
      ))}
    </ul>
  );
}

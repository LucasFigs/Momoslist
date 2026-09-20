import Link from "next/link";
import { ImageIcon, Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { EventCard } from "./event-card";

export default async function DashboardPage() {
  const session = await auth();

  const events = session?.user?.id
    ? await prisma.event.findMany({
        where: { ownerId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { gifts: true } } },
      })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">Suas listas</h1>
        <Button asChild>
          <Link href="/dashboard/nova-lista">
            <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Criar lista
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Você ainda não tem nenhuma lista"
          description="Crie sua primeira lista de presentes para começar a compartilhar com seus convidados."
          action={
            <Button asChild>
              <Link href="/dashboard/nova-lista">Criar minha lista</Link>
            </Button>
          }
          className="mx-auto max-w-lg bg-card"
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard
                id={event.id}
                title={event.title}
                type={event.type}
                published={event.published}
                coverImageUrl={event.coverImageUrl}
                themeColor={event.themeColor}
                legacyTheme={event.theme}
                giftCount={event._count.gifts}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

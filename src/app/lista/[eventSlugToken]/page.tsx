import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentGuest } from "@/lib/guest-session";
import { prisma } from "@/lib/prisma";
import { parseEventSlugToken } from "@/lib/slug";
import { PublicListView } from "./public-list-view";
import { parseGiftQuery, parseGiftSort } from "./gift-sort";

interface PageProps {
  params: { eventSlugToken: string };
  searchParams: { q?: string | string[]; sort?: string | string[] };
}

async function getPublicEvent(eventSlugToken: string) {
  const parsed = parseEventSlugToken(eventSlugToken);
  if (!parsed) return null;

  const event = await prisma.event.findUnique({
    where: { slug: parsed.slug },
    include: { gifts: { orderBy: { createdAt: "asc" } } },
  });

  // Slug e secureToken precisam bater os dois — isso dificulta enumeração por slug.
  if (!event || event.secureToken !== parsed.secureToken) return null;
  if (!event.published) return null;

  return event;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await getPublicEvent(params.eventSlugToken);
  if (!event) return {};

  return {
    title: `Lista de presentes — ${event.title}`,
    description: event.description ?? "Confira a lista de presentes e escolha o seu.",
    // A lista é privada por link: gera prévia bonita no WhatsApp, mas não é indexada.
    robots: { index: false, follow: false },
    openGraph: {
      title: `Lista de presentes — ${event.title}`,
      description: event.description ?? undefined,
      images: event.coverImageUrl ? [event.coverImageUrl] : undefined,
    },
  };
}

export default async function PublicEventPage({ params, searchParams }: PageProps) {
  const event = await getPublicEvent(params.eventSlugToken);
  if (!event) notFound();

  const guest = await getCurrentGuest();

  // Só busca a resposta se as confirmações estiverem ligadas e o convidado já estiver identificado.
  const myRsvp =
    guest && event.rsvpEnabled
      ? await prisma.rsvp.findUnique({
          where: { eventId_guestId: { eventId: event.id, guestId: guest.id } },
          select: { status: true, companionAdults: true, companionChildren: true, companionNames: true },
        })
      : null;

  return (
    <PublicListView
      event={event}
      guest={guest}
      myRsvp={myRsvp}
      publicUrl={`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/lista/${params.eventSlugToken}`}
      query={parseGiftQuery(searchParams.q)}
      sort={parseGiftSort(searchParams.sort)}
      clearHref={`/lista/${params.eventSlugToken}`}
    />
  );
}

import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";

import { getCurrentGuest } from "@/lib/guest-session";
import { prisma } from "@/lib/prisma";
import { parseEventSlugToken } from "@/lib/slug";
import { SwitchGuestButton } from "./switch-guest-button";
import { HeaderPublico } from "./header-publico";
import { GiftFilters } from "./gift-filters";
import { GiftsSection } from "./gifts-section";
import { GiftCardSkeletonList } from "./gift-card-skeleton";
import { parseGiftQuery, parseGiftSort } from "./gift-sort";
import { themeStyleFor } from "@/lib/theme";

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
  const isIdentified = Boolean(guest);

  const eventDateLabel = event.eventDate
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(
        new Date(event.eventDate)
      )
    : null;

  const hasExternalPurchaseGift = event.gifts.some((gift) => Boolean(gift.purchaseUrl));
  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/lista/${params.eventSlugToken}`;
  // Só o acento muda por lista; a base neutra da marca é fixa. Contraste garantido em lib/theme.
  const themeStyle = themeStyleFor(event.themeColor, event.theme) as React.CSSProperties;

  const query = parseGiftQuery(searchParams.q);
  const sort = parseGiftSort(searchParams.sort);
  // Uma combinação de filtros por requisição basta para dar ao React um key
  // novo e reiniciar o Suspense (mostrando o skeleton) a cada busca/ordenação.
  const suspenseKey = `${query}:${sort}`;

  return (
    <main className="min-h-screen" style={themeStyle}>
      <HeaderPublico
        title={event.title}
        type={event.type}
        coverImageUrl={event.coverImageUrl}
        profileImageUrl={event.profileImageUrl}
        eventDateLabel={eventDateLabel}
        locationName={event.locationName}
        locationAddress={event.locationAddress}
        locationMapsUrl={event.locationMapsUrl}
        description={event.description}
        deliveryAddress={event.deliveryAddress}
        publicUrl={publicUrl}
        hasGifts={event.gifts.length > 0}
      />

      {guest && (
        <div className="border-b border-border bg-card">
          <div className="container flex items-center justify-between py-2 text-xs text-muted-foreground">
            <span>
              Identificado(a) como <strong className="text-foreground">{guest.name}</strong>
            </span>
            <SwitchGuestButton />
          </div>
        </div>
      )}

      {/* Lista de presentes */}
      <section id="presentes" className="scroll-mt-4 border-t border-border">
        <div className="container pb-16 pt-8 sm:pt-12">
          <div className="mb-5 flex flex-col gap-1">
            <h2 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
              Lista de presentes
            </h2>
            {hasExternalPurchaseGift && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                Itens de loja são comprados no site do vendedor, não aqui.
              </p>
            )}
          </div>

          {event.gifts.length > 0 && (
            // useSearchParams exige um Suspense próprio, separado do da listagem.
            <Suspense fallback={<div className="mb-6 h-11" aria-hidden="true" />}>
              <GiftFilters />
            </Suspense>
          )}

          <Suspense key={suspenseKey} fallback={<GiftCardSkeletonList />}>
            <GiftsSection
              gifts={event.gifts}
              guest={guest}
              isIdentified={isIdentified}
              query={query}
              sort={sort}
              clearHref={`/lista/${params.eventSlugToken}`}
              pixConfigured={Boolean(event.pixKey && event.pixKeyType)}
            />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

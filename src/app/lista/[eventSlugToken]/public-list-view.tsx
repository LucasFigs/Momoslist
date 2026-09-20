import { Suspense } from "react";
import type { Event, Gift, Guest } from "@prisma/client";

import { SwitchGuestButton } from "./switch-guest-button";
import { HeaderPublico } from "./header-publico";
import { GiftFilters } from "./gift-filters";
import { GiftsSection } from "./gifts-section";
import { GiftCardSkeletonList } from "./gift-card-skeleton";
import { RsvpSection } from "./rsvp-section";
import type { GiftSort } from "./gift-sort";
import type { RsvpAnswer } from "@/lib/rsvp";
import { themeStyleFor } from "@/lib/theme";

interface PublicListViewProps {
  event: Event & { gifts: Gift[] };
  guest: Guest | null;
  /** URL pública da lista (usada pelo botão de compartilhar). */
  publicUrl: string;
  query: string;
  sort: GiftSort;
  /** Destino do "Limpar busca": a própria página, sem parâmetros. */
  clearHref: string;
  /** Cor de acento (#RRGGBB) que substitui a salva — usada para pré-visualizar antes de salvar. */
  themeColorOverride?: string | null;
  /** Resposta de confirmação de presença deste convidado (null = ainda não respondeu). */
  myRsvp?: RsvpAnswer | null;
  /** Modo pré-visualização do anfitrião: nada é clicável, para nunca gerar reserva/contribuição de teste. */
  preview?: boolean;
}

/**
 * A lista como o convidado vê. Usada pela página pública e pela pré-visualização do anfitrião,
 * para que as duas nunca divirjam.
 */
export function PublicListView({
  event,
  guest,
  publicUrl,
  query,
  sort,
  clearHref,
  themeColorOverride,
  myRsvp = null,
  preview = false,
}: PublicListViewProps) {
  const eventDateLabel = event.eventDate
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(new Date(event.eventDate))
    : null;

  const hasExternalPurchaseGift = event.gifts.some((gift) => Boolean(gift.purchaseUrl));
  // Só o acento muda por lista; a base neutra da marca é fixa. Contraste garantido em lib/theme.
  const themeStyle = themeStyleFor(themeColorOverride ?? event.themeColor, event.theme) as React.CSSProperties;

  // Uma combinação de filtros por requisição basta para dar ao React um key
  // novo e reiniciar o Suspense (mostrando o skeleton) a cada busca/ordenação.
  const suspenseKey = `${query}:${sort}`;

  // `inert` desativa cliques, foco e leitores de tela dentro do elemento (o scroll continua funcionando).
  const inertProps = preview ? ({ inert: "" } as Record<string, string>) : {};

  return (
    <>
      {preview && (
        <div className="sticky top-0 z-40 bg-foreground px-4 py-1.5 text-center text-xs text-background">
          Pré-visualização — só você vê isto{!event.published && " · lista em rascunho"}. Os botões ficam desativados.
        </div>
      )}
      <main className="min-h-screen" style={themeStyle} {...inertProps}>
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

        {/* Confirmação de presença: só aparece se o anfitrião ligou (Configurações → Confirmações). */}
        {event.rsvpEnabled && (
          <section aria-label="Confirmação de presença" className="container pb-6 pt-5 sm:pb-8 sm:pt-6">
            <RsvpSection eventId={event.id} isIdentified={Boolean(guest)} mine={myRsvp} />
          </section>
        )}

        {/* Lista de presentes */}
        <section id="presentes" className="scroll-mt-4 border-t border-border">
          <div className="container pb-16 pt-8 sm:pt-12">
            <div className="mb-5 flex flex-col gap-1">
              <h2 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">Lista de presentes</h2>
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
                isIdentified={Boolean(guest)}
                query={query}
                sort={sort}
                clearHref={clearHref}
                pixConfigured={Boolean(event.pixKey && event.pixKeyType)}
              />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}

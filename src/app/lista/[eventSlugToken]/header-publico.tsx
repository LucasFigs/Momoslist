import { CalendarDays, MapPin } from "lucide-react";
import { GiftImage } from "@/components/gift-image";
import { FormattedText } from "@/components/formatted-text";
import { CopyableAddress } from "@/components/copyable-address";
import { SharePublicListButton } from "./share-public-list-button";

const eventTypeLabel: Record<string, string> = {
  CHA_PANELA: "Chá de Panela",
  CHA_CASA_NOVA: "Chá de Casa Nova",
};

interface HeaderPublicoProps {
  title: string;
  type: string;
  coverImageUrl: string | null;
  profileImageUrl: string | null;
  eventDateLabel: string | null;
  locationName: string | null;
  locationAddress: string | null;
  locationMapsUrl: string | null;
  description: string | null;
  deliveryAddress: string | null;
  publicUrl: string;
}

/**
 * Primeira dobra da lista: quem → qual ocasião → mensagem → presentes.
 * A capa é ambiente (não banner) e o avatar faz a ponte entre a foto e o texto.
 */
export function HeaderPublico({
  title,
  type,
  coverImageUrl,
  profileImageUrl,
  eventDateLabel,
  locationName,
  locationAddress,
  locationMapsUrl,
  description,
  deliveryAddress,
  publicUrl,
}: HeaderPublicoProps) {
  return (
    <header>
      {/* Capa: total no celular; em telas grandes fica contida (1200px), com cantos suaves. */}
      <div className="mx-auto w-full max-w-[1200px] sm:px-6 sm:pt-6 lg:px-8">
        {/* Este wrapper NÃO corta conteúdo: o avatar precisa vazar para fora da capa. */}
        <div className="relative">
          <div className="relative aspect-[5/2] max-h-[380px] w-full overflow-hidden bg-gradient-to-br from-primary-soft to-primary-border sm:aspect-[3/1] sm:rounded-2xl">
            {coverImageUrl && (
              <GiftImage src={coverImageUrl} alt="" fill priority sizes="(min-width: 1200px) 1152px, 100vw" />
            )}
          </div>

          <SharePublicListButton
            url={publicUrl}
            title={title}
            className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4"
          />

          {/* Avatar centrado na borda inferior da capa: metade sobre a capa, metade no corpo.
              z-10 é obrigatório — a capa é `relative` e, sem isso, seria pintada por cima dele. */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border border-border bg-card ring-4 ring-background sm:h-32 sm:w-32">
              <GiftImage src={profileImageUrl} alt={title} width={128} height={128} />
            </div>
          </div>
        </div>
      </div>

      {/* Espaço = metade do avatar (48px / 64px) + respiro. */}
      <div className="container flex flex-col items-center gap-4 pb-8 pt-[3.75rem] text-center sm:gap-5 sm:pb-10 sm:pt-[5rem]">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {eventTypeLabel[type] ?? type}
          </p>
          <h1 className="max-w-2xl text-balance font-serif text-[1.75rem] font-medium leading-tight text-foreground sm:text-4xl">
            {title}
          </h1>
        </div>

        {(eventDateLabel || locationName) && (
          <ul className="flex flex-col items-center gap-1.5 text-sm text-foreground">
            {eventDateLabel && (
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{eventDateLabel}</span>
              </li>
            )}
            {locationName && (
              <li className="flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                  {locationMapsUrl ? (
                    <a
                      href={locationMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline decoration-border underline-offset-4 hover:decoration-primary"
                    >
                      {locationName}
                      <span className="sr-only"> (abre o mapa em nova aba)</span>
                    </a>
                  ) : (
                    <span className="font-medium">{locationName}</span>
                  )}
                </span>
                {locationAddress && (
                  <span className="max-w-md text-xs text-muted-foreground">{locationAddress}</span>
                )}
              </li>
            )}
          </ul>
        )}

        {description && (
          // A mensagem aparece INTEIRA: são as orientações da lista, e quem tem menos familiaridade com
          // tecnologia pode não perceber um "Ler mais". Sem moldura: é a voz dos anfitriões, não um aviso do sistema.
          <div className="w-full max-w-xl whitespace-pre-line text-left text-[15px] leading-relaxed text-foreground/90 sm:text-base">
            <FormattedText text={description} />
          </div>
        )}

        {/* Texto puro e copiável (o convidado cola no app da loja). Os ** de negrito não fazem sentido aqui. */}
        {deliveryAddress && <CopyableAddress text={deliveryAddress.replace(/\*\*(.+?)\*\*/gs, "$1")} />}
      </div>
    </header>
  );
}

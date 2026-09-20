"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { describeParty, type RsvpAnswer } from "@/lib/rsvp";
import { IdentifyGuestDialog } from "./identify-guest-dialog";
import { RsvpDialog } from "./rsvp-dialog";

interface RsvpSectionProps {
  eventId: string;
  isIdentified: boolean;
  /** Resposta atual deste convidado (null = ainda não respondeu). */
  mine: RsvpAnswer | null;
}

/** Cartão "Confirme sua presença" entre o topo da lista e os presentes. Muda conforme a resposta já dada. */
export function RsvpSection({ eventId, isIdentified, mine }: RsvpSectionProps) {
  const router = useRouter();
  const [identifyOpen, setIdentifyOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  function handleOpen() {
    // Mesmo cadastro leve dos presentes: quem já se identificou não precisa repetir.
    if (!isIdentified) {
      setIdentifyOpen(true);
      return;
    }
    setRsvpOpen(true);
  }

  function handleIdentified() {
    setIdentifyOpen(false);
    setRsvpOpen(true);
    // Atualiza a faixa "Identificado(a) como…" e traz a resposta que esta pessoa já tenha dado antes.
    router.refresh();
  }

  const attending = mine?.status === "ATTENDING";
  const Icon = !mine ? CalendarCheck : attending ? CheckCircle2 : XCircle;

  // Sem resposta: faixa na cor da lista (chamado à ação). Confirmada: verde. Recusada: neutra.
  const surface = !mine
    ? "border-primary-border bg-primary-subtle"
    : attending
      ? "border-success/25 bg-success-soft"
      : "border-border bg-card";
  const iconTone = attending ? "text-success" : !mine ? "text-primary" : "text-muted-foreground";

  return (
    <div
      className={`flex w-full flex-col gap-5 rounded-2xl border p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-8 ${surface}`}
    >
      <div className="flex min-w-0 items-center gap-4 md:gap-5">
        <span
          aria-hidden="true"
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-black/5 md:h-14 md:w-14 ${iconTone}`}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7" />
        </span>
        <div className="min-w-0">
          {!mine ? (
            <>
              <h2 className="font-serif text-xl font-medium text-foreground md:text-2xl">Confirme sua presença</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground md:text-base">
                Conte aos anfitriões se você vai e com quantas pessoas.
              </p>
            </>
          ) : attending ? (
            <>
              <h2 className="font-serif text-xl font-medium text-foreground md:text-2xl">Presença confirmada</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground md:text-base">{describeParty(mine)}</p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-xl font-medium text-foreground md:text-2xl">
                Você avisou que não poderá ir
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground md:text-base">
                Mudou de ideia? É só alterar a resposta.
              </p>
            </>
          )}
        </div>
      </div>

      <Button
        size="lg"
        variant={mine ? "outline" : "default"}
        onClick={handleOpen}
        className="w-full flex-shrink-0 md:w-auto md:min-w-[13rem]"
      >
        {mine ? "Alterar resposta" : "Confirmar presença"}
      </Button>

      <IdentifyGuestDialog open={identifyOpen} onOpenChange={setIdentifyOpen} onIdentified={handleIdentified} />
      {/* key: ao reabrir depois de salvar, o formulário parte da resposta mais recente vinda do servidor. */}
      <RsvpDialog
        key={mine ? `${mine.status}-${mine.companionAdults}-${mine.companionChildren}` : "novo"}
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        eventId={eventId}
        initial={mine}
      />
    </div>
  );
}

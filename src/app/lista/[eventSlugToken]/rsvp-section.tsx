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

  // Sem resposta: faixa discreta na cor da lista. Confirmada: verde. Recusada: neutra.
  // É um aviso de apoio, então fica bem mais baixo e leve que o título "Lista de presentes" logo abaixo.
  const surface = !mine
    ? "border-primary-border bg-primary-subtle"
    : attending
      ? "border-success/25 bg-success-soft"
      : "border-border bg-card";
  const iconTone = attending ? "text-success" : !mine ? "text-primary" : "text-muted-foreground";

  return (
    <div
      className={`flex w-full flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${surface}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-black/5 ${iconTone}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          {!mine ? (
            <>
              <h2 className="text-sm font-semibold text-foreground sm:text-base">Confirme sua presença</h2>
              <p className="text-sm text-muted-foreground">Conte ao casal se você vai e com quantas pessoas.</p>
            </>
          ) : attending ? (
            <>
              <h2 className="text-sm font-semibold text-foreground sm:text-base">Presença confirmada</h2>
              <p className="text-sm text-muted-foreground">{describeParty(mine)}</p>
            </>
          ) : (
            <>
              <h2 className="text-sm font-semibold text-foreground sm:text-base">Você avisou que não poderá ir</h2>
              <p className="text-sm text-muted-foreground">Mudou de ideia? É só alterar a resposta.</p>
            </>
          )}
        </div>
      </div>

      <Button
        size="sm"
        variant={mine ? "outline" : "default"}
        onClick={handleOpen}
        className="w-full flex-shrink-0 sm:w-auto"
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

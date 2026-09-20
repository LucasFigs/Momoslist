"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, PartyPopper, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, SheetBody, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { describeParty, MAX_COMPANIONS_PER_KIND, type RsvpAnswer, type RsvpStatusValue } from "@/lib/rsvp";
import { saveRsvpAction } from "@/actions/rsvp.actions";

interface RsvpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  /** Resposta anterior do convidado (para editar). */
  initial: RsvpAnswer | null;
}

/** Opção grande e tocável (Vou / Não poderei ir; Só eu / Com acompanhantes). */
function ChoiceButton({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: typeof Check;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        // border-2 nos dois estados: trocar a seleção não "empurra" o layout.
        "flex min-h-[3.5rem] flex-1 items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground hover:border-input hover:bg-muted"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          selected ? "bg-primary-foreground text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight">{title}</span>
        {description && (
          <span className={cn("mt-0.5 block text-xs leading-snug", selected ? "text-primary-foreground/85" : "text-muted-foreground")}>
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

/** Contador com botões grandes (−/+): mais fácil que digitar, principalmente no celular. */
function Stepper({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (next: number) => void;
}) {
  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-input bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Diminuir ${label.toLowerCase()}`}
          onClick={() => onChange(value - 1)}
          disabled={value <= 0}
          className={buttonClass}
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span aria-live="polite" className="w-8 text-center text-lg font-semibold tabular-nums text-foreground">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Aumentar ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
          disabled={value >= MAX_COMPANIONS_PER_KIND}
          className={buttonClass}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function RsvpDialog({ open, onOpenChange, eventId, initial }: RsvpDialogProps) {
  const router = useRouter();
  const [status, setStatus] = useState<RsvpStatusValue | null>(initial?.status ?? null);
  const [withCompanions, setWithCompanions] = useState(
    Boolean(initial && initial.status === "ATTENDING" && initial.companionAdults + initial.companionChildren > 0)
  );
  const [adults, setAdults] = useState(initial?.status === "ATTENDING" ? initial.companionAdults : 0);
  const [children, setChildren] = useState(initial?.status === "ATTENDING" ? initial.companionChildren : 0);
  const [saving, setSaving] = useState(false);

  const attending = status === "ATTENDING";
  const companionAdults = attending && withCompanions ? adults : 0;
  const companionChildren = attending && withCompanions ? children : 0;
  const missingCompanions = attending && withCompanions && adults + children === 0;
  const canSave = status !== null && !missingCompanions && !saving;

  function chooseCompanions(next: boolean) {
    setWithCompanions(next);
    // Ao escolher "com acompanhantes" já começa em 1 adulto (o caso mais comum), em vez de exigir dois toques.
    if (next && adults + children === 0) setAdults(1);
  }

  async function handleSave() {
    if (!status || !canSave) return;
    setSaving(true);
    try {
      const result = await saveRsvpAction(eventId, { status, companionAdults, companionChildren });
      if (!result.success) {
        toast({ title: "Não foi possível salvar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: status === "ATTENDING" ? "Presença confirmada!" : "Resposta registrada",
        description:
          status === "ATTENDING"
            ? "O casal já sabe que você vai. Dá para alterar quando quiser."
            : "Avisamos o casal. Se mudar de ideia, é só responder de novo.",
      });
      onOpenChange(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const answer: RsvpAnswer | null = status ? { status, companionAdults, companionChildren } : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <DialogTitle>{initial ? "Alterar sua resposta" : "Confirmar presença"}</DialogTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Assim o casal consegue se organizar. Você pode mudar a resposta depois.
          </p>
        </SheetHeader>

        <SheetBody className="flex flex-col gap-5">
          <div role="radiogroup" aria-label="Você vai comparecer?" className="flex flex-col gap-2 sm:flex-row">
            <ChoiceButton
              selected={status === "ATTENDING"}
              onClick={() => setStatus("ATTENDING")}
              icon={PartyPopper}
              title="Vou comparecer"
            />
            <ChoiceButton
              selected={status === "NOT_ATTENDING"}
              onClick={() => setStatus("NOT_ATTENDING")}
              icon={X}
              title="Não poderei ir"
            />
          </div>

          {attending && (
            <div className="flex flex-col gap-3">
              <p id="companions-label" className="text-sm font-medium text-foreground">
                Você vai levar acompanhantes?
              </p>
              <div role="radiogroup" aria-labelledby="companions-label" className="flex flex-col gap-2 sm:flex-row">
                <ChoiceButton
                  selected={!withCompanions}
                  onClick={() => chooseCompanions(false)}
                  icon={Check}
                  title="Só eu"
                />
                <ChoiceButton
                  selected={withCompanions}
                  onClick={() => chooseCompanions(true)}
                  icon={Plus}
                  title="Sim, com acompanhantes"
                />
              </div>

              {withCompanions && (
                <div className="flex flex-col gap-2">
                  <Stepper label="Adultos" hint="além de você" value={adults} onChange={setAdults} />
                  <Stepper label="Crianças" hint="que vão com você" value={children} onChange={setChildren} />
                  {missingCompanions && (
                    <p role="alert" className="text-sm text-destructive">
                      Informe pelo menos um acompanhante, ou escolha &quot;Só eu&quot;.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {answer && !missingCompanions && (
            <p role="status" className="rounded-lg bg-primary-subtle p-3 text-sm font-medium text-foreground ring-1 ring-primary-border">
              {describeParty(answer)}
            </p>
          )}
        </SheetBody>

        <SheetFooter>
          <Button onClick={handleSave} disabled={!canSave} className="w-full">
            {saving ? "Salvando..." : initial ? "Salvar alterações" : "Confirmar presença"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Dialog>
  );
}

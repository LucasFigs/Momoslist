"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Copy, ImageOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dialog, DialogTitle, SheetBody, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/dialog";
import { FundProgress } from "@/components/fund-progress";
import { toast } from "@/hooks/use-toast";
import { cn, formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, suggestContributionAmounts, type FundTotals } from "@/lib/fund";
import { MAX_AMOUNT_IN_CENTS, parsePriceToCents } from "@/schemas/gift.schema";
import {
  cancelContributionAction,
  declareContributionAction,
  getContributionPixAction,
  type ContributionPixDetails,
} from "@/actions/contribution.actions";

export interface MyContribution {
  id: string;
  amountInCents: number;
  status: "DECLARED" | "CONFIRMED";
}

interface ContributeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  giftId: string;
  giftName: string;
  totals: FundTotals;
  minInCents: number;
  myContributions: MyContribution[];
  pixConfigured: boolean;
}

const pixKeyTypeLabel: Record<string, string> = {
  CPF: "CPF",
  CNPJ: "CNPJ",
  EMAIL: "E-mail",
  TELEFONE: "Telefone",
  ALEATORIA: "Chave aleatória",
};

function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function ContributeDialog({
  open,
  onOpenChange,
  giftId,
  giftName,
  totals,
  minInCents,
  myContributions,
  pixConfigured,
}: ContributeDialogProps) {
  const router = useRouter();
  // Uma flag por ação: o rótulo do botão nunca mostra "Gerando Pix..." enquanto outra coisa está em andamento.
  const [busy, setBusy] = useState<"pix" | "declare" | "cancel" | null>(null);
  const isBusy = busy !== null;
  const [step, setStep] = useState<"amount" | "pix">("amount");
  const [amountInput, setAmountInput] = useState("");
  const [pix, setPix] = useState<ContributionPixDetails | null>(null);
  const [qrFailed, setQrFailed] = useState(false);
  const [copied, setCopied] = useState<"key" | "code" | null>(null);
  const [cancelTarget, setCancelTarget] = useState<MyContribution | null>(null);

  const amountInCents = amountInput ? parsePriceToCents(amountInput) : NaN;
  const isValidAmount =
    Number.isFinite(amountInCents) && amountInCents >= minInCents && amountInCents <= MAX_AMOUNT_IN_CENTS;
  const showAmountError = Boolean(amountInput) && !isValidAmount;
  const showPixStep = pixConfigured && step === "pix";

  const progress = computeFundProgress(totals);
  const suggestions = suggestContributionAmounts(minInCents, progress.remainingInCents);

  // Prévia do efeito da contribuição: dá o "gostinho" de completar a barra.
  const projected = isValidAmount
    ? computeFundProgress({ ...totals, pendingInCents: totals.pendingInCents + amountInCents })
    : null;

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      // Reinicia o fluxo ao fechar, para reabrir sempre na escolha do valor.
      setStep("amount");
      setPix(null);
      setQrFailed(false);
    }
  }

  async function handleContinue() {
    if (!isValidAmount || isBusy) return;
    setBusy("pix");
    try {
      const result = await getContributionPixAction(giftId, amountInCents);
      if (!result.success) {
        toast({ title: "Não foi possível continuar", description: result.error, variant: "destructive" });
        return;
      }
      setPix(result.details);
      setQrFailed(false);
      setStep("pix");
    } finally {
      setBusy(null);
    }
  }

  async function handleDeclare() {
    if (isBusy) return;
    setBusy("declare");
    try {
      const result = await declareContributionAction(giftId, amountInCents);
      if (!result.success) {
        toast({ title: "Não foi possível registrar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: "Contribuição registrada. Obrigado!",
        description: "Assim que o anfitrião confirmar o Pix, ela passa a contar como confirmada.",
      });
      handleOpenChange(false);
      setAmountInput("");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function confirmCancel() {
    if (!cancelTarget || isBusy) return;
    setBusy("cancel");
    try {
      const result = await cancelContributionAction(cancelTarget.id);
      setCancelTarget(null);
      if (!result.success) {
        toast({ title: "Não foi possível cancelar", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Contribuição cancelada" });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function copy(text: string, which: "key" | "code") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Selecione o texto e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(which);
    toast({ title: which === "key" ? "Chave Pix copiada" : "Código Pix copiado" });
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <SheetContent size={showPixStep ? "lg" : "md"} aria-describedby={undefined}>
          {showPixStep && pix ? (
            <>
              <SheetHeader>
                <DialogTitle>Contribuir com a vaquinha</DialogTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {giftName} · {formatCentsToBRL(progress.raisedInCents)} de {formatCentsToBRL(totals.goalInCents)} (
                  {progress.percent}%)
                </p>
              </SheetHeader>

              <SheetBody className="flex flex-col gap-5">
                {/* Celular: uma coluna. Tela larga: QR à esquerda, dados à direita. */}
                <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6">
                  <div className="mx-auto">
                    {!qrFailed && pix.qrCodeDataUrl ? (
                      <div className="rounded-xl border border-border bg-white p-2.5">
                        <Image
                          src={pix.qrCodeDataUrl}
                          alt="QR Code Pix"
                          width={184}
                          height={184}
                          unoptimized
                          onError={() => setQrFailed(true)}
                        />
                      </div>
                    ) : (
                      <div
                        role="img"
                        aria-label="QR Code indisponível"
                        className="flex h-[205px] w-[205px] flex-col items-center justify-center gap-1 rounded-xl bg-neutral-200 p-3 text-center text-neutral-500"
                      >
                        <ImageOff className="h-5 w-5" aria-hidden="true" />
                        <span className="text-xs">QR Code indisponível — use a chave ou o copia e cola.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor a enviar</p>
                      <p className="text-2xl font-semibold tabular-nums text-foreground">{pix.amountLabel}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        {pixKeyTypeLabel[pix.pixKeyType] ?? pix.pixKeyType} de {pix.hostName}
                      </p>
                      <p className="select-all break-all text-sm font-medium text-foreground">{pix.pixKey}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => copy(pix.pixKey, "key")}>
                        {copied === "key" ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
                        {copied === "key" ? "Copiada" : "Copiar chave"}
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => copy(pix.copyPasteCode, "code")}>
                        {copied === "code" ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
                        {copied === "code" ? "Copiado" : "Copia e cola"}
                      </Button>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Pague no app do seu banco e depois toque em{" "}
                      <strong className="text-foreground">Já fiz o Pix</strong> para avisar o anfitrião. A contribuição
                      entra na barra como &quot;aguardando&quot; até ele confirmar.
                    </p>
                  </div>
                </div>
              </SheetBody>

              <SheetFooter>
                <Button onClick={handleDeclare} disabled={isBusy} className="w-full">
                  {busy === "declare" ? "Registrando..." : "Já fiz o Pix"}
                </Button>
                <Button variant="ghost" onClick={() => setStep("amount")} disabled={isBusy} className="w-full">
                  Voltar e mudar o valor
                </Button>
              </SheetFooter>
            </>
          ) : (
            // O <form> envolve corpo e rodapé: o botão fixo no rodapé envia o formulário (e o Enter também).
            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={(event) => {
                event.preventDefault();
                handleContinue();
              }}
            >
              <SheetHeader>
                <DialogTitle>Contribuir com a vaquinha</DialogTitle>
                <p className="mt-0.5 text-sm text-muted-foreground">{giftName}</p>
              </SheetHeader>

              <SheetBody className="flex flex-col gap-5">
                <FundProgress size="lg" {...totals} />

                {myContributions.length > 0 && (
                  <div className="rounded-lg border border-border bg-muted/40 p-3">
                    <p className="mb-2 text-xs font-medium text-foreground">Suas contribuições</p>
                    <ul className="flex flex-col gap-2">
                      {myContributions.map((contribution) => (
                        <li key={contribution.id} className="flex items-center justify-between gap-2 text-sm">
                          <span>
                            <span className="font-medium">{formatCentsToBRL(contribution.amountInCents)}</span>{" "}
                            <span
                              className={cn(
                                "text-xs",
                                contribution.status === "CONFIRMED" ? "text-success" : "text-muted-foreground"
                              )}
                            >
                              · {contribution.status === "CONFIRMED" ? "confirmada" : "aguardando confirmação"}
                            </span>
                          </span>
                          {contribution.status === "DECLARED" && (
                            <button
                              type="button"
                              onClick={() => setCancelTarget(contribution)}
                              disabled={isBusy}
                              className="min-h-9 px-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                            >
                              Cancelar
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!pixConfigured ? (
                  <p role="alert" className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                    O anfitrião ainda não cadastrou uma chave Pix, então não dá para contribuir por aqui por enquanto.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contribution-amount">Quanto você quer contribuir?</Label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-muted-foreground"
                          aria-hidden="true"
                        >
                          R$
                        </span>
                        <Input
                          id="contribution-amount"
                          inputMode="decimal"
                          autoComplete="off"
                          placeholder="0,00"
                          value={amountInput}
                          onChange={(event) => setAmountInput(event.target.value.replace(/[^\d.,]/g, ""))}
                          aria-invalid={showAmountError}
                          aria-describedby="contribution-hint"
                          className="h-12 pl-11 text-base"
                        />
                      </div>
                      <p
                        id="contribution-hint"
                        className={cn("text-xs", showAmountError ? "text-destructive" : "text-muted-foreground")}
                      >
                        {showAmountError
                          ? `Informe um valor a partir de ${formatCentsToBRL(minInCents)}.`
                          : `Mínimo de ${formatCentsToBRL(minInCents)}. Não há limite: a meta pode ser superada.`}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2" role="group" aria-label="Valores sugeridos">
                      {suggestions.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setAmountInput(centsToInput(value))}
                          aria-pressed={amountInCents === value}
                          className={cn(
                            "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            amountInCents === value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input bg-card hover:bg-muted"
                          )}
                        >
                          {value === progress.remainingInCents
                            ? `Completar (${formatCentsToBRL(value)})`
                            : formatCentsToBRL(value)}
                        </button>
                      ))}
                    </div>

                    {projected && (
                      <p role="status" className="text-sm text-muted-foreground">
                        Com a sua contribuição a vaquinha vai para{" "}
                        <span className="font-semibold text-foreground">{projected.percent}%</span>
                        {projected.reached && " — meta atingida!"}
                      </p>
                    )}
                  </div>
                )}
              </SheetBody>

              {pixConfigured && (
                <SheetFooter>
                  <Button type="submit" disabled={!isValidAmount || isBusy} className="w-full">
                    {busy === "pix" ? "Gerando Pix..." : "Continuar para o Pix"}
                  </Button>
                </SheetFooter>
              )}
            </form>
          )}
        </SheetContent>
      </Dialog>

      <ConfirmDialog
        open={cancelTarget !== null}
        onOpenChange={(next) => !next && setCancelTarget(null)}
        title="Cancelar esta contribuição?"
        description={
          cancelTarget
            ? `A contribuição de ${formatCentsToBRL(cancelTarget.amountInCents)} deixa de contar na vaquinha. Se você já fez o Pix, fale com o anfitrião.`
            : ""
        }
        confirmLabel="Sim, cancelar"
        cancelLabel="Manter"
        isPending={busy === "cancel"}
        onConfirm={confirmCancel}
      />
    </>
  );
}

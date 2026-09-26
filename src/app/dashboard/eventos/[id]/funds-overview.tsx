"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, PiggyBank } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GiftImage } from "@/components/gift-image";
import { toast } from "@/hooks/use-toast";
import { cn, formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import { confirmContributionAction, rejectContributionAction } from "@/actions/contribution.actions";

export interface FundContributionItem {
  id: string;
  guestName: string;
  amountInCents: number;
  status: "DECLARED" | "CONFIRMED";
  /** ISO 8601 */
  declaredAt: string;
}

export interface FundOverviewItem {
  giftId: string;
  name: string;
  imageUrl: string | null;
  minInCents: number;
  totals: FundTotals;
  contributions: FundContributionItem[];
}

const RECENT_LIMIT = 5;
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Recolhida por padrão: com várias vaquinhas essa área ocupava boa parte da tela do Resumo. O resumo (total
 * arrecadado e o que está aguardando) continua visível sem precisar expandir — só o detalhe fica escondido.
 */
export function FundsOverview({ funds }: { funds: FundOverviewItem[] }) {
  const [expanded, setExpanded] = useState(false);

  const totalRaised = funds.reduce((sum, fund) => sum + computeFundProgress(fund.totals).raisedInCents, 0);
  const pendingCount = funds.reduce(
    (sum, fund) => sum + fund.contributions.filter((item) => item.status === "DECLARED").length,
    0
  );

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-expanded={false}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="min-w-0 truncate text-sm text-foreground">
          <span className="font-medium">{funds.length === 1 ? "1 vaquinha" : `${funds.length} vaquinhas`}</span>
          {" · "}
          <span className="tabular-nums">{formatCentsToBRL(totalRaised)} arrecadados</span>
          {pendingCount > 0 && (
            <>
              {" · "}
              <span className="font-medium text-pending">{pendingCount} aguardando confirmação</span>
            </>
          )}
        </span>
        <span className="flex flex-shrink-0 items-center gap-1 text-sm font-medium text-primary">
          Ver vaquinhas
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setExpanded(false)}
        aria-expanded={true}
        className="flex items-center gap-1 self-end text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Recolher
        <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
      </button>
      <ul className="flex flex-col divide-y divide-border">
        {funds.map((fund) => (
          <FundRow key={fund.giftId} fund={fund} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Uma vaquinha numa linha só (miniatura, nome, barra e valores). As contribuições ficam recolhidas: o que exige
 * ação do casal (Pix aguardando) aparece como selo na linha, e o botão vira "Revisar".
 */
function FundRow({ fund }: { fund: FundOverviewItem }) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const progress = computeFundProgress(fund.totals);
  const panelId = `fund-panel-${fund.giftId}`;

  // Aguardando confirmação sempre primeiro (é onde o casal precisa agir); depois, as mais recentes.
  const ordered = [...fund.contributions].sort((a, b) => {
    if (a.status !== b.status) return a.status === "DECLARED" ? -1 : 1;
    return b.declaredAt.localeCompare(a.declaredAt);
  });
  const pendingCount = ordered.filter((item) => item.status === "DECLARED").length;
  const visible = showAll
    ? ordered
    : ordered.filter((item, index) => index < RECENT_LIMIT || item.status === "DECLARED");
  const hiddenCount = ordered.length - visible.length;

  const toggleLabel = open ? "Ocultar" : pendingCount > 0 ? "Revisar" : "Contribuições";

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-white">
          <GiftImage src={fund.imageUrl} alt="" fill fit="contain" sizes="40px" />
        </div>

        <div className="min-w-0 flex-1">
          {/* flex-wrap: no celular o selo desce para a linha de baixo em vez de cortar o nome. */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="flex min-w-0 max-w-full items-center gap-2">
              <PiggyBank className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
              <h3 className="truncate text-sm font-medium text-foreground">{fund.name}</h3>
            </span>
            {pendingCount > 0 && (
              <Badge variant="pending" className="flex-shrink-0">
                {pendingCount} aguardando
              </Badge>
            )}
          </div>

          <div
            role="progressbar"
            aria-label={`Progresso de ${fund.name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.min(progress.percent, 100)}
            className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${progress.confirmedBarPercent}%` }} />
            <div
              className="absolute inset-y-0 bg-primary/40"
              style={{ left: `${progress.confirmedBarPercent}%`, width: `${progress.pendingBarPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs tabular-nums text-muted-foreground">
            <span className="font-semibold text-foreground">{formatCentsToBRL(progress.raisedInCents)}</span> de{" "}
            {formatCentsToBRL(fund.totals.goalInCents)} · {progress.percent}%
            {progress.reached && <span className="font-medium text-success"> · meta atingida</span>}
            <span className="hidden sm:inline"> · mínimo {formatCentsToBRL(fund.minInCents)}</span>
          </p>
        </div>

        <Button
          variant={pendingCount > 0 && !open ? "soft" : "ghost"}
          size="sm"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${toggleLabel} de ${fund.name} (${fund.contributions.length})`}
          className="flex-shrink-0 gap-1 sm:w-32 sm:justify-between"
        >
          <span className="hidden sm:inline">{toggleLabel}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
        </Button>
      </div>

      {open && (
        <div id={panelId} className="mt-3">
          {fund.contributions.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border px-4 py-4 text-center text-sm text-muted-foreground">
              Ainda sem contribuições. Compartilhe o link da lista para os convidados começarem a contribuir.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
                {visible.map((item) => (
                  <ContributionRow key={item.id} item={item} />
                ))}
              </ul>
              {(hiddenCount > 0 || showAll) && ordered.length > RECENT_LIMIT && (
                <Button variant="ghost" size="sm" className="self-center" onClick={() => setShowAll((c) => !c)}>
                  {showAll ? "Mostrar só as mais recentes" : `Ver todas (${ordered.length})`}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function ContributionRow({ item }: { item: FundContributionItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [removeOpen, setRemoveOpen] = useState(false);
  const awaiting = item.status === "DECLARED";

  function handleConfirm() {
    startTransition(async () => {
      const result = await confirmContributionAction(item.id);
      if (!result.success) {
        toast({ title: "Não foi possível confirmar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: "Contribuição confirmada",
        description: `${formatCentsToBRL(item.amountInCents)} de ${item.guestName} entrou na vaquinha.`,
      });
      router.refresh();
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await rejectContributionAction(item.id);
      setRemoveOpen(false);
      if (!result.success) {
        toast({ title: "Não foi possível remover", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Contribuição removida", description: "O valor deixou de contar na vaquinha." });
      router.refresh();
    });
  }

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {formatCentsToBRL(item.amountInCents)}{" "}
          <span className="font-normal text-muted-foreground">· {item.guestName}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {dateFormatter.format(new Date(item.declaredAt))} ·{" "}
          <span className={cn("font-medium", awaiting ? "text-pending" : "text-success")}>
            {awaiting ? "Aguardando confirmação" : "Pix confirmado"}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {awaiting && (
          <Button size="sm" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Confirmando..." : "Confirmar recebimento"}
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setRemoveOpen(true)}
          disabled={isPending}
          aria-label={`${awaiting ? "Não recebi a" : "Remover"} contribuição de ${formatCentsToBRL(item.amountInCents)} de ${item.guestName}`}
        >
          {awaiting ? "Não recebi" : "Remover"}
        </Button>
      </div>

      <ConfirmDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        title={awaiting ? "Marcar como não recebido?" : "Remover esta contribuição?"}
        description={`${formatCentsToBRL(item.amountInCents)} de ${item.guestName} deixa de contar na vaquinha. ${
          awaiting ? "Use quando o Pix não caiu ou foi declarado por engano." : "Use só se o valor foi devolvido ou lançado errado."
        }`}
        confirmLabel={awaiting ? "Sim, não recebi" : "Sim, remover"}
        isPending={isPending}
        onConfirm={handleRemove}
      />
    </li>
  );
}

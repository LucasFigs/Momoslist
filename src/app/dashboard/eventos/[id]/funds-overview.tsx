"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PiggyBank } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GiftImage } from "@/components/gift-image";
import { FundProgress } from "@/components/fund-progress";
import { toast } from "@/hooks/use-toast";
import { cn, formatCentsToBRL } from "@/lib/utils";
import type { FundTotals } from "@/lib/fund";
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

export function FundsOverview({ funds }: { funds: FundOverviewItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      {funds.map((fund) => (
        <FundBlock key={fund.giftId} fund={fund} />
      ))}
    </div>
  );
}

function FundBlock({ fund }: { fund: FundOverviewItem }) {
  const [showAll, setShowAll] = useState(false);

  // Aguardando confirmação sempre primeiro (é onde o anfitrião precisa agir); depois, as mais recentes.
  const ordered = [...fund.contributions].sort((a, b) => {
    if (a.status !== b.status) return a.status === "DECLARED" ? -1 : 1;
    return b.declaredAt.localeCompare(a.declaredAt);
  });
  const visible = showAll
    ? ordered
    : ordered.filter((item, index) => index < RECENT_LIMIT || item.status === "DECLARED");
  const hiddenCount = ordered.length - visible.length;

  return (
    <section aria-labelledby={`fund-${fund.giftId}`} className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-white">
          <GiftImage src={fund.imageUrl} alt="" fill fit="contain" sizes="48px" />
        </div>
        <div className="min-w-0">
          <h3 id={`fund-${fund.giftId}`} className="flex items-center gap-2 font-medium text-foreground">
            <PiggyBank className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{fund.name}</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Mínimo por pessoa: {formatCentsToBRL(fund.minInCents)}
          </p>
        </div>
      </div>

      <FundProgress size="lg" {...fund.totals} />

      {fund.contributions.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          Ainda sem contribuições. Compartilhe o link da lista para os convidados começarem a contribuir.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
            {visible.map((item) => (
              <ContributionRow key={item.id} item={item} />
            ))}
          </ul>
          {(hiddenCount > 0 || showAll) && ordered.length > RECENT_LIMIT && (
            <Button variant="ghost" size="sm" className="self-center" onClick={() => setShowAll((current) => !current)}>
              {showAll ? "Mostrar só as mais recentes" : `Ver todas (${ordered.length})`}
            </Button>
          )}
        </div>
      )}
    </section>
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
          aria-label={`${awaiting ? "Recusar" : "Remover"} contribuição de ${formatCentsToBRL(item.amountInCents)} de ${item.guestName}`}
        >
          {awaiting ? "Recusar" : "Remover"}
        </Button>
      </div>

      <ConfirmDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        title={awaiting ? "Recusar esta contribuição?" : "Remover esta contribuição?"}
        description={`${formatCentsToBRL(item.amountInCents)} de ${item.guestName} deixa de contar na vaquinha. ${
          awaiting ? "Use quando o Pix não chegou ou foi declarado por engano." : "Use só se o valor foi devolvido ou lançado errado."
        }`}
        confirmLabel={awaiting ? "Sim, recusar" : "Sim, remover"}
        isPending={isPending}
        onConfirm={handleRemove}
      />
    </li>
  );
}

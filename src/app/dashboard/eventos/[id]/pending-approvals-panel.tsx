"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Clock, Gift as GiftIcon, PiggyBank, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { confirmPixReceivedAction } from "@/actions/payment.actions";
import { confirmContributionAction, rejectContributionAction } from "@/actions/contribution.actions";

export interface PendingApprovalItem {
  /** id da reserva ou da contribuição — é o que as actions de confirmar/recusar recebem. */
  id: string;
  /** Reserva de presente/item Pix só tem "confirmar" (não existe recusar uma compra); vaquinha tem os dois. */
  source: "reservation" | "contribution";
  giftKind: "PRODUCT" | "PIX" | "FUND";
  guestName: string;
  itemName: string;
  amountLabel: string;
  /** ISO 8601 — data em que o convidado avisou o Pix, para ordenar do mais recente. */
  at: string;
}

const RECENT_LIMIT = 5;
const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const ICON_BY_KIND = { PRODUCT: GiftIcon, PIX: QrCode, FUND: PiggyBank } as const;

/**
 * Todo Pix aguardando confirmação num só lugar — de presente, item Pix ou vaquinha — logo abaixo do
 * cabeçalho, visível em qualquer aba. É o "o que precisa da minha atenção agora" da lista.
 */
export function PendingApprovalsPanel({ items }: { items: PendingApprovalItem[] }) {
  const [showAll, setShowAll] = useState(false);

  if (items.length === 0) return null;

  const ordered = [...items].sort((a, b) => b.at.localeCompare(a.at));
  const visible = showAll ? ordered : ordered.slice(0, RECENT_LIMIT);
  const hiddenCount = ordered.length - visible.length;

  return (
    <section
      aria-labelledby="pending-approvals-title"
      className="flex flex-col gap-3 rounded-xl border border-pending/25 bg-pending-soft p-4 sm:p-5"
    >
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 flex-shrink-0 text-pending" aria-hidden="true" />
        <h2 id="pending-approvals-title" className="text-sm font-semibold text-foreground">
          Pix aguardando confirmação
          <span className="ml-1.5 tabular-nums text-muted-foreground">({items.length})</span>
        </h2>
      </div>

      <ul className="flex flex-col divide-y divide-pending/15 rounded-lg border border-pending/15 bg-card">
        {visible.map((item) => (
          <ApprovalRow key={item.id} item={item} />
        ))}
      </ul>

      {(hiddenCount > 0 || showAll) && ordered.length > RECENT_LIMIT && (
        <Button variant="ghost" size="sm" className="self-center" onClick={() => setShowAll((current) => !current)}>
          {showAll ? "Mostrar só os mais recentes" : `Ver todos (${ordered.length})`}
        </Button>
      )}
    </section>
  );
}

function ApprovalRow({ item }: { item: PendingApprovalItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isContribution = item.source === "contribution";
  const Icon = ICON_BY_KIND[item.giftKind];

  function handleConfirm() {
    startTransition(async () => {
      const action = isContribution ? confirmContributionAction : confirmPixReceivedAction;
      const result = await action(item.id);
      if (!result.success) {
        toast({ title: "Não foi possível confirmar", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Pix confirmado", description: `${item.amountLabel} de ${item.guestName} confirmado.` });
      router.refresh();
    });
  }

  function handleReject() {
    startTransition(async () => {
      const result = await rejectContributionAction(item.id);
      if (!result.success) {
        toast({ title: "Não foi possível recusar", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Contribuição recusada" });
      router.refresh();
    });
  }

  return (
    <li className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex min-w-0 items-start gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-foreground">
            {item.amountLabel} <span className="font-normal text-muted-foreground">· {item.itemName}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {item.guestName} · {dateFormatter.format(new Date(item.at))}
          </p>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
        <Button size="sm" onClick={handleConfirm} disabled={isPending} className="flex-1 sm:flex-none">
          {isPending ? "Confirmando..." : "Confirmar"}
        </Button>
        {isContribution && (
          <Button size="sm" variant="ghost" onClick={handleReject} disabled={isPending}>
            Recusar
          </Button>
        )}
      </div>
    </li>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Gift as GiftIcon, PiggyBank, QrCode } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/hooks/use-toast";
import { confirmPixReceivedAction, rejectPixReceivedAction } from "@/actions/payment.actions";
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
 * Todo Pix aguardando confirmação num só lugar — de presente, item Pix ou vaquinha. Vive dentro de um Card
 * comum no Resumo (mesma superfície neutra das outras seções): só a lista em si usa a cor de "pendente", no
 * selo e no botão — o cartão inteiro não vira uma faixa colorida, para não competir com o resto da tela.
 */
export function PendingApprovalsPanel({ items }: { items: PendingApprovalItem[] }) {
  const [showAll, setShowAll] = useState(false);

  if (items.length === 0) return null;

  const ordered = [...items].sort((a, b) => b.at.localeCompare(a.at));
  const visible = showAll ? ordered : ordered.slice(0, RECENT_LIMIT);
  const hiddenCount = ordered.length - visible.length;

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {visible.map((item) => (
          <ApprovalRow key={item.id} item={item} />
        ))}
      </ul>

      {(hiddenCount > 0 || showAll) && ordered.length > RECENT_LIMIT && (
        <Button variant="ghost" size="sm" className="self-center" onClick={() => setShowAll((current) => !current)}>
          {showAll ? "Mostrar só os mais recentes" : `Ver todos (${ordered.length})`}
        </Button>
      )}
    </div>
  );
}

function ApprovalRow({ item }: { item: PendingApprovalItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [rejectOpen, setRejectOpen] = useState(false);
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
      const action = isContribution ? rejectContributionAction : rejectPixReceivedAction;
      const result = await action(item.id);
      setRejectOpen(false);
      if (!result.success) {
        toast({ title: "Não foi possível registrar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: "Marcado como não recebido",
        description: isContribution
          ? "O valor deixou de contar na vaquinha."
          : `“${item.itemName}” voltou a ficar disponível para outros convidados.`,
      });
      router.refresh();
    });
  }

  return (
    <li className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex min-w-0 items-start gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="break-words text-sm font-medium text-foreground">
              {item.amountLabel} <span className="font-normal text-muted-foreground">· {item.itemName}</span>
            </p>
            <Badge variant="pending" className="flex-shrink-0">
              Aguardando
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {item.guestName} · {dateFormatter.format(new Date(item.at))}
          </p>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
        <Button size="sm" onClick={handleConfirm} disabled={isPending} className="flex-1 sm:flex-none">
          {isPending ? "Confirmando..." : "Confirmar"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setRejectOpen(true)} disabled={isPending}>
          Não recebi
        </Button>
      </div>

      <ConfirmDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        title="Marcar como não recebido?"
        description={
          isContribution
            ? `${item.amountLabel} de ${item.guestName} deixa de contar na vaquinha. Use quando o Pix não caiu ou foi declarado por engano.`
            : `A reserva de ${item.guestName} para “${item.itemName}” será cancelada e o item volta a ficar disponível. Use quando o Pix não caiu ou foi declarado por engano.`
        }
        confirmLabel="Sim, não recebi"
        isPending={isPending}
        onConfirm={handleReject}
      />
    </li>
  );
}

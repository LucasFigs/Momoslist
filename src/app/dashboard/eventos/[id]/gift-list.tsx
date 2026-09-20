"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Gift } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/lib/utils";
import { deleteGiftAction } from "@/actions/gift.actions";
import { GiftFormDialog } from "./gift-form-dialog";
import { PackageOpen, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { GiftImage } from "@/components/gift-image";
import { toast } from "@/hooks/use-toast";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import { PiggyBank, QrCode } from "lucide-react";

// Mesmas colunas no cabeçalho e nas linhas: miniatura | nome | quantidade | valor | ações.
// No celular, quantidade e valor descem para baixo do nome e só sobram 3 colunas.
const ROW_GRID = "grid grid-cols-[3rem_1fr_auto] items-center gap-x-3 md:grid-cols-[3rem_1fr_6rem_8rem_6.5rem]";

interface GiftListProps {
  eventId: string;
  gifts: Gift[];
  /** Totais por vaquinha (chave = id do presente). */
  fundTotals: Record<string, FundTotals>;
  pixConfigured: boolean;
}

export function GiftList({ eventId, gifts, fundTotals, pixConfigured }: GiftListProps) {
  if (gifts.length === 0) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="Sua lista ainda está vazia"
        description="Adicione seu primeiro presente para começar."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div
        className={`${ROW_GRID} hidden bg-muted/40 px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid`}
        aria-hidden="true"
      >
        <span className="col-span-2">Presente</span>
        <span>Quantidade</span>
        <span>Valor</span>
        <span className="text-right">Ações</span>
      </div>
      <ul className="divide-y divide-border">
        {gifts.map((gift) => (
          <GiftRow
            key={gift.id}
            eventId={eventId}
            gift={gift}
            fundTotals={fundTotals[gift.id]}
            pixConfigured={pixConfigured}
          />
        ))}
      </ul>
    </div>
  );
}

function GiftRow({
  eventId,
  gift,
  fundTotals,
  pixConfigured,
}: {
  eventId: string;
  gift: Gift;
  fundTotals?: FundTotals;
  pixConfigured: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function confirmDelete() {
    startTransition(async () => {
      const result = await deleteGiftAction(gift.id);
      setConfirmOpen(false);
      if (!result.success) {
        toast({
          title: "Não foi possível excluir o presente",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Presente excluído", description: `“${gift.name}” foi removido da lista.` });
      router.refresh();
    });
  }

  const price = formatCentsToBRL(gift.priceInCents);
  const isFund = gift.kind === "FUND";
  const isPixOnly = gift.kind === "PIX";
  const fund = isFund && fundTotals ? computeFundProgress(fundTotals) : null;

  return (
    <li className={`${ROW_GRID} px-3 py-3`}>
      <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
        <GiftImage src={gift.imageUrl} alt={gift.name} fill fit="contain" sizes="48px" />
      </div>

      <div className="min-w-0">
        <p className="line-clamp-2 break-words font-medium text-foreground">
          {isFund && (
            <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 align-middle text-[11px] font-medium text-primary">
              <PiggyBank className="h-3 w-3" aria-hidden="true" />
              Vaquinha
            </span>
          )}
          {isPixOnly && (
            <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 align-middle text-[11px] font-medium text-primary">
              <QrCode className="h-3 w-3" aria-hidden="true" />
              Pix
            </span>
          )}
          {gift.name}
        </p>
        {/* Só no celular: no desktop esses dados têm coluna própria. */}
        <p className="mt-0.5 text-sm text-muted-foreground md:hidden">
          {isFund ? `Meta ${price}` : `${price} · ${gift.quantity} un.`}
        </p>
        {fund && (
          <div className="mt-1.5 max-w-xs">
            <div
              role="progressbar"
              aria-label={`Progresso de ${gift.name}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(fund.percent, 100)}
              className="relative h-1.5 overflow-hidden rounded-full bg-muted"
            >
              <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${fund.confirmedBarPercent}%` }} />
              <div
                className="absolute inset-y-0 bg-primary/40"
                style={{ left: `${fund.confirmedBarPercent}%`, width: `${fund.pendingBarPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatCentsToBRL(fund.raisedInCents)} de {price} · {fund.percent}%
              {fund.reached && " · meta atingida"}
            </p>
          </div>
        )}
      </div>

      <span className="hidden text-sm text-muted-foreground md:block">{isFund ? "—" : gift.quantity}</span>
      <span className="hidden text-sm text-muted-foreground md:block">
        {isFund ? `Meta ${price}` : price}
      </span>

      <div className="flex justify-end gap-1">
        <GiftFormDialog
          eventId={eventId}
          gift={gift}
          pixConfigured={pixConfigured}
          trigger={
            <Button size="icon" variant="ghost" aria-label={`Editar ${gift.name}`}>
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
          aria-label={`Excluir ${gift.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={`Excluir "${gift.name}"?`}
          description="Essa ação não pode ser desfeita."
          confirmLabel="Excluir"
          isPending={isPending}
          onConfirm={confirmDelete}
        />
      </div>
    </li>
  );
}

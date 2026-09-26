"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Gift } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cn, formatCentsToBRL } from "@/lib/utils";
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

type SortKey = "created_asc" | "created_desc" | "name_asc" | "name_desc" | "price_asc" | "price_desc" | "type";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "created_asc", label: "Ordem de cadastro" },
  { value: "created_desc", label: "Mais recentes primeiro" },
  { value: "name_asc", label: "Nome (A–Z)" },
  { value: "name_desc", label: "Nome (Z–A)" },
  { value: "price_asc", label: "Menor valor" },
  { value: "price_desc", label: "Maior valor" },
  { value: "type", label: "Tipo de item" },
];

const KIND_RANK: Record<Gift["kind"], number> = { PRODUCT: 0, PIX: 1, FUND: 2 };

/** `gifts` já chega na ordem de cadastro; o sort do JS é estável, então empates mantêm essa ordem. */
function sortGifts(gifts: Gift[], sort: SortKey): Gift[] {
  const list = [...gifts];
  switch (sort) {
    case "created_desc":
      return list.reverse();
    case "name_asc":
      return list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
    case "name_desc":
      return list.sort((a, b) => b.name.localeCompare(a.name, "pt-BR", { sensitivity: "base" }));
    // Na vaquinha, `priceInCents` é a meta: é o valor que faz sentido comparar na lista.
    case "price_asc":
      return list.sort((a, b) => a.priceInCents - b.priceInCents);
    case "price_desc":
      return list.sort((a, b) => b.priceInCents - a.priceInCents);
    case "type":
      return list.sort((a, b) => KIND_RANK[a.kind] - KIND_RANK[b.kind]);
    default:
      return list;
  }
}

interface GiftListProps {
  eventId: string;
  gifts: Gift[];
  /** Totais por vaquinha (chave = id do presente). */
  fundTotals: Record<string, FundTotals>;
  /** Unidades já reservadas por presente/item Pix (chave = id do presente; vaquinha não entra aqui). */
  reservedUnitsByGiftId: Record<string, number>;
  pixConfigured: boolean;
}

/** Vaquinha que já bateu a meta, ou presente/item Pix sem nenhuma unidade sobrando: não precisa mais de atenção. */
function isDone(gift: Gift, fundTotals: Record<string, FundTotals>, reservedUnitsByGiftId: Record<string, number>): boolean {
  if (gift.kind === "FUND") {
    const totals = fundTotals[gift.id];
    return totals ? computeFundProgress(totals).reached : false;
  }
  return (reservedUnitsByGiftId[gift.id] ?? 0) >= gift.quantity;
}

export function GiftList({ eventId, gifts, fundTotals, reservedUnitsByGiftId, pixConfigured }: GiftListProps) {
  const [sort, setSort] = useState<SortKey>("created_asc");
  const sorted = useMemo(() => {
    // Depois de aplicar a ordenação escolhida, o que já foi resolvido (esgotado, meta atingida) desce pro
    // final — não importa o critério, é sempre o que precisa de menos atenção do casal agora.
    const base = sortGifts(gifts, sort);
    return [...base].sort(
      (a, b) => Number(isDone(a, fundTotals, reservedUnitsByGiftId)) - Number(isDone(b, fundTotals, reservedUnitsByGiftId))
    );
  }, [gifts, sort, fundTotals, reservedUnitsByGiftId]);

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
    <div className="flex flex-col gap-3">
      {gifts.length > 1 && (
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-xs text-muted-foreground">
            A ordem aqui é só para você organizar. Os convidados veem os itens na ordem de cadastro.
          </p>
          <div className="flex flex-shrink-0 items-center gap-2">
            <Label htmlFor="gift-sort" className="whitespace-nowrap text-sm text-muted-foreground">
              Ordenar por
            </Label>
            <Select
              id="gift-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-10 w-full sm:h-9 sm:w-56"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}

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
          {sorted.map((gift) => (
            <GiftRow
              key={gift.id}
              eventId={eventId}
              gift={gift}
              fundTotals={fundTotals[gift.id]}
              reservedUnits={reservedUnitsByGiftId[gift.id] ?? 0}
              pixConfigured={pixConfigured}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function GiftRow({
  eventId,
  gift,
  fundTotals,
  reservedUnits,
  pixConfigured,
}: {
  eventId: string;
  gift: Gift;
  fundTotals?: FundTotals;
  reservedUnits: number;
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
  // Vaquinha não tem "reservado" (é contribuição livre, sem unidade). Só presentes/itens Pix mostram isso.
  const soldOut = !isFund && reservedUnits >= gift.quantity;
  const reservedLabel = soldOut ? "Esgotado" : reservedUnits > 0 ? `${reservedUnits} reservado${reservedUnits > 1 ? "s" : ""}` : null;
  // Esgotado ou meta batida: já foi "resolvido", então a linha fica esmaecida — como um item desabilitado —
  // pra puxar a atenção do casal para o que ainda precisa dela.
  const done = soldOut || Boolean(fund?.reached);

  return (
    <li className={cn(ROW_GRID, "px-3 py-3", done && "bg-muted/40")}>
      <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
        <GiftImage
          src={gift.imageUrl}
          alt={gift.name}
          fill
          fit="contain"
          sizes="48px"
          className={cn(done && "opacity-40 grayscale")}
        />
      </div>

      <div className="min-w-0">
        <p className={cn("line-clamp-2 break-words font-medium", done ? "text-muted-foreground" : "text-foreground")}>
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
          {reservedLabel && (
            <Badge variant="neutral" className="ml-1.5 align-middle">
              {reservedLabel}
            </Badge>
          )}
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

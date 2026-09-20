"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/hooks/use-toast";
import { confirmPixReceivedAction } from "@/actions/payment.actions";
import { Inbox } from "lucide-react";

const RECENT_LIMIT = 8;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });

function isAwaitingPixConfirmation(selection: GuestSelection): boolean {
  return selection.paymentMethod === "PIX" && selection.pixStatus === "DECLARED";
}

export interface GuestSelection {
  reservationId: string;
  /** ISO 8601 — a lista chega ordenada da mais recente para a mais antiga. */
  reservedAt: string;
  giftName: string;
  guestName: string;
  priceLabel: string;
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX" | null;
  status: string;
  pixStatus: string;
}

function statusLabel(selection: GuestSelection): string {
  if (selection.paymentMethod === "PIX") {
    if (selection.pixStatus === "CONFIRMED") return "Pix confirmado";
    if (selection.pixStatus === "DECLARED") return "Aguardando confirmação";
    return "Aguardando pagamento";
  }
  if (selection.status === "COMPLETED") return "Compra confirmada";
  if (selection.status === "CONFIRMED") return "Selecionado";
  return "Reserva em andamento";
}

/** Concluído = verde, precisa de ação/espera = âmbar, o resto = neutro. O texto do selo sempre diz o estado. */
function statusVariant(selection: GuestSelection): "success" | "pending" | "neutral" {
  if (selection.pixStatus === "CONFIRMED" || selection.status === "COMPLETED") return "success";
  if (selection.paymentMethod === "PIX" && selection.pixStatus !== "CONFIRMED") return "pending";
  return "neutral";
}

export function GuestSelections({ selections }: { selections: GuestSelection[] }) {
  const [showAll, setShowAll] = useState(false);

  if (selections.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Ainda não há presentes escolhidos"
        description="Assim que seus convidados escolherem, eles aparecem aqui com o método e o status."
        className="py-10"
      />
    );
  }

  // Um Pix aguardando confirmação nunca some atrás do "Ver todas": é a única
  // ação que o anfitrião precisa fazer aqui.
  const visible = showAll
    ? selections
    : selections.filter(
        (selection, index) => index < RECENT_LIMIT || isAwaitingPixConfirmation(selection)
      );
  const hiddenCount = selections.length - visible.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {visible.map((selection) => (
          <SelectionRow key={selection.reservationId} selection={selection} />
        ))}
      </div>
      {(hiddenCount > 0 || showAll) && selections.length > RECENT_LIMIT && (
        <Button
          variant="ghost"
          size="sm"
          className="self-center"
          onClick={() => setShowAll((current) => !current)}
        >
          {showAll ? "Mostrar só as mais recentes" : `Ver todas (${selections.length})`}
        </Button>
      )}
    </div>
  );
}

function SelectionRow({ selection }: { selection: GuestSelection }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const awaitingConfirmation = isAwaitingPixConfirmation(selection);

  function handleConfirm() {
    startTransition(async () => {
      const result = await confirmPixReceivedAction(selection.reservationId);
      if (!result.success) {
        toast({
          title: "Não foi possível confirmar o Pix",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Pix confirmado",
        description: `Recebimento de “${selection.giftName}” registrado.`,
      });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div>
        <p className="font-medium text-foreground">{selection.giftName}</p>
        <p className="text-sm text-muted-foreground">
          {selection.guestName} · {selection.priceLabel} ·{" "}
          {selection.paymentMethod === "PIX" ? "Pix" : "Compra externa"} ·{" "}
          {dateFormatter.format(new Date(selection.reservedAt))}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={statusVariant(selection)}>{statusLabel(selection)}</Badge>
        {awaitingConfirmation && (
          <Button size="sm" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Confirmando..." : "Confirmar recebimento"}
          </Button>
        )}
      </div>
    </div>
  );
}

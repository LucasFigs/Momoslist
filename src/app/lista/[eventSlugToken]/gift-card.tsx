"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { GiftAvailability } from "@/lib/gift-availability";
import {
  createReservationAction,
  confirmReservationMethodAction,
  cancelReservationAction,
} from "@/actions/reservation.actions";
import { PaymentPanel } from "./payment-panel";
import { IdentifyGuestDialog } from "./identify-guest-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GiftImage } from "@/components/gift-image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PaymentMethod = "EXTERNAL_PURCHASE" | "PIX";

interface MyReservation {
  id: string;
  status: "TEMPORARY" | "CONFIRMED" | "COMPLETED";
  paymentMethod: PaymentMethod | null;
  pixStatus: string;
  expiresAt: string;
}

interface GiftCardProps {
  gift: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    priceLabel: string;
  };
  availability: GiftAvailability;
  isIdentified: boolean;
  myReservation: MyReservation | null;
}

/** Texto do selo do card conforme o ponto do fluxo em que este convidado está. */
function reservationLabel(reservation: MyReservation): string {
  if (reservation.status === "TEMPORARY") return "Reservado para você";
  if (reservation.paymentMethod === "PIX") {
    if (reservation.pixStatus === "CONFIRMED") return "Pix confirmado";
    if (reservation.pixStatus === "DECLARED") return "Pix informado";
    return "Aguardando seu Pix";
  }
  return reservation.status === "COMPLETED" ? "Compra confirmada" : "Aguardando compra";
}

// Botões dentro do painel do card: podem quebrar linha e crescer em altura em vez de estourar a largura.
const panelButton = "h-auto min-h-10 w-full whitespace-normal py-2 text-center leading-tight";

function useCountdown(expiresAt: string | undefined) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!expiresAt) {
      setLabel(null);
      return;
    }
    const target = new Date(expiresAt).getTime();

    function tick() {
      const diffMs = target - Date.now();
      if (diffMs <= 0) {
        setLabel("Expirando...");
        return;
      }
      const minutes = Math.floor(diffMs / 60_000);
      const seconds = Math.floor((diffMs % 60_000) / 1000);
      setLabel(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return label;
}

export function GiftCard({ gift, availability, isIdentified, myReservation }: GiftCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [identifyOpen, setIdentifyOpen] = useState(false);
  const countdown = useCountdown(myReservation?.status === "TEMPORARY" ? myReservation.expiresAt : undefined);

  const isSelectable = availability.status !== "UNAVAILABLE";
  const showSoldOut = !myReservation && !isSelectable;

  function doReserve() {
    startTransition(async () => {
      const result = await createReservationAction(gift.id);
      if (!result.success) {
        toast({ title: "Não foi possível reservar", description: result.error, variant: "destructive" });
        // Pode ter sido um conflito (outra pessoa pegou a última unidade): atualiza o card.
        router.refresh();
        return;
      }
      toast({
        title: "Presente reservado para você",
        description: "Agora escolha como vai presentear.",
      });
      router.refresh();
    });
  }

  function handleReserve() {
    if (!isIdentified) {
      setIdentifyOpen(true);
      return;
    }
    doReserve();
  }

  function handleIdentified() {
    setIdentifyOpen(false);
    doReserve();
  }

  function handleChooseMethod(method: PaymentMethod) {
    if (!myReservation) return;
    startTransition(async () => {
      const result = await confirmReservationMethodAction(myReservation.id, method);
      if (!result.success) {
        toast({ title: "Não foi possível continuar", description: result.error, variant: "destructive" });
        router.refresh();
        return;
      }
      router.refresh();
    });
  }

  function handleCancel() {
    setConfirmOpen(true);
  }

  function confirmCancel() {
    if (!myReservation) return;
    startTransition(async () => {
      const result = await cancelReservationAction(myReservation.id);
      setConfirmOpen(false);
      if (!result.success) {
        toast({ title: "Não foi possível desistir", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Reserva cancelada", description: "O presente voltou a ficar disponível." });
      router.refresh();
    });
  }

  const pixAlreadyDeclared =
    myReservation?.paymentMethod === "PIX" && myReservation.pixStatus === "DECLARED";

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden",
        // Reservou? O próprio card muda: contorno na cor da lista + selo. Não depende só do toast.
        // No celular ele ocupa a linha inteira (foto ao lado): o painel de pagamento não cabe em ~170px.
        myReservation && "col-span-2 border-primary/60 ring-1 ring-primary/30 max-md:flex-row md:col-span-1"
      )}
    >
      {/* Quadrado em todas as telas (igual ao GiftCardSkeleton). "contain": a foto aparece inteira,
          sem recorte — o que sobra nas laterais fica em branco, como numa vitrine de produto. */}
      <div
        className={cn(
          "relative aspect-square w-full border-b border-border bg-white",
          myReservation &&
            "max-md:aspect-auto max-md:min-h-[9rem] max-md:w-[36%] max-md:flex-shrink-0 max-md:self-stretch max-md:border-b-0 max-md:border-r"
        )}
      >
        <GiftImage
          src={gift.imageUrl}
          alt={gift.name}
          fill
          fit="contain"
          sizes="(min-width: 1024px) 285px, (min-width: 768px) 33vw, 50vw"
          className={cn(showSoldOut && "opacity-50 grayscale")}
        />
        {showSoldOut && (
          <Badge variant="overlayDark" className="absolute left-2 top-2">
            Já escolhido
          </Badge>
        )}
      </div>

      <CardContent className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        {/* O selo de estado fica no conteúdo (não sobre a foto): nunca é cortado, em qualquer largura. */}
        {myReservation && (
          <Badge variant="solid" className="w-fit max-w-full">
            <Check className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{reservationLabel(myReservation)}</span>
          </Badge>
        )}
        <div className="min-w-0">
          <h3 className="line-clamp-2 break-words text-[15px] font-medium leading-snug text-foreground sm:text-base">
            {gift.name}
          </h3>
          {/* A descrição só aparece a partir de sm: no celular, imagem → nome → preço → ação bastam. */}
          {gift.description && (
            <p className="mt-1 hidden break-words text-sm text-muted-foreground sm:line-clamp-2">
              {gift.description}
            </p>
          )}
        </div>

        {/* Preço + ação sempre empilhados e alinhados na base: todos os cards ficam iguais. */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <span className="text-base font-semibold tabular-nums text-foreground">{gift.priceLabel}</span>

          {myReservation ? null : !isSelectable ? (
            <Button size="sm" variant="secondary" disabled className="w-full">
              Indisponível
            </Button>
          ) : (
            <Button size="sm" variant="soft" onClick={handleReserve} disabled={isPending} className="w-full">
              {isPending ? "Reservando..." : "Presentear"}
            </Button>
          )}

          {myReservation?.status === "TEMPORARY" && (
            <div className="rounded-lg bg-primary-subtle p-3 ring-1 ring-primary-border">
              <p className="text-sm font-medium text-foreground">Guardamos este presente para você</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Ele fica reservado por{" "}
                <span className="font-semibold tabular-nums text-foreground">{countdown ?? "--:--"}</span>. Como você
                quer presentear?
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Button size="sm" disabled={isPending} onClick={() => handleChooseMethod("PIX")} className={panelButton}>
                  Pagar via Pix
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => handleChooseMethod("EXTERNAL_PURCHASE")}
                  className={panelButton}
                >
                  Comprar em loja
                </Button>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                Na loja, a compra é feita no site do vendedor. A Momoslist só guarda o presente para você.
              </p>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="mt-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Desistir deste presente
              </button>
            </div>
          )}

          {myReservation &&
            myReservation.paymentMethod &&
            (myReservation.status === "CONFIRMED" || myReservation.status === "COMPLETED") && (
              <PaymentPanel
                reservationId={myReservation.id}
                paymentMethod={myReservation.paymentMethod}
                status={myReservation.status}
                pixStatus={myReservation.pixStatus}
                onCancel={handleCancel}
                isCancelPending={isPending}
              />
            )}
        </div>
      </CardContent>

      <IdentifyGuestDialog
        open={identifyOpen}
        onOpenChange={setIdentifyOpen}
        onIdentified={handleIdentified}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Desistir deste presente?"
        description={
          pixAlreadyDeclared ? (
            <>
              A unidade voltará a ficar disponível para outros convidados.{" "}
              <strong className="text-foreground">
                Atenção: isso não gera estorno automático do Pix já enviado
              </strong>{" "}
              — se você já pagou, fale diretamente com o anfitrião.
            </>
          ) : (
            "A unidade voltará a ficar disponível para outros convidados."
          )
        }
        confirmLabel="Sim, desistir"
        cancelLabel="Manter presente"
        isPending={isPending}
        onConfirm={confirmCancel}
      />
    </Card>
  );
}

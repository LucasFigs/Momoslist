"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, QrCode } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GiftImage } from "@/components/gift-image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { GiftAvailability } from "@/lib/gift-availability";
import {
  createReservationAction,
  confirmReservationMethodAction,
  cancelReservationAction,
} from "@/actions/reservation.actions";
import { IdentifyGuestDialog } from "./identify-guest-dialog";
import { ReservationDialog, type MyReservation, type PaymentMethod } from "./reservation-dialog";

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
  /** Item do tipo Pix: ainda sem loja, então só se presenteia por Pix (o método é escolhido sozinho). */
  pixOnly?: boolean;
  myReservation: MyReservation | null;
}

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

/**
 * O card tem SEMPRE a mesma forma: foto quadrada, nome, preço e um botão. O que muda com a reserva é só
 * o selo sobre a foto, o contorno e o texto do botão — o passo a passo (Pix/loja) abre no diálogo.
 * Assim a grade não "pula" ao reservar nem ao desistir.
 */
export function GiftCard({ gift, availability, isIdentified, pixOnly = false, myReservation }: GiftCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [identifyOpen, setIdentifyOpen] = useState(false);
  // Verdadeiro logo após reservar: o diálogo abre sozinho assim que a reserva chega do servidor.
  const [detailsOpen, setDetailsOpen] = useState(false);
  const countdown = useCountdown(myReservation?.status === "TEMPORARY" ? myReservation.expiresAt : undefined);

  const isSelectable = availability.status !== "UNAVAILABLE";
  const showSoldOut = !myReservation && !isSelectable;
  const isChoosingMethod = myReservation?.status === "TEMPORARY";
  const dimmed = showSoldOut || Boolean(myReservation);

  function doReserve() {
    startTransition(async () => {
      const result = await createReservationAction(gift.id);
      if (!result.success) {
        toast({ title: "Não foi possível reservar", description: result.error, variant: "destructive" });
        // Pode ter sido um conflito (outra pessoa pegou a última unidade): atualiza o card.
        router.refresh();
        return;
      }
      // Sem loja para escolher: já segue para o Pix, poupando um passo ao convidado.
      if (pixOnly && result.reservation.status === "TEMPORARY") {
        const chosen = await confirmReservationMethodAction(result.reservation.id, "PIX");
        if (!chosen.success) {
          toast({ title: "Não foi possível continuar", description: chosen.error, variant: "destructive" });
        }
      }
      setDetailsOpen(true);
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
      }
      router.refresh();
    });
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
      // Fecha o passo a passo: o card volta sozinho ao estado normal quando a reserva some do servidor.
      setDetailsOpen(false);
      toast({ title: "Reserva cancelada", description: "O presente voltou a ficar disponível." });
      router.refresh();
    });
  }

  const pixAlreadyDeclared =
    myReservation?.paymentMethod === "PIX" && myReservation.pixStatus === "DECLARED";
  const purchaseAlreadyConfirmed =
    myReservation?.paymentMethod === "EXTERNAL_PURCHASE" && myReservation.status === "COMPLETED";

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden",
        // Só o que está DISPONÍVEL tem fundo branco e cores cheias. Selecionado e indisponível ficam "apagados"
        // (fundo cinza-quente, foto esmaecida): ninguém confunde o que ainda dá para presentear.
        dimmed && "bg-muted/50",
        // Selecionado por mim: além de apagado, ganha o contorno na cor da lista.
        myReservation && "border-primary/60 ring-1 ring-primary/30"
      )}
    >
      {/* Quadrado em todas as telas (igual ao GiftCardSkeleton). "contain": a foto aparece inteira,
          sem recorte — o que sobra nas laterais fica em branco, como numa vitrine de produto. */}
      <div className={cn("relative aspect-square w-full border-b border-border", dimmed ? "bg-muted/60" : "bg-white")}>
        <GiftImage
          src={gift.imageUrl}
          alt={gift.name}
          fill
          fit="contain"
          sizes="(min-width: 1024px) 285px, (min-width: 768px) 33vw, 50vw"
          className={cn(showSoldOut && "opacity-40 grayscale", myReservation && "opacity-60 saturate-50")}
        />
        {showSoldOut && (
          <Badge variant="overlayDark" className="absolute left-2 top-2">
            Já escolhido
          </Badge>
        )}
        {/* Mesmo selo da vaquinha, para o convidado saber de antemão que este item é pago só por Pix. No canto
            esquerdo quando livre; no direito quando "Selecionado"/"Já escolhido" já ocupam o esquerdo. */}
        {pixOnly && (
          <Badge
            variant="overlay"
            className={cn("absolute top-2", myReservation || showSoldOut ? "right-2" : "left-2")}
          >
            <QrCode className="h-3 w-3 text-primary" aria-hidden="true" />
            Pix
          </Badge>
        )}
        {/* Um só destaque para qualquer etapa (falta pagar, falta comprar, concluído): "é seu". */}
        {myReservation && (
          <Badge variant="solid" className="absolute left-2 top-2">
            <Check className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            Selecionado
          </Badge>
        )}
      </div>

      <CardContent className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="min-w-0">
          <h3
            className={cn(
              "line-clamp-2 break-words text-[15px] font-medium leading-snug sm:text-base",
              dimmed ? "text-muted-foreground" : "text-foreground"
            )}
          >
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
          <span
            className={cn(
              "text-base font-semibold tabular-nums",
              dimmed ? "text-muted-foreground" : "text-foreground",
              showSoldOut && "line-through decoration-muted-foreground/60"
            )}
          >
            {gift.priceLabel}
          </span>

          {myReservation ? (
            <>
              {isChoosingMethod && (
                <p className="text-xs text-muted-foreground">
                  Reservado por <span className="font-semibold tabular-nums text-foreground">{countdown ?? "--:--"}</span>
                </p>
              )}
              <Button
                size="sm"
                // "Continuar" só destaca enquanto falta escolher como presentear (há prazo); depois é neutro.
                variant={isChoosingMethod ? "default" : "outline"}
                onClick={() => setDetailsOpen(true)}
                className="w-full"
              >
                {isChoosingMethod ? "Continuar" : "Ver detalhes"}
              </Button>
            </>
          ) : !isSelectable ? (
            <Button size="sm" variant="secondary" disabled className="w-full">
              Indisponível
            </Button>
          ) : (
            <Button size="sm" variant="soft" onClick={handleReserve} disabled={isPending} className="w-full">
              {isPending ? "Reservando..." : "Presentear"}
            </Button>
          )}
        </div>
      </CardContent>

      <IdentifyGuestDialog
        open={identifyOpen}
        onOpenChange={setIdentifyOpen}
        onIdentified={handleIdentified}
      />

      {myReservation && (
        <ReservationDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          giftName={gift.name}
          priceLabel={gift.priceLabel}
          imageUrl={gift.imageUrl}
          reservation={myReservation}
          countdown={countdown}
          isPending={isPending}
          pixOnly={pixOnly}
          onChooseMethod={handleChooseMethod}
          onCancel={() => setConfirmOpen(true)}
        />
      )}

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
              — se você já pagou, fale diretamente com o casal.
            </>
          ) : purchaseAlreadyConfirmed ? (
            <>
              A unidade voltará a ficar disponível para outros convidados.{" "}
              <strong className="text-foreground">Isso não cancela a compra na loja</strong> — se você já comprou de
              verdade, cancele o pedido por lá.
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

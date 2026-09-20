"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, SheetBody, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/dialog";
import { GiftImage } from "@/components/gift-image";
import { PaymentPanel } from "./payment-panel";

export type PaymentMethod = "EXTERNAL_PURCHASE" | "PIX";

export interface MyReservation {
  id: string;
  status: "TEMPORARY" | "CONFIRMED" | "COMPLETED";
  paymentMethod: PaymentMethod | null;
  pixStatus: string;
  expiresAt: string;
}

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  giftName: string;
  priceLabel: string;
  imageUrl: string | null;
  reservation: MyReservation;
  /** mm:ss restantes da reserva temporária (null enquanto o relógio não iniciou). */
  countdown: string | null;
  isPending: boolean;
  /** Item só-Pix: não há loja para escolher. */
  pixOnly?: boolean;
  onChooseMethod: (method: PaymentMethod) => void;
  /** Abre a confirmação de desistência (o diálogo de confirmação fica no card). */
  onCancel: () => void;
}

const cancelLink =
  "w-fit text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50";

/**
 * Passo a passo do presente selecionado (escolha do método → Pix ou loja).
 * É uma folha: no celular sobe da base com o botão principal fixo no rodapé; em tela larga é uma caixa
 * centralizada, com o Pix em duas colunas. Vive fora do card para o card da grade nunca mudar de forma.
 */
export function ReservationDialog({
  open,
  onOpenChange,
  giftName,
  priceLabel,
  imageUrl,
  reservation,
  countdown,
  isPending,
  pixOnly = false,
  onChooseMethod,
  onCancel,
}: ReservationDialogProps) {
  const choosingMethod = reservation.status === "TEMPORARY";
  // O Pix com QR pede duas colunas; os demais passos são curtos e ficam melhores estreitos.
  const wide = reservation.paymentMethod === "PIX" && reservation.pixStatus === "NOT_DECLARED";

  const summary = (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-2.5">
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white">
        <GiftImage src={imageUrl} alt="" fill fit="contain" sizes="56px" />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 break-words text-sm font-medium leading-snug text-foreground">{giftName}</p>
        <p className="text-sm font-semibold tabular-nums text-foreground">{priceLabel}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SheetContent size={wide ? "lg" : "md"} aria-describedby={undefined}>
        <SheetHeader>
          <DialogTitle>{choosingMethod ? "Como você quer presentear?" : "Seu presente"}</DialogTitle>
        </SheetHeader>

        {choosingMethod ? (
          <>
            <SheetBody className="flex flex-col gap-4">
              {summary}
              <p className="rounded-lg bg-primary-subtle p-3 text-sm leading-relaxed text-foreground ring-1 ring-primary-border">
                Guardamos este presente para você por{" "}
                <span className="font-semibold tabular-nums">{countdown ?? "--:--"}</span>. Escolha abaixo como prefere
                presentear.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pixOnly
                  ? "Este item ainda não tem loja definida: o presente é feito por Pix."
                  : "Na loja, a compra é feita no site do vendedor: a Momoslist só guarda o presente para você."}
              </p>
              <button type="button" onClick={onCancel} disabled={isPending} className={cancelLink}>
                Desistir deste presente
              </button>
            </SheetBody>
            <SheetFooter>
              <Button disabled={isPending} onClick={() => onChooseMethod("PIX")} className="w-full">
                Pagar via Pix
              </Button>
              {!pixOnly && (
                <Button
                  variant="outline"
                  disabled={isPending}
                  onClick={() => onChooseMethod("EXTERNAL_PURCHASE")}
                  className="w-full"
                >
                  Comprar em uma loja
                </Button>
              )}
            </SheetFooter>
          </>
        ) : (
          reservation.paymentMethod && (
            <PaymentPanel
              reservationId={reservation.id}
              paymentMethod={reservation.paymentMethod}
              status={reservation.status as "CONFIRMED" | "COMPLETED"}
              pixStatus={reservation.pixStatus}
              summary={summary}
              onCancel={onCancel}
              onClose={() => onOpenChange(false)}
              isCancelPending={isPending}
            />
          )
        )}
      </SheetContent>
    </Dialog>
  );
}

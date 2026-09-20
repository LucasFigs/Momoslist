"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SheetBody, SheetFooter } from "@/components/ui/dialog";
import {
  getPaymentDetailsAction,
  confirmExternalPurchaseAction,
  declarePixPaymentAction,
  type PaymentDetails,
} from "@/actions/payment.actions";
import { toast } from "@/hooks/use-toast";
import { Copy, Check, CheckCircle2, Clock, ExternalLink, ImageOff } from "lucide-react";

const pixKeyTypeLabel: Record<string, string> = {
  CPF: "CPF",
  CNPJ: "CNPJ",
  EMAIL: "E-mail",
  TELEFONE: "Telefone",
  ALEATORIA: "Chave aleatória",
};

interface PaymentPanelProps {
  reservationId: string;
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX";
  status: "CONFIRMED" | "COMPLETED";
  pixStatus: string;
  /** Resumo do presente (foto, nome, preço), mostrado no topo do corpo da folha. */
  summary: React.ReactNode;
  onCancel: () => void;
  onClose: () => void;
  isCancelPending: boolean;
}

const cancelLink =
  "w-fit text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50";

/**
 * Passo a passo depois de escolher como presentear. Devolve corpo + rodapé de uma folha (SheetContent):
 * o botão principal fica fixo no rodapé, sempre à vista, e só o corpo rola.
 */
export function PaymentPanel({
  reservationId,
  paymentMethod,
  status,
  pixStatus,
  summary,
  onCancel,
  onClose,
  isCancelPending,
}: PaymentPanelProps) {
  const router = useRouter();
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState<"key" | "code" | null>(null);
  const [qrFailed, setQrFailed] = useState(false);

  useEffect(() => {
    let active = true;
    getPaymentDetailsAction(reservationId).then((result) => {
      if (!active) return;
      if (result.success) setDetails(result.details);
      else setError(result.error);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [reservationId]);

  async function copy(text: string, which: "key" | "code") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Sem permissão ou contexto não seguro (http): o usuário ainda pode selecionar o texto na tela.
      toast({
        title: "Não foi possível copiar",
        description: "Toque no texto para selecioná-lo e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(which);
    toast({ title: which === "key" ? "Chave Pix copiada" : "Código Pix copiado" });
    setTimeout(() => setCopied(null), 2000);
  }

  function handleConfirmPurchase() {
    startTransition(async () => {
      const result = await confirmExternalPurchaseAction(reservationId);
      if (!result.success) {
        toast({ title: "Não foi possível confirmar a compra", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Compra confirmada", description: "Obrigado pelo presente!" });
      router.refresh();
    });
  }

  function handleDeclarePix() {
    startTransition(async () => {
      const result = await declarePixPaymentAction(reservationId);
      if (!result.success) {
        toast({ title: "Não foi possível informar o Pix", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Pix informado", description: "Aguardando a confirmação do anfitrião." });
      router.refresh();
    });
  }

  const closeFooter = (
    <SheetFooter>
      <Button variant="outline" onClick={onClose} className="w-full">
        Fechar
      </Button>
    </SheetFooter>
  );

  if (loading) {
    return (
      <>
        <SheetBody className="flex flex-col gap-4">
          {summary}
          <div className="h-3 w-40 animate-pulse rounded bg-muted" />
          <div className="h-3 w-56 animate-pulse rounded bg-muted" />
        </SheetBody>
      </>
    );
  }

  // Pix já confirmado pelo anfitrião: o dinheiro foi recebido, então não há "desistir" aqui.
  if (pixStatus === "CONFIRMED") {
    return (
      <>
        <SheetBody className="flex flex-col gap-4">
          {summary}
          <p className="flex items-start gap-2 rounded-lg bg-success-soft p-3 text-sm font-medium text-success">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Pix confirmado pelo anfitrião. Obrigado!
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Para qualquer ajuste depois da confirmação, fale diretamente com o anfitrião.
          </p>
        </SheetBody>
        {closeFooter}
      </>
    );
  }

  // Compra em loja confirmada: continua dando para desistir (ex.: clicou em "Já comprei" por engano).
  if (status === "COMPLETED" && paymentMethod === "EXTERNAL_PURCHASE") {
    return (
      <>
        <SheetBody className="flex flex-col gap-4">
          {summary}
          <p className="flex items-start gap-2 rounded-lg bg-success-soft p-3 text-sm font-medium text-success">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Compra confirmada. Obrigado!
          </p>
          <div className="rounded-lg bg-muted/60 p-3">
            <p className="text-sm font-medium text-foreground">Confirmou por engano?</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              Você pode desistir: o presente volta a ficar disponível para os outros convidados.
            </p>
            <button type="button" onClick={onCancel} disabled={isCancelPending} className={`mt-2 ${cancelLink}`}>
              Desistir deste presente
            </button>
          </div>
        </SheetBody>
        {closeFooter}
      </>
    );
  }

  if (details?.kind === "PIX" && pixStatus === "DECLARED") {
    return (
      <>
        <SheetBody className="flex flex-col gap-4">
          {summary}
          <p className="flex items-start gap-2 rounded-lg bg-pending-soft p-3 text-sm font-medium text-pending">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Pix informado — aguardando a confirmação do anfitrião.
          </p>
          <button type="button" onClick={onCancel} disabled={isCancelPending} className={cancelLink}>
            Desistir deste presente
          </button>
        </SheetBody>
        {closeFooter}
      </>
    );
  }

  if (details?.kind === "EXTERNAL_PURCHASE") {
    return (
      <>
        <SheetBody className="flex flex-col gap-4">
          {summary}
          <div className="rounded-lg bg-primary-subtle p-3 ring-1 ring-primary-border">
            <p className="text-sm font-medium text-foreground">Você vai comprar em uma loja</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              O site do vendedor abre em outra aba e a compra é feita lá. Depois de comprar, volte aqui e toque em
              &quot;Já comprei&quot;.
            </p>
          </div>
          {!details.purchaseUrl && (
            <p className="text-sm text-muted-foreground">O anfitrião não cadastrou um link de loja para este presente.</p>
          )}
          <button type="button" onClick={onCancel} disabled={isCancelPending} className={cancelLink}>
            Desistir deste presente
          </button>
        </SheetBody>
        <SheetFooter>
          {details.purchaseUrl && (
            <Button asChild className="w-full">
              <a href={details.purchaseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                Abrir site da loja
              </a>
            </Button>
          )}
          <Button
            variant={details.purchaseUrl ? "outline" : "default"}
            onClick={handleConfirmPurchase}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Confirmando..." : "Já comprei"}
          </Button>
        </SheetFooter>
      </>
    );
  }

  if (details?.kind === "PIX") {
    return (
      <>
        <SheetBody className="flex flex-col gap-5">
          {summary}

          {/* Celular: uma coluna, QR centralizado. Tela larga: QR à esquerda e dados à direita. */}
          <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6">
            <div className="mx-auto">
              {details.qrCodeDataUrl && !qrFailed ? (
                <div className="rounded-xl border border-border bg-white p-2.5">
                  <Image
                    src={details.qrCodeDataUrl}
                    alt="QR Code Pix"
                    width={184}
                    height={184}
                    unoptimized
                    onError={() => setQrFailed(true)}
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label="QR Code indisponível"
                  className="flex h-[205px] w-[205px] flex-col items-center justify-center gap-1 rounded-xl bg-neutral-200 p-3 text-center text-neutral-500"
                >
                  <ImageOff className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs">QR Code indisponível — use a chave ou o copia e cola.</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Valor a pagar</p>
                <p className="text-2xl font-semibold tabular-nums text-foreground">{details.amountLabel}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  {pixKeyTypeLabel[details.pixKeyType] ?? details.pixKeyType} de {details.hostName}
                </p>
                <p className="select-all break-all text-sm font-medium text-foreground">{details.pixKey}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => copy(details.pixKey, "key")}>
                  {copied === "key" ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
                  {copied === "key" ? "Copiada" : "Copiar chave"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => copy(details.copyPasteCode, "code")}>
                  {copied === "code" ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
                  {copied === "code" ? "Copiado" : "Copia e cola"}
                </Button>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Pague no app do seu banco e depois toque em <strong className="text-foreground">Já fiz o Pix</strong>{" "}
                para avisar o anfitrião.
              </p>
            </div>
          </div>

          <button type="button" onClick={onCancel} disabled={isCancelPending} className={cancelLink}>
            Desistir deste presente
          </button>
        </SheetBody>
        <SheetFooter>
          <Button onClick={handleDeclarePix} disabled={isPending} className="w-full">
            {isPending ? "Enviando..." : "Já fiz o Pix"}
          </Button>
        </SheetFooter>
      </>
    );
  }

  // Falha ao carregar os dados do pagamento.
  return (
    <>
      <SheetBody className="flex flex-col gap-4">
        {summary}
        <p role="alert" className="text-sm text-destructive">
          {error ?? "Não foi possível carregar os dados do pagamento."}
        </p>
        <button type="button" onClick={onCancel} disabled={isCancelPending} className={cancelLink}>
          Desistir deste presente
        </button>
      </SheetBody>
      {closeFooter}
    </>
  );
}

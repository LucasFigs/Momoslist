"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getPaymentDetailsAction,
  confirmExternalPurchaseAction,
  declarePixPaymentAction,
  type PaymentDetails,
} from "@/actions/payment.actions";
import { toast } from "@/hooks/use-toast";
import { Copy, Check, ExternalLink, ImageOff } from "lucide-react";

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
  onCancel: () => void;
  isCancelPending: boolean;
}

export function PaymentPanel({
  reservationId,
  paymentMethod,
  status,
  pixStatus,
  onCancel,
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
        description: "Selecione o texto e copie manualmente.",
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

  if (loading) {
    return (
      <div className="rounded-md border border-border bg-muted/30 p-3">
        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  // Estados finais
  if (status === "COMPLETED" && paymentMethod === "EXTERNAL_PURCHASE") {
    return (
      <div className="rounded-lg border border-primary-border bg-primary-subtle p-3">
        <p className="text-xs font-medium text-primary">Compra confirmada. Obrigado!</p>
      </div>
    );
  }

  if (pixStatus === "CONFIRMED") {
    return (
      <div className="rounded-lg border border-primary-border bg-primary-subtle p-3">
        <p className="text-xs font-medium text-primary">
          Pix confirmado pelo anfitrião. Obrigado!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-primary-border bg-primary-subtle p-3 [&_a]:h-auto [&_a]:min-h-10 [&_a]:whitespace-normal [&_a]:py-2 [&_a]:text-center [&_a]:leading-tight [&_button]:h-auto [&_button]:min-h-10 [&_button]:whitespace-normal [&_button]:py-2 [&_button]:text-center [&_button]:leading-tight [&_button.underline-link]:min-h-0">
      {/* Só erro de carregamento dos dados do pagamento; falhas de ação viram toast. */}
      {error && <p role="alert" className="mb-2 text-xs text-destructive">{error}</p>}

      {details?.kind === "EXTERNAL_PURCHASE" && (
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm font-medium text-foreground">Você vai comprar em uma loja</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              O site do vendedor abre em outra aba e a compra é feita lá. Depois de comprar, volte aqui e toque em
              &quot;Já comprei&quot;.
            </p>
          </div>
          {details.purchaseUrl ? (
            <Button size="sm" asChild>
              <a href={details.purchaseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Abrir site da loja
              </a>
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              O anfitrião não cadastrou um link de loja para este presente.
            </p>
          )}
          <Button size="sm" variant="outline" onClick={handleConfirmPurchase} disabled={isPending}>
            {isPending ? "Confirmando..." : "Já comprei"}
          </Button>
        </div>
      )}

      {details?.kind === "PIX" && (
        <div className="flex flex-col gap-2.5">
          {pixStatus === "DECLARED" ? (
            <p className="text-xs font-medium text-pending">
              Pix informado — aguardando a confirmação do anfitrião.
            </p>
          ) : (
            <>
              <div>
                <p className="text-xs text-muted-foreground">Valor a pagar</p>
                <p className="font-medium text-foreground">{details.amountLabel}</p>
              </div>

              {details.qrCodeDataUrl && !qrFailed && (
                <div className="mx-auto rounded-md bg-white p-2">
                  <Image
                    src={details.qrCodeDataUrl}
                    alt="QR Code Pix"
                    width={160}
                    height={160}
                    unoptimized
                    onError={() => setQrFailed(true)}
                  />
                </div>
              )}
              {qrFailed && (
                <div
                  role="img"
                  aria-label="QR Code indisponível"
                  className="mx-auto flex h-[176px] w-[176px] flex-col items-center justify-center gap-1 rounded-md bg-neutral-200 p-3 text-center text-neutral-500"
                >
                  <ImageOff className="h-5 w-5" aria-hidden="true" />
                  <span className="text-[11px]">QR Code indisponível — use a chave ou o copia e cola.</span>
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground">
                  {pixKeyTypeLabel[details.pixKeyType] ?? details.pixKeyType} de {details.hostName}
                </p>
                <p className="break-all text-xs font-medium text-foreground">{details.pixKey}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => copy(details.pixKey, "key")}>
                  {copied === "key" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                  {copied === "key" ? "Copiada" : "Copiar chave"}
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => copy(details.copyPasteCode, "code")}>
                  {copied === "code" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                  {copied === "code" ? "Copiado" : "Copia e cola"}
                </Button>
              </div>

              <Button size="sm" onClick={handleDeclarePix} disabled={isPending}>
                {isPending ? "Enviando..." : "Já fiz o Pix"}
              </Button>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onCancel}
        disabled={isCancelPending}
        className="underline-link mt-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        Desistir deste presente
      </button>
    </div>
  );
}

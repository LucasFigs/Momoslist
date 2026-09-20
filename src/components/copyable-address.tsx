"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

/**
 * Endereço de entrega como TEXTO puro e copiável: o convidado vai colar no app da loja em que estiver
 * comprando. Um toque seleciona tudo (`select-all`) e o botão copia sem precisar selecionar nada.
 */
export function CopyableAddress({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Toque no endereço para selecioná-lo e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(true);
    toast({ title: "Endereço copiado", description: "É só colar no app da loja." });
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3 rounded-lg border border-border bg-card p-4 text-left sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">Prefere enviar o presente?</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Endereço para entrega:</p>
        <p className="mt-1.5 select-all whitespace-pre-line break-words text-sm text-foreground">{text}</p>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={handleCopy} className="flex-shrink-0">
        {copied ? (
          <Check className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copied ? "Copiado" : "Copiar endereço"}
      </Button>
    </div>
  );
}

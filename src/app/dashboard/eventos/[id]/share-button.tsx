"use client";

import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

/** Botão de cabeçalho: celular abre o menu nativo de compartilhar (WhatsApp etc.); desktop copia o link. */
export function ShareButton({ url }: { url: string }) {
  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Minha lista de presentes", url });
      } catch {
        // Convidado cancelou o compartilhamento nativo — sem problema, sem toast de erro.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copiado!", description: "Agora é só colar e enviar." });
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Copie o link manualmente da barra de endereço.",
        variant: "destructive",
      });
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
      Compartilhar
    </Button>
  );
}

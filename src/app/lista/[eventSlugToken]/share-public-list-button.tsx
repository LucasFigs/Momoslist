"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SharePublicListButton({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Usuário cancelou o compartilhamento nativo — sem problema, sem toast de erro.
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
    // Botão redondo sobre a capa: só o ícone no celular (alvo de 44px), com texto a partir de sm.
    <Button
      variant="outline"
      onClick={handleShare}
      aria-label="Compartilhar lista"
      className={cn(
        "h-11 w-11 gap-1.5 rounded-full border-transparent bg-card/95 p-0 shadow-sm hover:bg-card sm:h-10 sm:w-auto sm:px-4",
        className
      )}
    >
      <Share2 className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Compartilhar</span>
    </Button>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Share2, ExternalLink } from "lucide-react";

export function ShareLinkButtons({ url, published }: { url: string; published: boolean }) {
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copiado!", description: "Agora é só colar e enviar." });
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Selecione o link e copie manualmente.",
        variant: "destructive",
      });
    }
  }

  // Celular: abre o menu nativo de compartilhar (WhatsApp etc.). Desktop, sem menu nativo: copia o link.
  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Minha lista de presentes", url });
      } catch {
        // usuário cancelou o compartilhamento — sem problema
      }
    } else {
      await copyToClipboard();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* select-all: um clique seleciona o link inteiro, para quem prefere copiar na mão. */}
      <code className="block max-w-full select-all overflow-x-auto whitespace-nowrap rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        {url}
      </code>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={handleShare}>
          <Share2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
          Compartilhar
        </Button>
        {/* Rascunho responde 404 para todo mundo; a pré-visualização cobre esse caso. */}
        {published && (
          <Button variant="ghost" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Abrir lista pública
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

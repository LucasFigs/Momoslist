"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy, Share2, Check, ExternalLink } from "lucide-react";

export function ShareLinkButtons({ url, published }: { url: string; published: boolean }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Selecione o link e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(true);
    toast({ title: "Link copiado!", description: "Agora é só colar e enviar." });
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Minha lista de presentes", url });
      } catch {
        // usuário cancelou o compartilhamento — sem problema
      }
    } else {
      await handleCopy();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <code className="block max-w-full select-all overflow-x-auto whitespace-nowrap rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        {url}
      </code>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar link"}
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={handleShare}>
          <Share2 className="mr-1.5 h-3.5 w-3.5" />
          Compartilhar
        </Button>
        {/* Pré-visualizar só faz sentido publicada: rascunho responde 404 para todo mundo. */}
        {published && (
          <Button variant="ghost" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Abrir lista pública
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

/** Atalho do cabeçalho: copiar o link é a ação mais comum depois de publicar. */
export function CopyLinkButton({ url }: { url: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copiado!", description: "Agora é só colar e enviar." });
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Abra a aba Resumo e selecione o link manualmente.",
        variant: "destructive",
      });
    }
  }

  return (
    <Button type="button" size="sm" variant="outline" onClick={handleCopy}>
      <Copy className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
      Copiar link
    </Button>
  );
}

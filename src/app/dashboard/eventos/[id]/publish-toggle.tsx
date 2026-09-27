"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { setEventPublishedAction } from "@/actions/event.actions";

/**
 * Só o botão: o estado completo (Publicada/Rascunho) também aparece como selo no cabeçalho da página; aqui
 * o texto já diz o estado atual ("Publicado"/"Não Publicado"), não a ação de clicar. A cor segue o mesmo
 * código do selo — verde suave quando está no ar, neutro quando não está — reforçando o mesmo significado
 * em vez de "ação principal vs. secundária", que estava confundindo.
 */
export function PublishToggle({ eventId, published }: { eventId: string; published: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await setEventPublishedAction(eventId, !published);
      if (!result.success) {
        toast({
          title: published ? "Não foi possível despublicar" : "Não foi possível publicar",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: published ? "Lista despublicada" : "Lista publicada",
        description: published
          ? "O link deixou de ficar acessível aos convidados."
          : "Seus convidados já podem acessar o link.",
      });
      router.refresh();
    });
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleToggle}
      disabled={isPending}
      role="switch"
      aria-checked={published}
      className={cn(
        "gap-2",
        published
          ? "border-success/30 bg-success-soft text-success hover:bg-success-soft/70"
          : "border-border bg-muted text-muted-foreground hover:bg-muted/70"
      )}
    >
      <span
        aria-hidden="true"
        className={`relative inline-flex h-4 w-7 flex-shrink-0 items-center rounded-full transition-colors ${
          published ? "bg-success" : "bg-muted-foreground/40"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform ${
            published ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </span>
      {isPending ? "Salvando..." : published ? "Publicado" : "Não Publicado"}
    </Button>
  );
}

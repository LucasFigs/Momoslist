"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { setEventPublishedAction } from "@/actions/event.actions";

/**
 * Só o botão: o estado (Publicada/Rascunho) aparece como selo no cabeçalho da página.
 * Rascunho → ação principal (cor da marca). Publicada → ação secundária, para não convidar a despublicar sem querer.
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
    <Button size="sm" variant={published ? "outline" : "default"} onClick={handleToggle} disabled={isPending}>
      {isPending ? "Salvando..." : published ? "Despublicar" : "Publicar lista"}
    </Button>
  );
}

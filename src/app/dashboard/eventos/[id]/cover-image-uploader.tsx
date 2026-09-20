"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { GiftImage } from "@/components/gift-image";
import { updateEventCoverImageAction } from "@/actions/event.actions";
import { shrinkImage } from "@/lib/shrink-image";
import { Upload } from "lucide-react";

export function CoverImageUploader({
  eventId,
  currentUrl,
}: {
  eventId: string;
  currentUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.set("cover", await shrinkImage(file));
      const result = await updateEventCoverImageAction(eventId, formData);
      if (!result.success) {
        toast({ title: "Não foi possível enviar a capa", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Capa atualizada" });
      router.refresh();
    });

    // Permite selecionar o mesmo arquivo de novo depois, se precisar.
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <GiftImage src={currentUrl} alt="Capa da lista" width={128} height={80} />
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          {isPending ? "Enviando..." : currentUrl ? "Trocar capa" : "Adicionar capa"}
        </Button>
      </div>
    </div>
  );
}

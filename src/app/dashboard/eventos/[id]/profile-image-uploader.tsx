"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { GiftImage } from "@/components/gift-image";
import { updateEventProfileImageAction } from "@/actions/event.actions";
import { Upload } from "lucide-react";

export function ProfileImageUploader({
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

    const formData = new FormData();
    formData.set("profile", file);

    startTransition(async () => {
      const result = await updateEventProfileImageAction(eventId, formData);
      if (!result.success) {
        toast({ title: "Não foi possível enviar a foto", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Foto de perfil atualizada" });
      router.refresh();
    });

    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-border">
        <GiftImage src={currentUrl} alt="Foto de perfil" width={64} height={64} />
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
          {isPending ? "Enviando..." : currentUrl ? "Trocar foto" : "Adicionar foto"}
        </Button>
      </div>
    </div>
  );
}

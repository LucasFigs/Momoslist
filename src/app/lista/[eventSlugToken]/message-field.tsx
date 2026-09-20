"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircleHeart } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MAX_MESSAGE_LENGTH } from "@/schemas/message.schema";

interface MessageFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Recadinho opcional para os anfitriões. Começa recolhido (um convite discreto) para não competir com o
 * QR Code e com o botão principal; ao abrir vira um campo de texto com contador. Se já há texto, abre sozinho.
 */
export function MessageField({ value, onChange, disabled }: MessageFieldProps) {
  const id = useId();
  const [open, setOpen] = useState(value.length > 0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Só foca quando a pessoa abriu o campo por conta própria: foca também rola até ele, que fica no fim da folha,
  // por trás do botão fixo do rodapé. Se já abriu com texto (edição), não rouba o foco.
  const openedByUser = useRef(false);

  useEffect(() => {
    const field = textareaRef.current;
    if (!open || !openedByUser.current || !field) return;
    // Centraliza o campo na área visível: só focar rola o mínimo e o botão fixo do rodapé ainda o cobriria.
    field.focus({ preventScroll: true });
    field.scrollIntoView({ block: "center" });
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          openedByUser.current = true;
          setOpen(true);
        }}
        disabled={disabled}
        className="flex min-h-11 w-full items-center gap-2.5 rounded-lg border border-dashed border-primary-border bg-primary-subtle px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
      >
        <MessageCircleHeart className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
        <span className="font-medium text-foreground">
          Deixar um recadinho para os anfitriões{" "}
          <span className="font-normal text-muted-foreground">(opcional)</span>
        </span>
      </button>
    );
  }

  const nearLimit = value.length >= MAX_MESSAGE_LENGTH - 50;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="flex min-w-0 items-center gap-1.5">
          <MessageCircleHeart className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">Recadinho para os anfitriões</span>
        </Label>
        <button
          type="button"
          onClick={() => {
            onChange("");
            setOpen(false);
          }}
          disabled={disabled}
          className="min-h-9 flex-shrink-0 px-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50"
        >
          Não deixar
        </button>
      </div>
      <Textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
        maxLength={MAX_MESSAGE_LENGTH}
        rows={3}
        disabled={disabled}
        placeholder="Ex.: Muita felicidade na casa nova!"
        aria-describedby={`${id}-hint`}
        className="min-h-[88px] resize-y"
      />
      <p id={`${id}-hint`} className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>Só os anfitriões leem. Não aparece na lista pública.</span>
        <span className={cn("tabular-nums", nearLimit && "font-medium text-foreground")}>
          {value.length}/{MAX_MESSAGE_LENGTH}
        </span>
      </p>
    </div>
  );
}

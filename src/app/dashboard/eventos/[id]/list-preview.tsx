"use client";

import { useState } from "react";
import { Eye, Monitor, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Device = "mobile" | "desktop";

const DEVICES: { value: Device; label: string; icon: typeof Smartphone }[] = [
  { value: "mobile", label: "Celular", icon: Smartphone },
  { value: "desktop", label: "Computador", icon: Monitor },
];

interface ListPreviewDialogProps {
  eventId: string;
  /** Cor (#RRGGBB) a mostrar, mesmo que ainda não salva. Sem ela, usa a cor salva da lista. */
  color?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Mostra a lista exatamente como o convidado vê, dentro de um quadro de celular ou de computador.
 * É a página de verdade (rota /previa) — não uma imitação — então layout, cores e textos nunca divergem.
 */
export function ListPreviewDialog({ eventId, color, open, onOpenChange }: ListPreviewDialogProps) {
  const [device, setDevice] = useState<Device>("mobile");
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const src = `/previa/${eventId}${color ? `?cor=${color.replace("#", "")}` : ""}`;
  const loaded = loadedSrc === src;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[92vh] w-[calc(100%-1rem)] max-w-6xl flex-col gap-0 overflow-hidden p-0 sm:p-0"
        aria-describedby={undefined}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 pr-12">
          <div>
            <DialogTitle className="text-base">Como os convidados veem</DialogTitle>
            <p className="text-xs text-muted-foreground">
              {color ? "Com a cor selecionada. " : "Com o que está salvo. "}Os botões ficam desativados aqui.
            </p>
          </div>

          <div role="radiogroup" aria-label="Tamanho da tela" className="inline-flex rounded-lg bg-muted p-1">
            {DEVICES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={device === value}
                onClick={() => setDevice(value)}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  device === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-muted/60 p-3 sm:p-5">
          <div
            className={cn(
              "mx-auto h-full max-w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-[width] duration-200",
              device === "mobile" ? "w-[390px]" : "w-full"
            )}
          >
            <iframe
              key={src}
              src={src}
              title="Pré-visualização da lista pública"
              onLoad={() => setLoadedSrc(src)}
              className="h-full w-full"
            />
          </div>
          {!loaded && (
            <p className="pointer-events-none absolute inset-x-0 top-1/2 text-center text-sm text-muted-foreground">
              Carregando pré-visualização…
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ListPreviewButtonProps {
  eventId: string;
  color?: string;
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "soft";
  className?: string;
}

/** Botão + diálogo. Use onde o anfitrião precisa "ver como fica" sem sair da tela. */
export function ListPreviewButton({
  eventId,
  color,
  label = "Visualizar como convidado",
  variant = "outline",
  className,
}: ListPreviewButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" size="sm" variant={variant} onClick={() => setOpen(true)} className={className}>
        <Eye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </Button>
      <ListPreviewDialog eventId={eventId} color={color} open={open} onOpenChange={setOpen} />
    </>
  );
}

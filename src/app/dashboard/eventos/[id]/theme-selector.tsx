"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { deriveTheme, themeToCssVars, THEME_PRESETS } from "@/lib/theme";
import { updateEventThemeAction } from "@/actions/event.actions";

/**
 * Cor de acento da lista pública. A base (fundo, textos, bordas) é sempre neutra; a cor escolhida aparece
 * em botões, links, seleção e progresso. Qualquer cor é aceita: se for clara demais para ter texto legível,
 * a lista aplica uma versão levemente mais escura (o preview abaixo mostra exatamente o que o convidado verá).
 */
export function ThemeSelector({ eventId, currentColor }: { eventId: string; currentColor: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [color, setColor] = useState(currentColor.toUpperCase());

  const tokens = deriveTheme(color);
  const activePreset = THEME_PRESETS.find((preset) => preset.hex.toUpperCase() === color);
  const dirty = color !== currentColor.toUpperCase();

  function handleSave() {
    startTransition(async () => {
      const result = await updateEventThemeAction(eventId, color);
      if (!result.success) {
        toast({ title: "Não foi possível salvar a cor", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Cor da lista atualizada", description: "A página pública já usa a nova cor." });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p id="theme-label" className="mb-2 text-sm font-medium text-foreground">
          Cor de destaque
        </p>
        <div role="radiogroup" aria-labelledby="theme-label" className="flex flex-wrap gap-x-3 gap-y-4">
          {THEME_PRESETS.map((preset) => {
            const selected = preset.hex.toUpperCase() === color;
            return (
              <button
                key={preset.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setColor(preset.hex.toUpperCase())}
                className="group flex w-16 flex-col items-center gap-1.5 rounded-md focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full ring-offset-2 ring-offset-card transition-shadow group-focus-visible:ring-2 group-focus-visible:ring-primary",
                    selected ? "ring-2 ring-foreground" : "group-hover:ring-2 group-hover:ring-border"
                  )}
                  style={{ backgroundColor: preset.hex }}
                >
                  {selected && <Check className="h-4 w-4 text-white" aria-hidden="true" />}
                </span>
                <span
                  className={cn(
                    "text-center text-xs leading-tight",
                    selected ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {preset.label}
                </span>
              </button>
            );
          })}

          <label className="group flex w-16 cursor-pointer flex-col items-center gap-1.5">
            <span
              className={cn(
                "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-offset-2 ring-offset-card transition-shadow group-focus-within:ring-2 group-focus-within:ring-primary",
                !activePreset ? "ring-2 ring-foreground" : "group-hover:ring-2 group-hover:ring-border"
              )}
              style={{
                background: !activePreset
                  ? color
                  : "conic-gradient(from 0deg, #c2410c, #ca8a04, #4d7c0f, #0e7490, #4338ca, #a21caf, #be123c, #c2410c)",
              }}
            >
              {!activePreset && <Check className="h-4 w-4 text-white" aria-hidden="true" />}
              <input
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value.toUpperCase())}
                aria-label="Escolher outra cor"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </span>
            <span
              className={cn(
                "text-center text-xs leading-tight",
                !activePreset ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {!activePreset ? color : "Outra cor"}
            </span>
          </label>
        </div>
      </div>

      {/* Pré-visualização: as mesmas variáveis que a página pública recebe, aplicadas só nesta caixa. */}
      <div
        style={themeToCssVars(tokens) as React.CSSProperties}
        className="rounded-lg border border-border bg-background p-4"
        aria-label="Pré-visualização da cor"
      >
        <p className="mb-3 text-xs font-medium text-muted-foreground">Como fica para os convidados</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" tabIndex={-1} type="button">
            Contribuir
          </Button>
          <Button size="sm" variant="soft" tabIndex={-1} type="button">
            Presentear
          </Button>
          <Badge variant="primary">Vaquinha</Badge>
          <span className="text-sm font-medium text-primary underline underline-offset-4">Ver presentes</span>
        </div>
        <div className="mt-4 max-w-xs">
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-semibold text-foreground">R$ 1.800,00</span>
            <span className="rounded-full bg-primary-soft px-2 py-0.5 font-semibold text-primary">36%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div className="h-full w-[36%] rounded-full bg-primary" />
          </div>
        </div>
      </div>

      {tokens.adjustedBy > 0 && (
        <p className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          Essa cor é clara demais para ter texto legível em cima. Vamos usar uma versão um pouco mais escura, no
          mesmo tom — é a que aparece no exemplo acima.
        </p>
      )}

      <div>
        <Button onClick={handleSave} disabled={!dirty || isPending} className="w-full sm:w-auto">
          {isPending ? "Salvando..." : "Salvar cor"}
        </Button>
      </div>
    </div>
  );
}

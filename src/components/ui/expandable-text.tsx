"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  children: React.ReactNode;
  /** Só oferece "Ler tudo" quando o texto é longo o bastante para valer o corte. */
  isLong: boolean;
  className?: string;
  /** Altura máxima recolhida (classe Tailwind completa). */
  collapsedClassName?: string;
  /** Cor de origem do degradê que "apaga" o fim do texto: deve ser a cor do fundo onde o texto está. */
  fadeClassName?: string;
}

/**
 * Recolhe textos longos (instruções do anfitrião) para não empurrar a lista de
 * presentes para fora da primeira tela, com opção de expandir.
 */
export function ExpandableText({
  children,
  isLong,
  className,
  collapsedClassName = "max-h-40 sm:max-h-44",
  fadeClassName = "from-card",
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const collapsed = isLong && !expanded;

  return (
    <div className={className}>
      <div
        id={contentId}
        className={cn("relative whitespace-pre-line", collapsed && cn("overflow-hidden", collapsedClassName))}
      >
        {children}
        {collapsed && (
          <div
            className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent", fadeClassName)}
            aria-hidden="true"
          />
        )}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          aria-controls={contentId}
          className="mt-2 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {expanded ? "Mostrar menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
}

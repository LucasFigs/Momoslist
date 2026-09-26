"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface MetricDetailItem {
  id: string;
  title: string;
  subtitle?: string;
  value?: string;
  badge?: { label: string; tone: "success" | "pending" | "neutral" };
}

export interface SummaryMetric {
  id: string;
  label: string;
  value: string;
  /** O que compõe esse número — clicar no valor abre esta lista. Vazio ainda é clicável (explica o zero). */
  details: MetricDetailItem[];
  emptyMessage: string;
}

export interface SummaryMetricGroup {
  /** Cabeçalho curto do grupo (ex.: "Presentes", "Vaquinhas", "Pix"): é o que separa "disponíveis" (produtos)
   *  de "vaquinhas", que antes ficavam misturados na mesma fileira de números. */
  title: string;
  metrics: SummaryMetric[];
}

/**
 * Métricas do Resumo, uma linha de cards em vez de seções empilhadas (ocupava várias fileiras de tela).
 * Um grupo com um só número vira um card simples; um grupo com vários números relacionados (ex.: Presentes:
 * reservados/disponíveis/cadastrados) vira um único card com os números empilhados dentro — em vez de um
 * card por número —, já que espalhar números do mesmo assunto em cards separados é mais difícil de ler.
 * Cada número é clicável: mostra os itens que o compõem (ex.: quais Pix somam o total confirmado), sem
 * sair da tela.
 */
export function SummaryMetrics({ groups }: { groups: SummaryMetricGroup[] }) {
  const [openMetric, setOpenMetric] = useState<SummaryMetric | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {groups.map((group) =>
          group.metrics.length > 1 ? (
            <div key={group.title} className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-4">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{group.title}</span>
              <div className="flex flex-col divide-y divide-border">
                {group.metrics.map((metric) => (
                  <button
                    key={metric.id}
                    type="button"
                    onClick={() => setOpenMetric(metric)}
                    className="flex min-w-0 items-center justify-between gap-3 py-1.5 text-left first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <span className="break-words text-right text-base font-semibold tabular-nums text-foreground underline decoration-muted-foreground/30 decoration-dotted underline-offset-4">
                      {metric.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            group.metrics.map((metric) => (
              <button
                key={metric.id}
                type="button"
                onClick={() => setOpenMetric(metric)}
                className="flex min-w-0 flex-col items-start gap-1 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{group.title}</span>
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="mt-0.5 w-full break-words text-2xl font-semibold tabular-nums text-foreground underline decoration-muted-foreground/30 decoration-dotted underline-offset-4">
                  {metric.value}
                </span>
              </button>
            ))
          )
        )}
      </div>

      <Dialog open={openMetric !== null} onOpenChange={(open) => !open && setOpenMetric(null)}>
        <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden">
          {openMetric && (
            <>
              <DialogHeader>
                <DialogTitle>{openMetric.label}</DialogTitle>
              </DialogHeader>
              <div className="min-h-0 overflow-y-auto">
                {openMetric.details.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">{openMetric.emptyMessage}</p>
                ) : (
                  <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
                    {openMetric.details.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 p-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                          {item.subtitle && <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>}
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-2">
                          {item.badge && <Badge variant={item.badge.tone}>{item.badge.label}</Badge>}
                          {item.value && (
                            <span className="text-sm font-medium tabular-nums text-foreground">{item.value}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

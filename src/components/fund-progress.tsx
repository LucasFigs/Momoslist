import { cn, formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import { CheckCircle2 } from "lucide-react";

interface FundProgressProps extends FundTotals {
  /** "sm": card da lista. "lg": diálogo do convidado e painel do anfitrião (com marcos e legenda). */
  size?: "sm" | "lg";
  /** Só o anfitrião vê a legenda dos dois tons; o convidado a vê quando há algo aguardando. */
  className?: string;
}

// Trecho "aguardando confirmação": listrado, para nunca ser confundido com dinheiro já confirmado.
const PENDING_STRIPES =
  "repeating-linear-gradient(45deg, hsl(var(--primary) / 0.55) 0 6px, hsl(var(--primary) / 0.28) 6px 12px)";

export function FundProgress({ size = "sm", className, ...totals }: FundProgressProps) {
  const progress = computeFundProgress(totals);
  const isLarge = size === "lg";
  const {
    raisedInCents,
    goalInCents,
    percent,
    reached,
    overflowInCents,
    remainingInCents,
    confirmedBarPercent,
    pendingBarPercent,
    contributionsCount,
    pendingInCents,
    confirmedInCents,
  } = progress;

  const raisedLabel = formatCentsToBRL(raisedInCents);
  const goalLabel = formatCentsToBRL(goalInCents);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {isLarge ? (
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-serif text-3xl font-medium tabular-nums leading-none text-foreground">
              {raisedLabel}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              arrecadados de <span className="font-medium text-foreground/80">{goalLabel}</span>
            </p>
          </div>
          <PercentBadge percent={percent} reached={reached} className="text-sm" />
        </div>
      ) : (
        // Compacto (card em 2 colunas no celular): o valor ocupa a linha toda, sem truncar;
        // "de R$ meta" e o percentual dividem a linha de baixo.
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold tabular-nums leading-none text-foreground">{raisedLabel}</p>
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[11px] text-muted-foreground sm:text-xs">
              de <span className="font-medium text-foreground/80">{goalLabel}</span>
            </p>
            <PercentBadge percent={percent} reached={reached} className="text-xs" />
          </div>
        </div>
      )}

      <div
        role="progressbar"
        aria-label="Progresso da vaquinha"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(percent, 100)}
        aria-valuetext={`${raisedLabel} de ${goalLabel}, ${percent}% da meta`}
        className={cn("relative overflow-hidden rounded-full bg-muted", isLarge ? "h-4" : "h-2.5")}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${confirmedBarPercent}%` }}
        />
        {pendingBarPercent > 0 && (
          <div
            className="absolute inset-y-0 transition-[width,left] duration-700 ease-out"
            style={{
              left: `${confirmedBarPercent}%`,
              width: `${pendingBarPercent}%`,
              backgroundImage: PENDING_STRIPES,
            }}
          />
        )}
        {/* Marcos de 25/50/75%: dão noção de "quanto falta" sem precisar ler números. */}
        {isLarge &&
          [25, 50, 75].map((mark) => (
            <span
              key={mark}
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-background/70"
              style={{ left: `${mark}%` }}
            />
          ))}
      </div>

      {reached ? (
        <p className={cn("flex flex-wrap items-center gap-x-1.5 font-medium text-primary", isLarge ? "text-sm" : "text-xs")}>
          <CheckCircle2 className={isLarge ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
          Meta atingida
          {overflowInCents > 0 && (
            <span className="font-normal text-muted-foreground">
              {" "}
              · {formatCentsToBRL(overflowInCents)} além do objetivo
            </span>
          )}
        </p>
      ) : isLarge ? (
        <p className="text-sm text-muted-foreground">
          Faltam <span className="font-medium text-foreground/80">{formatCentsToBRL(remainingInCents)}</span>
        </p>
      ) : null}

      {isLarge && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            {contributionsCount === 1 ? "1 contribuição" : `${contributionsCount} contribuições`}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
            Confirmado {formatCentsToBRL(confirmedInCents)}
          </span>
          {pendingInCents > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundImage: PENDING_STRIPES }}
                aria-hidden="true"
              />
              Aguardando confirmação {formatCentsToBRL(pendingInCents)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function PercentBadge({ percent, reached, className }: { percent: number; reached: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "flex-shrink-0 rounded-full px-2 py-0.5 font-semibold tabular-nums",
        reached ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary",
        className
      )}
    >
      {percent}%
    </span>
  );
}

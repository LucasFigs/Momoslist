/**
 * Cálculo do progresso de uma vaquinha. A meta NÃO é um teto: dá para arrecadar
 * mais do que ela — a barra enche até 100% e o excedente vira um selo à parte.
 */

export interface FundTotals {
  goalInCents: number;
  /** Já confirmado pelo casal (Pix recebido). */
  confirmedInCents: number;
  /** Declarado pelo convidado, ainda sem confirmação do casal. */
  pendingInCents: number;
  /** Quantas contribuições ativas (declaradas + confirmadas). */
  contributionsCount: number;
}

export interface FundProgress extends FundTotals {
  raisedInCents: number;
  /** % arrecadado (declarado + confirmado) sobre a meta, sem teto — pode passar de 100. */
  percent: number;
  /** Larguras da barra, em % de 0 a 100: confirmado e, em seguida, aguardando. */
  confirmedBarPercent: number;
  pendingBarPercent: number;
  reached: boolean;
  /** Quanto passou da meta (0 se ainda não passou). */
  overflowInCents: number;
  /** Quanto falta para a meta (0 se já atingiu). */
  remainingInCents: number;
}

export function computeFundProgress(totals: FundTotals): FundProgress {
  const { goalInCents, confirmedInCents, pendingInCents } = totals;
  const raisedInCents = confirmedInCents + pendingInCents;
  const safeGoal = Math.max(goalInCents, 1);

  const percent = Math.round((raisedInCents / safeGoal) * 100);
  const confirmedBarPercent = Math.min((confirmedInCents / safeGoal) * 100, 100);
  // O trecho "aguardando" só ocupa o que sobra até 100%.
  const pendingBarPercent = Math.min((pendingInCents / safeGoal) * 100, 100 - confirmedBarPercent);

  return {
    ...totals,
    raisedInCents,
    percent,
    confirmedBarPercent,
    pendingBarPercent,
    reached: raisedInCents >= goalInCents,
    overflowInCents: Math.max(raisedInCents - goalInCents, 0),
    remainingInCents: Math.max(goalInCents - raisedInCents, 0),
  };
}

/** Sugestões de valor para o convidado tocar em vez de digitar: mínimo, múltiplos e "completar a meta". */
export function suggestContributionAmounts(minInCents: number, remainingInCents: number): number[] {
  const suggestions = new Set<number>([minInCents, minInCents * 2, minInCents * 5, minInCents * 10]);
  // Só oferece "completar a meta" quando é um valor que faz sentido (acima do mínimo).
  if (remainingInCents > minInCents) suggestions.add(remainingInCents);

  return Array.from(suggestions)
    .filter((value) => value >= minInCents && value <= 10_000_000)
    .sort((a, b) => a - b)
    .slice(0, 5);
}

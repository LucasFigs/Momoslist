import { z } from "zod";

/**
 * `FormData.get()` devolve `null` quando o campo não existe no formulário (ex.: "minContribution" num presente
 * comum). O Zod não aceita `null` em campo opcional — daí o "Invalid input" —, então ausente vira texto vazio.
 */
const emptyIfMissing = (value: unknown) => (value === null || value === undefined ? "" : value);

const optionalText = (max: number) => z.preprocess(emptyIfMissing, z.string().trim().max(max));

const urlOrEmpty = z.preprocess(
  emptyIfMissing,
  z
    .string()
    .trim()
    .refine((value) => !value || /^https?:\/\/.+/i.test(value), "A URL deve começar com http:// ou https://")
);

/** Valor digitado em reais (ex: "450,00" ou "450.00") que precisa resultar em centavos > 0. */
const moneyString = (emptyMessage: string) =>
  z.preprocess(
    emptyIfMissing,
    z
      .string()
      .trim()
      .min(1, emptyMessage)
      .refine((value) => {
        const parsed = parsePriceToCents(value);
        return Number.isFinite(parsed) && parsed > 0;
      }, "Informe um valor válido maior que zero")
  );

// Teto de uma contribuição/meta: evita valores absurdos e estouro no campo de valor do Pix.
export const MAX_AMOUNT_IN_CENTS = 10_000_000; // R$ 100.000,00

export const giftSchema = z
  .object({
    kind: z.enum(["PRODUCT", "FUND"]).default("PRODUCT"),
    name: z.preprocess(emptyIfMissing, z.string().trim().min(2, "Dê um nome ao presente").max(120)),
    description: optionalText(500),
    purchaseUrl: urlOrEmpty,
    // Produto: valor do presente. Vaquinha: META total a arrecadar.
    price: moneyString("Informe o valor"),
    // Só vaquinha: menor contribuição aceita.
    minContribution: optionalText(30),
    quantity: z.coerce.number().int().min(1, "A quantidade mínima é 1").max(999),
  })
  .superRefine((data, ctx) => {
    const priceInCents = parsePriceToCents(data.price);

    if (priceInCents > MAX_AMOUNT_IN_CENTS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["price"],
        message: "O valor máximo é R$ 100.000,00.",
      });
    }

    if (data.kind !== "FUND") return;

    const minRaw = data.minContribution.trim();
    const minInCents = minRaw ? parsePriceToCents(minRaw) : NaN;

    if (!minRaw || !Number.isFinite(minInCents) || minInCents <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minContribution"],
        message: "Informe o valor mínimo de cada contribuição.",
      });
      return;
    }

    // Um mínimo maior que a meta impediria a vaquinha de se completar com uma contribuição só.
    if (minInCents > priceInCents) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minContribution"],
        message: "O valor mínimo não pode ser maior que a meta.",
      });
    }
  });

export type GiftInput = z.infer<typeof giftSchema>;

/**
 * Converte um valor digitado em reais para centavos, evitando float.
 * Aceita tanto "450,00" (padrão BR) quanto "450.00" (padrão US).
 * Se houver vírgula, ela é tratada como separador decimal e pontos como milhar.
 */
export function parsePriceToCents(rawPrice: string): number {
  let normalized = rawPrice.trim();
  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  }
  const asFloat = Number(normalized);
  return Math.round(asFloat * 100);
}

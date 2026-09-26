// "Sugeridos" (padrão) já deixa esgotados/vaquinhas com meta atingida por último — ver gifts-section.tsx.
// Por isso não existe uma opção "Disponíveis" separada: seria idêntica ao padrão.
export const SORT_OPTIONS = [
  { value: "", label: "Sugeridos" },
  { value: "price_asc", label: "Menor preço" },
  { value: "price_desc", label: "Maior preço" },
] as const;

export type GiftSort = (typeof SORT_OPTIONS)[number]["value"];

const MAX_QUERY_LENGTH = 80;

type RawParam = string | string[] | undefined;

function firstValue(value: RawParam): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

/** searchParams vem da URL: pode ser array (?q=a&q=b) ou lixo — nunca confie no tipo. */
export function parseGiftQuery(value: RawParam): string {
  return firstValue(value).trim().slice(0, MAX_QUERY_LENGTH);
}

export function parseGiftSort(value: RawParam): GiftSort {
  const sort = firstValue(value);
  return SORT_OPTIONS.some((option) => option.value === sort) ? (sort as GiftSort) : "";
}

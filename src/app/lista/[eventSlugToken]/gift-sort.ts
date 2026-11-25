import type { Gift } from "@prisma/client";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import type { GiftAvailability } from "@/lib/gift-availability";
import { isGiftExposed } from "@/lib/gift-visibility";
import { safeStoreUrl } from "@/lib/store-url";

// Disponibilidade tem precedência em todas as opções, não somente em Sugeridos.
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

type PublicGift = { gift: Gift; availability: GiftAvailability };

/** Ordena uma cópia; preço nunca coloca um item esgotado à frente dos disponíveis. */
export function sortPublicGifts<T extends PublicGift>(
  items: readonly T[],
  sort: GiftSort,
  fundTotals: ReadonlyMap<string, FundTotals>,
): T[] {
  const ranked = items.filter(({ gift }) => isGiftExposed(gift)).map((item) => {
    const { gift, availability } = item;
    const totals = gift.kind === "FUND" ? fundTotals.get(gift.id) : undefined;
    const unavailable = gift.kind === "FUND"
      ? computeFundProgress(totals ?? { goalInCents: gift.priceInCents, confirmedInCents: 0, pendingInCents: 0, contributionsCount: 0 }).reached
      : availability.status === "UNAVAILABLE";
    const priority = unavailable ? 5 : gift.kind === "FUND"
      ? (totals?.contributionsCount ?? 0) > 0 ? 3 : 4
      : gift.kind === "PRODUCT" && safeStoreUrl(gift.purchaseUrl) ? 1 : 2;
    // Mesmo mínimo usado pelo FundCard, inclusive para registros antigos sem mínimo.
    const price = gift.kind === "FUND" ? gift.minContributionInCents ?? 1 : gift.priceInCents;
    return { item, unavailable, priority, price };
  });
  ranked.sort((a, b) => {
    const availabilityOrder = Number(a.unavailable) - Number(b.unavailable);
    if (availabilityOrder) return availabilityOrder;
    if (!a.unavailable && !sort && a.priority !== b.priority) return a.priority - b.priority;
    // O grupo concluído mantém valor crescente em qualquer critério selecionado.
    const priceOrder = !a.unavailable && sort === "price_desc" ? b.price - a.price : a.price - b.price;
    if (priceOrder) return priceOrder;
    const createdOrder = a.item.gift.createdAt.getTime() - b.item.gift.createdAt.getTime();
    if (createdOrder) return createdOrder;
    return a.item.gift.id < b.item.gift.id ? -1 : a.item.gift.id > b.item.gift.id ? 1 : 0;
  });
  return ranked.map(({ item }) => item);
}

import type { Prisma } from "@prisma/client";

/** Vaquinhas mantêm as regras próprias; apenas PRODUCT/PIX usam zero como retirada. */
export const exposedGiftWhere = {
  OR: [{ kind: "FUND" }, { quantity: { gt: 0 } }],
} satisfies Prisma.GiftWhereInput;

export function isGiftExposed(gift: { kind: string; quantity: number }) {
  return gift.kind === "FUND" || gift.quantity > 0;
}

import { describe, expect, it } from "vitest";
import type { Gift } from "@prisma/client";
import { sortPublicGifts, type GiftSort } from "@/app/lista/[eventSlugToken]/gift-sort";
import { computeGiftAvailability } from "@/lib/gift-availability";
import type { FundTotals } from "@/lib/fund";

function item(id: string, price: number, data: Partial<Gift> = {}, reserved = 0) {
  const gift = { id, name: id, kind: "PRODUCT", quantity: 1, priceInCents: price, minContributionInCents: null, purchaseUrl: null, createdAt: new Date("2026-11-01T12:00:00Z"), ...data } as Gift;
  return { gift, availability: computeGiftAvailability(gift.quantity, reserved) };
}
const store = "https://shop.example.invalid/item";
const totals = new Map<string, FundTotals>([
  ["fund-active", { goalInCents: 10000, confirmedInCents: 1000, pendingInCents: 0, contributionsCount: 1 }],
  ["fund-pending", { goalInCents: 10000, confirmedInCents: 0, pendingInCents: 20000, contributionsCount: 1 }],
  ["fund-done", { goalInCents: 10000, confirmedInCents: 10000, pendingInCents: 0, contributionsCount: 1 }],
]);
const catalogue = [
  item("done-product", 100, { purchaseUrl: store }, 1),
  item("fund-empty", 10000, { kind: "FUND", minContributionInCents: 10 }),
  item("pix", 50, { kind: "PIX" }),
  item("store-partial", 300, { purchaseUrl: store, quantity: 2 }, 1),
  item("fund-done", 10000, { kind: "FUND", minContributionInCents: 20 }),
  item("store-cheap", 200, { purchaseUrl: store }),
  item("fund-pending", 10000, { kind: "FUND", minContributionInCents: 40 }),
  item("fund-active", 10000, { kind: "FUND", minContributionInCents: 30 }),
  item("product-without-store", 60),
  item("invalid-store", 5, { purchaseUrl: "javascript:alert(1)" }),
  item("archived", 1, { quantity: 0, purchaseUrl: store }),
];
const ids = (items: ReturnType<typeof item>[]) => items.map(({ gift }) => gift.id);
const done = ["fund-done", "done-product"];

describe("public gift ordering", () => {
  it("implements the five priorities with ascending effective price within each", () => {
    expect(ids(sortPublicGifts(catalogue, "", totals))).toEqual([
      "store-cheap", "store-partial", "invalid-store", "pix", "product-without-store",
      "fund-active", "fund-pending", "fund-empty", ...done,
    ]);
  });
  it("sorts available items by ascending price and keeps completed ones last", () => {
    expect(ids(sortPublicGifts(catalogue, "price_asc", totals))).toEqual([
      "invalid-store", "fund-empty", "fund-active", "fund-pending", "pix", "product-without-store", "store-cheap", "store-partial", ...done,
    ]);
  });
  it("sorts available items by descending price and keeps the completed group ascending", () => {
    expect(ids(sortPublicGifts(catalogue, "price_desc", totals))).toEqual([
      "store-partial", "store-cheap", "product-without-store", "pix", "fund-pending", "fund-active", "fund-empty", "invalid-store", ...done,
    ]);
  });
  it.each(["", "price_asc", "price_desc"] as GiftSort[])("never intersperses unavailable items under %s, regardless of input order", (sort) => {
    for (let shift = 0; shift < catalogue.length; shift++) {
      const mixed = [...catalogue.slice(shift), ...catalogue.slice(0, shift)].reverse();
      const result = ids(sortPublicGifts(mixed, sort, totals));
      expect(result.slice(-2)).toEqual(done);
      expect(result).not.toContain("archived");
    }
  });
  it("uses creation time then ID as deterministic tie-breakers", () => {
    const a = item("a", 100); const b = item("b", 100);
    const old = item("older", 100, { createdAt: new Date("2020-01-01") });
    for (const sort of ["", "price_asc", "price_desc"] as GiftSort[]) {
      expect(ids(sortPublicGifts([b, a, old], sort, new Map()))).toEqual(["older", "a", "b"]);
    }
  });
  it("does not mutate the input array or its records", () => {
    const before = structuredClone(catalogue);
    sortPublicGifts(Object.freeze([...catalogue]), "price_desc", totals);
    expect(catalogue).toEqual(before);
  });
  it("uses the same one-cent legacy fallback as FundCard, not the fund goal", () => {
    const rows = [item("product", 5), item("fund", 500000, { kind: "FUND" })];
    expect(ids(sortPublicGifts(rows, "price_asc", new Map()))).toEqual(["fund", "product"]);
  });
  it("does not treat quantity zero as archival for FUND", () => {
    expect(ids(sortPublicGifts([item("fund", 1000, { kind: "FUND", quantity: 0 })], "", new Map()))).toEqual(["fund"]);
  });
  it("only treats a valid store URL on PRODUCT as the first priority", () => {
    const rows = [item("pix-with-url", 1, { kind: "PIX", purchaseUrl: store }), item("invalid", 2, { purchaseUrl: "https://user:password@shop.example.invalid/x" }), item("store", 999, { purchaseUrl: store })];
    expect(ids(sortPublicGifts(rows, "", new Map()))).toEqual(["store", "pix-with-url", "invalid"]);
  });
});

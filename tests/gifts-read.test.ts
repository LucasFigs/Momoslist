import { describe, it, expect, vi } from "vitest";
import type { Gift, Guest } from "@prisma/client";
const db = vi.hoisted(() => ({
  giftReservation: { groupBy: vi.fn(), findMany: vi.fn(), updateMany: vi.fn() },
  contribution: { groupBy: vi.fn(), findMany: vi.fn() },
}));
vi.mock("@/lib/prisma", () => ({ prisma: db }));
vi.mock("@/app/lista/[eventSlugToken]/gift-card", () => ({
  GiftCard: () => null,
}));
vi.mock("@/app/lista/[eventSlugToken]/fund-card", () => ({
  FundCard: () => null,
}));
import { GiftsSection } from "@/app/lista/[eventSlugToken]/gifts-section";

describe("public gift reads", () => {
  it("starts independent queries together and never writes while rendering", async () => {
    let finish!: (rows: unknown[]) => void;
    db.giftReservation.groupBy.mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    db.giftReservation.findMany.mockResolvedValue([]);
    db.contribution.groupBy.mockResolvedValue([]);
    db.contribution.findMany.mockResolvedValue([]);
    const gifts = [
      {
        id: "product",
        kind: "PRODUCT",
        name: "Panela",
        quantity: 1,
        priceInCents: 1000,
        purchaseUrl: null,
      },
      {
        id: "fund",
        kind: "FUND",
        name: "Sofá",
        quantity: 1,
        priceInCents: 10000,
      },
    ] as Gift[];
    const pending = GiftsSection({
      gifts,
      guest: { id: "guest" } as Guest,
      isIdentified: true,
      query: "",
      sort: "suggested",
      clearHref: "/",
      pixConfigured: true,
    });
    await vi.waitFor(() => {
      expect(db.giftReservation.findMany).toHaveBeenCalledTimes(1);
      expect(db.contribution.groupBy).toHaveBeenCalledTimes(1);
      expect(db.contribution.findMany).toHaveBeenCalledTimes(1);
    });
    expect(db.giftReservation.updateMany).not.toHaveBeenCalled();
    finish([]);
    expect(await pending).toBeTruthy();
  });
});

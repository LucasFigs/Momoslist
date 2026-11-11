import { safeStoreUrl } from "@/lib/store-url";
import { describe, it, expect } from "vitest";
import QRCode from "qrcode";
import sharp from "sharp";
import { safeRedirect } from "@/lib/safe-redirect";
import { computeFundProgress } from "@/lib/fund";
import { buildPixPayload } from "@/lib/pix-payload";
import { parsePriceToCents, giftSchema } from "@/schemas/gift.schema";
import { parseMessage } from "@/schemas/message.schema";
import { rsvpSchema } from "@/schemas/rsvp.schema";
import { sanitizeImage } from "@/lib/image-validation";
import { computeGiftAvailability } from "@/lib/gift-availability";

describe("login redirects", () => {
  it.each([
    "https://evil.test",
    "//evil.test",
    "javascript:alert(1)",
    "/\\evil.test",
    "/%2fevil.test",
    "/%5cevil.test",
    "/%0aevil",
    " /dashboard",
    "/%",
    null,
  ])("rejects %s", (value) => expect(safeRedirect(value)).toBe("/dashboard"));
  it("keeps a local return path", () =>
    expect(safeRedirect("/dashboard/eventos/abc?tab=recadinhos")).toBe(
      "/dashboard/eventos/abc?tab=recadinhos",
    ));
});
describe("fund accounting", () => {
  it("never completes a goal from pending transfers", () => {
    const progress = computeFundProgress({
      goalInCents: 10000,
      confirmedInCents: 2000,
      pendingInCents: 12000,
      contributionsCount: 3,
    });
    expect(progress).toMatchObject({
      reached: false,
      percent: 20,
      remainingInCents: 8000,
      overflowInCents: 0,
      confirmedBarPercent: 20,
      pendingBarPercent: 80,
    });
  });
  it("allows confirmed contributions over the goal", () =>
    expect(
      computeFundProgress({
        goalInCents: 10000,
        confirmedInCents: 15000,
        pendingInCents: 5000,
        contributionsCount: 2,
      }),
    ).toMatchObject({
      reached: true,
      percent: 150,
      overflowInCents: 5000,
      confirmedBarPercent: 100,
      pendingBarPercent: 0,
    }));
  it("does not produce NaN on an empty goal", () =>
    expect(
      Number.isFinite(
        computeFundProgress({
          goalInCents: 0,
          confirmedInCents: 0,
          pendingInCents: 0,
          contributionsCount: 0,
        }).percent,
      ),
    ).toBe(true));
});
describe("money and Pix", () => {
  it.each([
    ["10,01", 1001],
    ["1.234,56", 123456],
    ["0.01", 1],
    ["42", 4200],
  ])("parses %s exactly", (value, cents) =>
    expect(parsePriceToCents(String(value))).toBe(cents),
  );
  it.each(["1e4", "0xFF", "1.005", "-1", "Infinity", "1,2,3", ""])(
    "rejects ambiguous value %s",
    (value) => expect(Number.isNaN(parsePriceToCents(value))).toBe(true),
  );
  it.each([0, -1, 1.5, NaN, Infinity, 10000001])(
    "rejects invalid Pix cents %s",
    (amount) =>
      expect(() =>
        buildPixPayload({
          pixKey: "a@b.com",
          merchantName: "Momos",
          amountInCents: amount,
        }),
      ).toThrow(),
  );
  it("builds a QR and a valid CRC for the exact amount", async () => {
    const payload = buildPixPayload({
      pixKey: "teste@example.com",
      merchantName: "João e Maria",
      amountInCents: 12345,
    });
    expect(payload).toContain("5406123.45");
    let crc = 0xffff;
    for (const byte of Buffer.from(payload.slice(0, -4))) {
      crc ^= byte << 8;
      for (let i = 0; i < 8; i++)
        crc =
          crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
    expect(payload.slice(-4)).toBe(
      crc.toString(16).toUpperCase().padStart(4, "0"),
    );
    expect(await QRCode.toDataURL(payload)).toMatch(/^data:image\/png;base64,/);
  });
});
describe("validation", () => {
  it("limits notes and preserves plain text", () => {
    expect(parseMessage("a".repeat(501)).ok).toBe(false);
    expect(parseMessage(" <script>x</script> ")).toEqual({
      ok: true,
      value: "<script>x</script>",
    });
  });
  it("rejects invalid message types", () =>
    expect(parseMessage({ text: "hi" }).ok).toBe(false));
  it("does not accept an invalid store protocol", () =>
    expect(
      giftSchema.safeParse({
        name: "Panela",
        kind: "PRODUCT",
        price: "12",
        quantity: 1,
        purchaseUrl: "javascript:alert(1)",
      }).success,
    ).toBe(false));
  it("clears companions when not attending", () =>
    expect(
      rsvpSchema.parse({
        status: "NOT_ATTENDING",
        companionAdults: 2,
        companionChildren: 1,
        companionNames: "Ana",
      }),
    ).toMatchObject({
      companionAdults: 0,
      companionChildren: 0,
      companionNames: null,
    }));
  it("requires companion names", () =>
    expect(
      rsvpSchema.safeParse({
        status: "ATTENDING",
        companionAdults: 2,
        companionChildren: 0,
        companionNames: "Ana",
      }).success,
    ).toBe(false));
  it("never reports negative available stock", () =>
    expect(computeGiftAvailability(1, 2)).toEqual({
      availableUnits: 0,
      status: "UNAVAILABLE",
    }));
});
describe("image contents", () => {
  it("rejects HTML even when called a PNG", async () => {
    await expect(
      sanitizeImage(Buffer.from("<html>bad</html>")),
    ).rejects.toThrow();
  });
  it("rejects SVG", async () => {
    await expect(
      sanitizeImage(
        Buffer.from(
          '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
        ),
      ),
    ).rejects.toThrow();
  });
  it("decodes and re-encodes real images", async () => {
    const bytes = await sharp({
      create: { width: 4, height: 4, channels: 3, background: "red" },
    })
      .png()
      .toBuffer();
    expect((await sharp(await sanitizeImage(bytes)).metadata()).format).toBe(
      "webp",
    );
  });
});

describe("store URLs", () => {
  it.each(["javascript:alert(1)", "//example.com", "https://", "https:/// ", "https://user:pass@example.com", "https://example.com\\@evil.com", "https://exa mple.com"])("rejects unsafe or malformed URLs: %s", value => {
    expect(safeStoreUrl(value)).toBeNull();
  });
  it.each(["http://example.com/product", "https://example.com/product?a=1"])("accepts %s", value => {
    expect(safeStoreUrl(value)).toBe(value);
  });
});

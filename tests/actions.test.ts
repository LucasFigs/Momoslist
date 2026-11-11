import { beforeEach, describe, it, expect, vi } from "vitest";
const db = vi.hoisted(() => ({
  event: { findFirst: vi.fn(), findUnique: vi.fn() },
  eventMessage: { upsert: vi.fn(), deleteMany: vi.fn(), updateMany: vi.fn() },
  gift: { findFirst: vi.fn() },
  giftReservation: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
  },
  contribution: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
  },
  $transaction: vi.fn(),
}));
const identity = vi.hoisted(() => ({
  guest: vi.fn(),
  auth: vi.fn(),
  rate: vi.fn(),
}));
vi.mock("@/lib/prisma", () => ({ prisma: db }));
vi.mock("@/lib/guest-session", () => ({ getCurrentGuest: identity.guest }));
vi.mock("@/lib/auth", () => ({ auth: identity.auth }));
vi.mock("@/lib/rate-limit", () => ({ takeRateLimit: identity.rate }));
vi.mock("@/lib/email", () => ({ sendEmail: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
import {
  saveEventMessageAction,
  deleteEventMessageAction,
  moderateMessageAction,
} from "@/actions/message.actions";
import {
  createReservationAction,
  confirmReservationMethodAction,
  cancelReservationAction,
} from "@/actions/reservation.actions";
import {
  declarePixPaymentAction,
  confirmPixReceivedAction,
  getPaymentDetailsAction,
  confirmExternalPurchaseAction,
  confirmExternalPurchaseReceivedAction,
  saveReservationMessageAction,
  releaseUnpaidReservationAction,
} from "@/actions/payment.actions";
import {
  confirmContributionAction,
  cancelContributionAction,
} from "@/actions/contribution.actions";
const guest = {
  id: "guest-a",
  name: "Ana",
  email: "ana@example.com",
  phone: "85999999999",
};
const event = {
  id: "event-a",
  ownerId: "owner-a",
  published: true,
  pixKey: "pix@example.com",
  pixKeyType: "EMAIL",
  owner: { name: "Momos" },
  title: "Chá",
  slug: "cha",
  secureToken: "token",
};
function reservation(overrides = {}) {
  return {
    id: "r-a",
    guestId: guest.id,
    giftId: "gift-a",
    status: "CONFIRMED",
    paymentMethod: "PIX",
    pixStatus: "NOT_DECLARED",
    amountInCents: 12345,
    expiresAt: new Date(Date.now() + 60000),
    message: null,
    messagePublic: false,
    gift: {
      id: "gift-a",
      kind: "PRODUCT",
      priceInCents: 99999,
      name: "Panela",
      purchaseUrl: null,
      eventId: event.id,
      event,
    },
    ...overrides,
  };
}
beforeEach(() => {
  vi.resetAllMocks();
  identity.guest.mockResolvedValue(guest);
  identity.auth.mockResolvedValue({ user: { id: "owner-a" } });
  identity.rate.mockResolvedValue(true);
  db.event.findFirst.mockResolvedValue(event);
  db.event.findUnique.mockResolvedValue(event);
  db.giftReservation.findUnique.mockResolvedValue(reservation());
  db.giftReservation.updateMany.mockResolvedValue({ count: 1 });
  db.eventMessage.updateMany.mockResolvedValue({ count: 1 });
  db.$transaction.mockImplementation((fn) => fn(db));
});
describe("independent notes", () => {
  it.each([true, false])(
    "saves visibility %s without any gift",
    async (visibility) => {
      expect(
        await saveEventMessageAction(event.id, "Felicidades!", visibility),
      ).toEqual({ success: true });
      expect(db.eventMessage.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({
            eventId: event.id,
            guestId: guest.id,
            public: visibility,
          }),
        }),
      );
      expect(db.giftReservation.create).not.toHaveBeenCalled();
    },
  );
  it("edits cannot undo moderation", async () => {
    await saveEventMessageAction(event.id, "Olá", true);
    expect(
      db.eventMessage.upsert.mock.calls[0][0].update.hidden,
    ).toBeUndefined();
  });
  it("requires verified guest session", async () => {
    identity.guest.mockResolvedValue(null);
    expect((await saveEventMessageAction(event.id, "Oi", true)).success).toBe(
      false,
    );
    expect(db.eventMessage.upsert).not.toHaveBeenCalled();
  });
  it("rejects unpublished lists", async () => {
    db.event.findFirst.mockResolvedValue(null);
    expect((await saveEventMessageAction(event.id, "Oi", true)).success).toBe(
      false,
    );
  });
  it("rejects spam and long messages", async () => {
    identity.rate.mockResolvedValue(false);
    expect((await saveEventMessageAction(event.id, "Oi", true)).success).toBe(
      false,
    );
    expect(
      (await saveEventMessageAction(event.id, "a".repeat(501), true)).success,
    ).toBe(false);
  });
  it("deletes only the current author's note in the selected event", async () => {
    await deleteEventMessageAction(event.id);
    expect(db.eventMessage.deleteMany).toHaveBeenCalledWith({
      where: {
        eventId: event.id,
        guestId: guest.id,
      },
    });
  });
  it("denies moderation by a different owner", async () => {
    db.event.findFirst.mockResolvedValue(null);
    expect(
      (await moderateMessageAction(event.id, "m-note", true)).success,
    ).toBe(false);
    expect(db.eventMessage.updateMany).not.toHaveBeenCalled();
  });
  it("scopes moderation to the same event", async () => {
    await moderateMessageAction(event.id, "m-note", true);
    expect(db.eventMessage.updateMany).toHaveBeenCalledWith({
      where: { id: "note", eventId: event.id },
      data: { hidden: true },
    });
  });
});
describe("reservation authorization and lifecycle", () => {
  it("requires a guest before reserving", async () => {
    identity.guest.mockResolvedValue(null);
    expect((await createReservationAction("gift-a")).success).toBe(false);
  });
  it("rejects unavailable and unpublished gifts", async () => {
    db.gift.findFirst.mockResolvedValue(null);
    expect((await createReservationAction("gift-a")).success).toBe(false);
    expect(db.giftReservation.create).not.toHaveBeenCalled();
  });
  it("freezes price at reservation time", async () => {
    db.gift.findFirst.mockResolvedValue({
      id: "gift-a",
      kind: "PRODUCT",
      priceInCents: 12000,
      quantity: 1,
    });
    db.giftReservation.count.mockResolvedValue(0);
    db.giftReservation.create.mockResolvedValue({
      id: "r-a",
      status: "TEMPORARY",
      paymentMethod: null,
      expiresAt: new Date(),
    });
    expect((await createReservationAction("gift-a")).success).toBe(true);
    expect(db.giftReservation.create.mock.calls[0][0].data.amountInCents).toBe(
      12000,
    );
  });
  it("does not oversell full stock", async () => {
    db.gift.findFirst.mockResolvedValue({ kind: "PRODUCT", quantity: 1 });
    db.giftReservation.count.mockResolvedValue(1);
    expect((await createReservationAction("gift-a")).success).toBe(false);
    expect(db.giftReservation.create).not.toHaveBeenCalled();
  });
  it("rejects another guest's reservation", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({ guestId: "guest-b" }),
    );
    expect((await declarePixPaymentAction("r-a")).success).toBe(false);
    expect((await saveReservationMessageAction("r-a", "Oi")).success).toBe(
      false,
    );
    expect(db.giftReservation.updateMany).not.toHaveBeenCalled();
  });
  it("rejects methods not in the server enum", async () => {
    expect(
      (await confirmReservationMethodAction("r-a", "CASH" as "PIX")).success,
    ).toBe(false);
  });
  it("does not cancel declared payments", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({ pixStatus: "DECLARED" }),
    );
    expect((await cancelReservationAction("r-a")).success).toBe(false);
    expect(db.giftReservation.updateMany).not.toHaveBeenCalled();
  });
  it("does not resurrect cancelled reservations", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({ status: "CANCELLED", pixStatus: "DECLARED" }),
    );
    expect((await confirmPixReceivedAction("r-a")).success).toBe(false);
  });
  it("requires the event owner to confirm payment", async () => {
    identity.auth.mockResolvedValue({ user: { id: "owner-b" } });
    expect((await confirmPixReceivedAction("r-a")).success).toBe(false);
  });
  it("cannot downgrade an already declared transfer", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({ pixStatus: "DECLARED" }),
    );
    expect((await declarePixPaymentAction("r-a")).success).toBe(true);
    expect(db.giftReservation.updateMany).not.toHaveBeenCalled();
  });
  it("detects concurrent financial changes", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({ pixStatus: "DECLARED" }),
    );
    db.giftReservation.updateMany.mockResolvedValue({ count: 0 });
    expect((await confirmPixReceivedAction("r-a")).success).toBe(false);
  });
  it("uses the frozen amount in the Pix QR after catalogue edits", async () => {
    const result = await getPaymentDetailsAction("r-a");
    expect(result.success).toBe(true);
    if (result.success && result.details.kind === "PIX") {
      expect(result.details.copyPasteCode).toContain("5406123.45");
      expect(result.details.qrCodeDataUrl).toMatch(/^data:image/);
    }
  });
  it("does not extend a temporary hold when Pix instructions are unavailable", async () => {
    const row = reservation({ status: "TEMPORARY" });
    row.gift.event = { ...event, pixKey: "", pixKeyType: "" };
    db.giftReservation.findUnique.mockResolvedValue(row);
    expect((await getPaymentDetailsAction("r-a")).success).toBe(false);
    expect(db.giftReservation.updateMany).not.toHaveBeenCalled();
  });
  it("rejects new public interactions on an unpublished event", async () => {
    const row = reservation();
    row.gift.event = { ...event, published: false };
    db.giftReservation.findUnique.mockResolvedValue(row);
    expect((await getPaymentDetailsAction("r-a")).success).toBe(false);
    expect((await declarePixPaymentAction("r-a")).success).toBe(false);
  });
  it("permits manual receipt confirmation after unpublishing", async () => {
    const row = reservation({ pixStatus: "DECLARED" });
    row.gift.event = { ...event, published: false };
    db.giftReservation.findUnique.mockResolvedValue(row);
    expect((await confirmPixReceivedAction("r-a")).success).toBe(true);
  });
});
describe("manual release", () => {
  it("requires an owner and guards all payment states atomically", async () => {
    expect((await releaseUnpaidReservationAction("r-a")).success).toBe(true);
    expect(db.giftReservation.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          pixStatus: { in: ["NOT_DECLARED", "NOT_APPLICABLE"] },
          purchaseConfirmedAt: null,
          receivedAt: null,
          gift: { event: { ownerId: "owner-a" } },
        }),
      }),
    );
    identity.auth.mockResolvedValue(null);
    expect((await releaseUnpaidReservationAction("r-a")).success).toBe(false);
  });
});
describe("contributions", () => {
  it("conditional cancellation cannot override concurrent confirmation", async () => {
    db.contribution.findUnique.mockResolvedValue({
      id: "c-a",
      guestId: guest.id,
      status: "DECLARED",
      gift: { eventId: event.id, event: { published: true } },
    });
    db.contribution.updateMany.mockResolvedValue({ count: 0 });
    expect((await cancelContributionAction("c-a")).success).toBe(false);
    expect(db.contribution.updateMany.mock.calls[0][0].where.status).toBe(
      "DECLARED",
    );
  });
  it("blocks confirmation by the wrong event owner", async () => {
    db.contribution.findUnique.mockResolvedValue({
      gift: { event: { ownerId: "owner-b" } },
    });
    expect((await confirmContributionAction("c-a")).success).toBe(false);
    expect(db.contribution.updateMany).not.toHaveBeenCalled();
  });
});

describe("external purchase remains distinct from receipt", () => {
  it("does not complete a purchase when reading the store link", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({
        paymentMethod: "EXTERNAL_PURCHASE",
        pixStatus: "NOT_APPLICABLE",
      }),
    );
    expect((await getPaymentDetailsAction("r-a")).success).toBe(true);
    expect(db.giftReservation.updateMany).not.toHaveBeenCalled();
  });
  it("guest declaration does not mark the gift as received", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({
        paymentMethod: "EXTERNAL_PURCHASE",
        pixStatus: "NOT_APPLICABLE",
      }),
    );
    expect((await confirmExternalPurchaseAction("r-a")).success).toBe(true);
    expect(db.giftReservation.updateMany.mock.calls[0][0].data).toMatchObject({
      status: "COMPLETED",
      purchaseConfirmedAt: expect.any(Date),
    });
    expect(
      db.giftReservation.updateMany.mock.calls[0][0].data.receivedAt,
    ).toBeUndefined();
  });
  it("owner separately confirms receipt after the guest declares purchase", async () => {
    db.giftReservation.findUnique.mockResolvedValue(
      reservation({
        paymentMethod: "EXTERNAL_PURCHASE",
        pixStatus: "NOT_APPLICABLE",
        status: "COMPLETED",
        receivedAt: null,
      }),
    );
    expect((await confirmExternalPurchaseReceivedAction("r-a")).success).toBe(
      true,
    );
    expect(
      db.giftReservation.updateMany.mock.calls[0][0].data.receivedAt,
    ).toBeInstanceOf(Date);
  });
});

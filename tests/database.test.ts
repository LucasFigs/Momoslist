import {
  setEventPublishedAction,
  updateEventAction,
} from "@/actions/event.actions";
import { issueChallenge, consumeChallenge } from "@/lib/identity-challenge";
import {
  createGiftAction,
  updateGiftAction,
  deleteGiftAction,
} from "@/actions/gift.actions";
import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  it,
  expect,
  vi,
} from "vitest";
import { randomUUID } from "node:crypto";
const state = vi.hoisted(() => ({
  guestId: "",
  otherGuestId: "",
  otherToken: "",
  ownerId: "",
  cookies: new Map<string, string>(),
}));
vi.mock("@/lib/prisma", async () => {
  const { PrismaClient } = await import("@prisma/client");
  const url = process.env.TEST_DATABASE_URL;
  if (url) {
    const parsed = new URL(url);
    if (
      parsed.hostname !== "127.0.0.1" ||
      parsed.port !== "55439" ||
      parsed.pathname !== "/postgres"
    )
      throw new Error(
        "Tests require the isolated loopback PostgreSQL on port 55439",
      );
  }
  return {
    prisma: new PrismaClient({
      datasources: {
        db: { url: url ?? "postgresql://unused@127.0.0.1:1/disabled" },
      },
      log: [],
    }),
  };
});
vi.mock("@/lib/auth", () => ({
  auth: async () => ({ user: { id: state.ownerId } }),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/headers", () => ({
  cookies: async () => {
    const snapshot = new Map(state.cookies);
    return {
      get: (name: string) =>
        snapshot.has(name) ? { value: snapshot.get(name) } : undefined,
      set: (name: string, value: string) => state.cookies.set(name, value),
      delete: (name: string) => state.cookies.delete(name),
    };
  },
  headers: async () => new Headers(),
}));
const mail = vi.hoisted(() => ({ code: "", sent: true }));
vi.mock("@/lib/email", () => ({
  sendEmail: async (input: { text: string }) => {
    mail.code = input.text.match(/\b\d{6}\b/)?.[0] ?? "";
    return mail.sent;
  },
}));
import { prisma } from "@/lib/prisma";
import {
  createGuestSession,
  getCurrentGuest,
  revokeGuestSession,
} from "@/lib/guest-session";
import {
  createReservationAction,
  confirmReservationMethodAction,
  cancelReservationAction,
} from "@/actions/reservation.actions";
import {
  getPaymentDetailsAction,
  declarePixPaymentAction,
  confirmPixReceivedAction,
} from "@/actions/payment.actions";
import {
  saveEventMessageAction,
  deleteEventMessageAction,
  moderateMessageAction,
} from "@/actions/message.actions";
import {
  declareContributionAction,
  confirmContributionAction,
  cancelContributionAction,
} from "@/actions/contribution.actions";
import { saveRsvpAction } from "@/actions/rsvp.actions";
import { takeRateLimit } from "@/lib/rate-limit";
const prefix = randomUUID();
let eventId: string, giftId: string, fundId: string;
describe.runIf(Boolean(process.env.TEST_DATABASE_URL))(
  "isolated PostgreSQL integration",
  () => {
    beforeAll(async () => {
      const user = await prisma.user.create({
        data: {
          email: `${prefix}@example.invalid`,
          name: "Casal",
          emailVerified: new Date(),
        },
      });
      state.ownerId = user.id;
      const guest = await prisma.guest.create({
        data: {
          email: `guest-${prefix}@example.invalid`,
          name: "Ana",
          phone: "85999999999",
        },
      });
      state.guestId = guest.id;
      const event = await prisma.event.create({
        data: {
          ownerId: user.id,
          title: "Nosso cantinho",
          type: "CHA_CASA_NOVA",
          slug: prefix,
          secureToken: randomUUID(),
          published: true,
          rsvpEnabled: true,
          pixKey: "pix@example.com",
          pixKeyType: "EMAIL",
        },
      });
      eventId = event.id;
      giftId = (
        await prisma.gift.create({
          data: { eventId, name: "Panela", priceInCents: 12000, quantity: 1 },
        })
      ).id;
      fundId = (
        await prisma.gift.create({
          data: {
            eventId,
            name: "Sofá",
            kind: "FUND",
            priceInCents: 100000,
            minContributionInCents: 1000,
          },
        })
      ).id;
      const other = await prisma.guest.create({
        data: {
          email: `other-${prefix}@example.invalid`,
          name: "Bruno",
          phone: "85988888888",
        },
      });
      state.otherGuestId = other.id;
      await createGuestSession(other.id);
      state.otherToken = state.cookies.get("momos_guest_session")!;
      await createGuestSession(guest.id);
    });
    afterAll(async () => {
      await prisma.user.deleteMany({ where: { id: state.ownerId } });
      await prisma.guest.deleteMany({
        where: {
          OR: [
            { email: `guest-${prefix}@example.invalid` },
            { email: `other-${prefix}@example.invalid` },
          ],
        },
      });
      await prisma.rateLimit.deleteMany({
        where: { expiresAt: { lt: new Date(Date.now() + 86400_000) } },
      });
      await prisma.$disconnect();
    });
    it("rejects the old unsigned guest ID cookie", async () => {
      const current = state.cookies.get("momos_guest_session")!;
      state.cookies.delete("momos_guest_session");
      state.cookies.set("guest_id", state.guestId);
      expect(await getCurrentGuest()).toBeNull();
      state.cookies.set("momos_guest_session", current);
    });
    it("stores only a token hash and can revoke sessions", async () => {
      const raw = state.cookies.get("momos_guest_session")!;
      expect(
        await prisma.guestSession.findUnique({ where: { tokenHash: raw } }),
      ).toBeNull();
      expect((await getCurrentGuest())?.id).toBe(state.guestId);
      await revokeGuestSession();
      expect(await getCurrentGuest()).toBeNull();
      await createGuestSession(state.guestId);
    });
    it("last-unit race creates exactly one reservation", async () => {
      const token = state.cookies.get("momos_guest_session")!;
      const calls = Array.from({ length: 8 }, (_, index) => {
        state.cookies.set(
          "momos_guest_session",
          index % 2 ? state.otherToken : token,
        );
        return createReservationAction(giftId);
      });
      const results = await Promise.all(calls);
      const winner = await prisma.giftReservation.findFirstOrThrow({
        where: { giftId, status: "TEMPORARY" },
      });
      state.cookies.set(
        "momos_guest_session",
        winner.guestId === state.otherGuestId ? state.otherToken : token,
      );
      state.guestId = winner.guestId;
      expect(results.some((result) => result.success)).toBe(true);
      expect(
        await prisma.giftReservation.count({
          where: {
            giftId,
            status: { in: ["TEMPORARY", "CONFIRMED", "COMPLETED"] },
          },
        }),
      ).toBe(1);
      expect(
        (await prisma.giftReservation.findFirstOrThrow({ where: { giftId } }))
          .amountInCents,
      ).toBe(12000);
    });
    it("selecting a method alone does not make an indefinite hold", async () => {
      const reservation = await prisma.giftReservation.findFirstOrThrow({
        where: { giftId, status: "TEMPORARY" },
      });
      expect(
        (await confirmReservationMethodAction(reservation.id, "PIX")).success,
      ).toBe(true);
      expect(
        (
          await prisma.giftReservation.findUniqueOrThrow({
            where: { id: reservation.id },
          })
        ).status,
      ).toBe("TEMPORARY");
    });
    it("expires abandoned holds and keeps the previous snapshot after catalogue edits", async () => {
      await prisma.giftReservation.updateMany({
        where: { giftId, status: "TEMPORARY" },
        data: { expiresAt: new Date(Date.now() - 1000) },
      });
      expect((await createReservationAction(giftId)).success).toBe(true);
      expect(
        await prisma.giftReservation.count({
          where: { giftId, status: "EXPIRED" },
        }),
      ).toBe(1);
      const current = await prisma.giftReservation.findFirstOrThrow({
        where: { giftId, status: "TEMPORARY" },
      });
      await prisma.gift.update({
        where: { id: giftId },
        data: { priceInCents: 99000 },
      });
      await confirmReservationMethodAction(current.id, "PIX");
      const payment = await getPaymentDetailsAction(current.id);
      expect(payment.success).toBe(true);
      if (payment.success && payment.details.kind === "PIX")
        expect(payment.details.copyPasteCode).toContain("5406120.00");
      expect(
        (
          await prisma.giftReservation.findUniqueOrThrow({
            where: { id: current.id },
          })
        ).status,
      ).toBe("CONFIRMED");
    });
    it("declared Pix survives expiration and cannot be cancelled by guest", async () => {
      const current = await prisma.giftReservation.findFirstOrThrow({
        where: { giftId, status: "CONFIRMED" },
      });
      await declarePixPaymentAction(current.id, "Felicidades", true);
      await prisma.giftReservation.update({
        where: { id: current.id },
        data: { expiresAt: new Date(Date.now() - 1000) },
      });
      expect((await cancelReservationAction(current.id)).success).toBe(false);
      await createReservationAction(giftId);
      expect(
        (
          await prisma.giftReservation.findUniqueOrThrow({
            where: { id: current.id },
          })
        ).pixStatus,
      ).toBe("DECLARED");
      await confirmPixReceivedAction(current.id);
      expect(
        (
          await prisma.giftReservation.findUniqueOrThrow({
            where: { id: current.id },
          })
        ).status,
      ).toBe("COMPLETED");
    });
    it("deduplicates simultaneous contribution declarations", async () => {
      await Promise.all(
        Array.from({ length: 4 }, () =>
          declareContributionAction(fundId, 2000, "Abraços", false),
        ),
      );
      expect(
        await prisma.contribution.count({
          where: { giftId: fundId, status: "DECLARED" },
        }),
      ).toBe(1);
    });
    it("confirmation and cancellation cannot both win", async () => {
      const contribution = await prisma.contribution.findFirstOrThrow({
        where: { giftId: fundId },
      });
      const results = await Promise.all([
        confirmContributionAction(contribution.id),
        cancelContributionAction(contribution.id),
      ]);
      expect(results.filter((result) => result.success)).toHaveLength(1);
      expect(["CONFIRMED", "CANCELLED"]).toContain(
        (
          await prisma.contribution.findUniqueOrThrow({
            where: { id: contribution.id },
          })
        ).status,
      );
    });
    it("isolates independent notes by event, preserves privacy and moderation", async () => {
      expect(
        (await saveEventMessageAction(eventId, "Muito amor!", false)).success,
      ).toBe(true);
      const note = await prisma.eventMessage.findUniqueOrThrow({
        where: { eventId_guestId: { eventId, guestId: state.guestId } },
      });
      expect(note.public).toBe(false);
      expect(
        await prisma.eventMessage.count({
          where: { eventId, public: true, hidden: false },
        }),
      ).toBe(0);
      await saveEventMessageAction(eventId, "Muito amor para vocês!", true);
      await moderateMessageAction(eventId, `m-${note.id}`, true);
      await saveEventMessageAction(eventId, "Editado", true);
      expect(
        (
          await prisma.eventMessage.findUniqueOrThrow({
            where: { id: note.id },
          })
        ).hidden,
      ).toBe(true);
      expect(
        (await moderateMessageAction("another-event", `m-${note.id}`, false))
          .success,
      ).toBe(false);
      await deleteEventMessageAction(eventId);
      expect(await prisma.eventMessage.count({ where: { eventId } })).toBe(0);
    });
    it("allows RSVP without reserving another gift", async () => {
      expect(
        (
          await saveRsvpAction(eventId, {
            status: "ATTENDING",
            companionAdults: 0,
            companionChildren: 0,
            companionNames: "",
          })
        ).success,
      ).toBe(true);
      expect(
        await prisma.rsvp.count({ where: { eventId, guestId: state.guestId } }),
      ).toBe(1);
    });
    it("keeps a durable contribution retry key beyond the legacy minute window", async () => {
      const requestKey = randomUUID();
      expect(
        (
          await declareContributionAction(
            fundId,
            3000,
            undefined,
            false,
            requestKey,
          )
        ).success,
      ).toBe(true);
      await prisma.contribution.updateMany({
        where: { guestId: state.guestId, requestKey },
        data: { declaredAt: new Date(Date.now() - 120000) },
      });
      expect(
        (
          await declareContributionAction(
            fundId,
            3000,
            undefined,
            false,
            requestKey,
          )
        ).success,
      ).toBe(true);
      expect(
        await prisma.contribution.count({
          where: { guestId: state.guestId, requestKey },
        }),
      ).toBe(1);
      expect(
        (
          await declareContributionAction(
            fundId,
            4000,
            undefined,
            false,
            requestKey,
          )
        ).success,
      ).toBe(false);
    });
    it("never expires legacy temporary holds with a declared payment", async () => {
      const special = await prisma.gift.create({
        data: { eventId, name: "Reserva legada", priceInCents: 1000 },
      });
      const protectedHold = await prisma.giftReservation.create({
        data: {
          giftId: special.id,
          guestId: state.guestId,
          status: "TEMPORARY",
          paymentMethod: "PIX",
          pixStatus: "DECLARED",
          expiresAt: new Date(Date.now() - 1000),
        },
      });
      expect((await createReservationAction(special.id)).success).toBe(true);
      expect(
        (
          await prisma.giftReservation.findUniqueOrThrow({
            where: { id: protectedHold.id },
          })
        ).status,
      ).toBe("TEMPORARY");
    });
    it("denies all gift mutations for another organizer's event", async () => {
      const owner = await prisma.user.create({
        data: { email: "other-owner-" + prefix + "@example.invalid" },
      });
      try {
        const foreign = await prisma.event.create({
          data: {
            ownerId: owner.id,
            title: "Outra lista",
            type: "CHA_CASA_NOVA",
            slug: "foreign-" + prefix,
            secureToken: randomUUID(),
          },
        });
        const gift = await prisma.gift.create({
          data: {
            eventId: foreign.id,
            name: "Outro presente",
            priceInCents: 1000,
          },
        });
        const form = new FormData();
        form.set("name", "Alterado");
        form.set("price", "20");
        form.set("quantity", "1");
        form.set("kind", "PRODUCT");
        expect((await createGiftAction(foreign.id, form)).success).toBe(false);
        expect((await updateGiftAction(gift.id, form)).success).toBe(false);
        expect((await deleteGiftAction(gift.id)).success).toBe(false);
        expect(
          (await prisma.gift.findUniqueOrThrow({ where: { id: gift.id } }))
            .name,
        ).toBe("Outro presente");
      } finally {
        await prisma.user.delete({ where: { id: owner.id } });
      }
    });
    it("requires a delivered, unexpired, purpose-bound, single-use email code", async () => {
      expect(
        await issueChallenge("proof-" + prefix + "@example.invalid", {
          purpose: "guest",
          email: "proof@example.invalid",
        }),
      ).toBe(true);
      const code = mail.code;
      expect(await consumeChallenge(code, "organizer")).toBeNull();
      expect(await consumeChallenge(code, "guest")).not.toBeNull();
      expect(await consumeChallenge(code, "guest")).toBeNull();
      expect(
        await issueChallenge("expiry-" + prefix + "@example.invalid", {
          purpose: "guest",
        }),
      ).toBe(true);
      const id = state.cookies.get("momos_identity_challenge")!;
      await prisma.identityChallenge.update({
        where: { id },
        data: { expiresAt: new Date(Date.now() - 1000) },
      });
      expect(await consumeChallenge(mail.code, "guest")).toBeNull();
      mail.sent = false;
      expect(
        await issueChallenge("failed-" + prefix + "@example.invalid", {
          purpose: "guest",
        }),
      ).toBe(false);
      mail.sent = true;
    });
    it("limits attempts atomically even with simultaneous wrong codes", async () => {
      expect(
        await issueChallenge("attempts-" + prefix + "@example.invalid", {
          purpose: "guest",
        }),
      ).toBe(true);
      const correct = mail.code;
      const id = state.cookies.get("momos_identity_challenge")!;
      await Promise.all(
        Array.from({ length: 8 }, () => consumeChallenge("000000", "guest")),
      );
      expect(
        (await prisma.identityChallenge.findUniqueOrThrow({ where: { id } }))
          .attempts,
      ).toBe(5);
      expect(await consumeChallenge(correct, "guest")).toBeNull();
    });
    it("rejects interactions after unpublishing", async () => {
      await prisma.event.update({
        where: { id: eventId },
        data: { published: false },
      });
      expect(
        (await saveEventMessageAction(eventId, "Não pode", true)).success,
      ).toBe(false);
      expect((await declareContributionAction(fundId, 3000)).success).toBe(
        false,
      );
      expect((await createReservationAction(giftId)).success).toBe(false);
      expect(
        (
          await saveRsvpAction(eventId, {
            status: "ATTENDING",
            companionAdults: 0,
            companionChildren: 0,
            companionNames: "",
          })
        ).success,
      ).toBe(false);
    });
    it("allows only the author to withdraw their note after unpublishing", async () => {
      await prisma.eventMessage.upsert({
        where: { eventId_guestId: { eventId, guestId: state.guestId } },
        create: { eventId, guestId: state.guestId, message: "Privado" },
        update: { message: "Privado" },
      });
      expect((await deleteEventMessageAction(eventId)).success).toBe(true);
      expect(
        await prisma.eventMessage.count({
          where: { eventId, guestId: state.guestId },
        }),
      ).toBe(0);
    });
    it("enforces shared rate limits atomically", async () => {
      const results = await Promise.all(
        Array.from({ length: 10 }, () => takeRateLimit("test", prefix, 3, 60)),
      );
      expect(results.filter(Boolean)).toHaveLength(3);
    });
    it("keeps published Pix configuration valid and checks readiness transactionally", async () => {
      await prisma.event.update({
        where: { id: eventId },
        data: { published: true },
      });
      const form = new FormData();
      form.set("title", "Nosso cantinho");
      form.set("type", "CHA_CASA_NOVA");
      form.set("pixKey", "");
      form.set("pixKeyType", "");
      expect((await updateEventAction(eventId, form)).success).toBe(false);
      expect(
        (await prisma.event.findUniqueOrThrow({ where: { id: eventId } }))
          .pixKey,
      ).toBeTruthy();
      await prisma.event.update({
        where: { id: eventId },
        data: { published: false, pixKey: null, pixKeyType: null },
      });
      expect((await setEventPublishedAction(eventId, true)).success).toBe(
        false,
      );
      await prisma.event.update({
        where: { id: eventId },
        data: { published: true },
      });
      const giftForm = new FormData();
      giftForm.set("name", "Pix indisponível");
      giftForm.set("kind", "PIX");
      giftForm.set("price", "20,00");
      giftForm.set("quantity", "1");
      expect((await createGiftAction(eventId, giftForm)).success).toBe(false);
    });
    it("limits repeated RSVP updates without creating duplicate responses", async () => {
      const input = {
        status: "ATTENDING" as const,
        companionAdults: 0,
        companionChildren: 0,
        companionNames: "",
      };
      for (let index = 0; index < 12; index++)
        await saveRsvpAction(eventId, input);
      expect((await saveRsvpAction(eventId, input)).success).toBe(false);
      expect(
        await prisma.rsvp.count({ where: { eventId, guestId: state.guestId } }),
      ).toBe(1);
    });
    it("supports owned gift CRUD and preserves the last published item", async () => {
      const event = await prisma.event.create({
        data: {
          ownerId: state.ownerId,
          title: "CRUD isolated",
          type: "CHA_CASA_NOVA",
          slug: "crud-" + prefix,
          secureToken: randomUUID(),
        },
      });
      const form = new FormData();
      for (const [key, value] of Object.entries({
        name: "Panela CRUD",
        kind: "PRODUCT",
        price: "25,00",
        quantity: "1",
        description: "",
        purchaseUrl: "",
        minContribution: "",
      }))
        form.set(key, value);
      expect((await createGiftAction(event.id, form)).success).toBe(true);
      const gift = await prisma.gift.findFirstOrThrow({
        where: { eventId: event.id },
      });
      form.set("name", "Panela editada");
      form.set("price", "35,00");
      form.set("quantity", "2");
      expect((await updateGiftAction(gift.id, form)).success).toBe(true);
      expect(
        (await prisma.gift.findUniqueOrThrow({ where: { id: gift.id } }))
          .priceInCents,
      ).toBe(3500);
      expect((await setEventPublishedAction(event.id, true)).success).toBe(
        true,
      );
      expect((await deleteGiftAction(gift.id)).success).toBe(false);
      expect(await prisma.gift.count({ where: { eventId: event.id } })).toBe(1);
      expect((await setEventPublishedAction(event.id, false)).success).toBe(
        true,
      );
      expect((await deleteGiftAction(gift.id)).success).toBe(true);
      expect(await prisma.gift.count({ where: { eventId: event.id } })).toBe(0);
    });
  },
);

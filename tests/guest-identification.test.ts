import { beforeEach, describe, expect, it, vi } from "vitest";
import { Prisma } from "@prisma/client";

const db = vi.hoisted(() => ({
  guest: {
    findUnique: vi.fn(),
    create: vi.fn(),
    upsert: vi.fn(),
  },
  guestSession: { deleteMany: vi.fn() },
}));
const mocks = vi.hoisted(() => ({
  createSession: vi.fn(),
  revokeSession: vi.fn(),
  currentGuest: vi.fn(),
  issueChallenge: vi.fn(),
  consumeChallenge: vi.fn(),
  rateLimit: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({ prisma: db }));
vi.mock("@/lib/guest-session", () => ({
  createGuestSession: mocks.createSession,
  revokeGuestSession: mocks.revokeSession,
  getCurrentGuest: mocks.currentGuest,
}));
vi.mock("@/lib/identity-challenge", () => ({
  issueChallenge: mocks.issueChallenge,
  consumeChallenge: mocks.consumeChallenge,
}));
vi.mock("@/lib/rate-limit", () => ({ takeRateLimit: mocks.rateLimit }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-vercel-forwarded-for": "203.0.113.7" }),
}));

import {
  identifyGuestAction,
  verifyGuestAction,
} from "@/actions/guest.actions";

function identification() {
  const data = new FormData();
  data.set("name", "Ana");
  data.set("email", "ANA@EXAMPLE.COM");
  data.set("phone", "(85) 99999-9999");
  return data;
}

function verification() {
  const data = new FormData();
  data.set("code", "123456");
  return data;
}

beforeEach(() => {
  vi.resetAllMocks();
  db.guest.findUnique.mockResolvedValue(null);
  db.guest.create.mockResolvedValue({ id: "new-guest", name: "Ana" });
  db.guest.upsert.mockResolvedValue({ id: "existing-guest", name: "Ana" });
  db.guestSession.deleteMany.mockResolvedValue({ count: 2 });
  mocks.rateLimit.mockResolvedValue(true);
  mocks.issueChallenge.mockResolvedValue(true);
  mocks.consumeChallenge.mockResolvedValue({
    name: "Ana",
    email: "ana@example.com",
    phone: "85999999999",
  });
});

describe("guest identification without a first-access code", () => {
  it("registers an unknown email, stores contact details, and opens a session", async () => {
    expect(await identifyGuestAction(identification())).toEqual({
      success: true,
      guestName: "Ana",
    });
    expect(db.guest.create).toHaveBeenCalledWith({
      data: {
        name: "Ana",
        email: "ana@example.com",
        phone: "85999999999",
      },
    });
    expect(mocks.createSession).toHaveBeenCalledWith("new-guest");
    expect(mocks.issueChallenge).not.toHaveBeenCalled();
  });

  it("requires mailbox proof before reusing any existing guest identity", async () => {
    db.guest.findUnique.mockResolvedValue({ id: "existing-guest" });
    expect(await identifyGuestAction(identification())).toEqual({
      success: true,
      verificationRequired: true,
    });
    expect(db.guest.create).not.toHaveBeenCalled();
    expect(mocks.createSession).not.toHaveBeenCalled();
    expect(mocks.issueChallenge).toHaveBeenCalledWith(
      "ana@example.com",
      expect.objectContaining({ purpose: "guest" }),
    );
  });

  it("falls back to verification on a concurrent duplicate-email insert", async () => {
    db.guest.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("Unique email", {
        code: "P2002",
        clientVersion: "5.16.1",
        meta: { target: ["email"] },
      }),
    );
    expect(await identifyGuestAction(identification())).toMatchObject({
      success: true,
      verificationRequired: true,
    });
    expect(mocks.createSession).not.toHaveBeenCalled();
    expect(mocks.issueChallenge).toHaveBeenCalledOnce();
  });

  it("does not bypass verification when a database error is not a duplicate", async () => {
    db.guest.create.mockRejectedValue(new Error("Database unavailable"));
    expect((await identifyGuestAction(identification())).success).toBe(false);
    expect(mocks.createSession).not.toHaveBeenCalled();
    expect(mocks.issueChallenge).not.toHaveBeenCalled();
  });

  it("does not mistake another unique-index error for an existing email", async () => {
    db.guest.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("Other unique violation", {
        code: "P2002",
        clientVersion: "5.16.1",
        meta: { target: ["id"] },
      }),
    );
    expect((await identifyGuestAction(identification())).success).toBe(false);
    expect(mocks.issueChallenge).not.toHaveBeenCalled();
  });

  it("rate-limits attempts before touching guest records", async () => {
    mocks.rateLimit.mockResolvedValue(false);
    expect((await identifyGuestAction(identification())).success).toBe(false);
    expect(db.guest.findUnique).not.toHaveBeenCalled();
    expect(db.guest.create).not.toHaveBeenCalled();
  });

  it("rejects invalid contact details without registering anyone", async () => {
    const data = identification();
    data.set("phone", "123");
    expect((await identifyGuestAction(data)).success).toBe(false);
    expect(db.guest.create).not.toHaveBeenCalled();
  });

  it("revokes previous sessions after a successful email recovery", async () => {
    expect(await verifyGuestAction(verification())).toEqual({
      success: true,
      guestName: "Ana",
    });
    expect(db.guestSession.deleteMany).toHaveBeenCalledWith({
      where: { guestId: "existing-guest" },
    });
    expect(db.guest.upsert).toHaveBeenCalledWith({
      where: { email: "ana@example.com" },
      create: { email: "ana@example.com", name: "Ana", phone: "85999999999" },
      update: { name: "Ana", phone: "85999999999" },
    });
    expect(mocks.createSession).toHaveBeenCalledWith("existing-guest");
    expect(db.guestSession.deleteMany.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.createSession.mock.invocationCallOrder[0],
    );
  });

  it("does not create sessions for invalid recovery codes", async () => {
    mocks.consumeChallenge.mockResolvedValue(null);
    expect((await verifyGuestAction(verification())).success).toBe(false);
    expect(db.guest.upsert).not.toHaveBeenCalled();
    expect(db.guestSession.deleteMany).not.toHaveBeenCalled();
    expect(mocks.createSession).not.toHaveBeenCalled();
  });
});

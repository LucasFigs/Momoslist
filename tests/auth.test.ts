import { beforeEach, describe, it, expect, vi } from "vitest";
import type { NextAuthConfig } from "next-auth";
const captured = vi.hoisted(() => ({ config: null as NextAuthConfig | null }));
const db = vi.hoisted(() => ({
  user: {
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
  },
}));
const mocks = vi.hoisted(() => ({
  rate: vi.fn(),
  issue: vi.fn(),
  consume: vi.fn(),
  compare: vi.fn(),
  hash: vi.fn(),
}));
vi.mock("next-auth", () => ({
  default: (config: NextAuthConfig) => {
    captured.config = config;
    return { auth: vi.fn(), handlers: {}, signIn: vi.fn(), signOut: vi.fn() };
  },
}));
vi.mock("@auth/prisma-adapter", () => ({ PrismaAdapter: () => ({}) }));
vi.mock("@/lib/prisma", () => ({ prisma: db }));
vi.mock("@/lib/rate-limit", () => ({ takeRateLimit: mocks.rate }));
vi.mock("@/lib/identity-challenge", () => ({
  issueChallenge: mocks.issue,
  consumeChallenge: mocks.consume,
}));
vi.mock("bcryptjs", () => ({
  default: { compare: mocks.compare, hash: mocks.hash },
}));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
import "@/lib/auth";
import { signUpAction, verifySignUpAction } from "@/actions/auth.actions";
function signup() {
  const data = new FormData();
  data.set("name", "Ana");
  data.set("email", "Ana@example.com");
  data.set("password", "a-long-password");
  return data;
}
function code() {
  const data = new FormData();
  data.set("code", "123456");
  return data;
}
// Providers keep caller options before Auth.js normalizes them.
function providerOptions(id: string) {
  const providers = captured.config!.providers as Array<{
    id: string;
    options: Record<string, unknown>;
  }>;
  return providers.find((provider) => provider.id === id)!.options;
}
beforeEach(() => {
  vi.clearAllMocks();
  mocks.rate.mockResolvedValue(true);
  mocks.issue.mockResolvedValue(true);
  mocks.compare.mockResolvedValue(true);
  mocks.hash.mockResolvedValue("hash");
  mocks.consume.mockResolvedValue({
    name: "Ana",
    email: "ana@example.com",
    passwordHash: "hash",
  });
  db.user.findFirst.mockResolvedValue(null);
});
describe("organizer authentication", () => {
  it("does not install a password until mailbox proof", async () => {
    expect(await signUpAction(signup())).toEqual({
      success: true,
      verificationRequired: true,
    });
    expect(db.user.create).not.toHaveBeenCalled();
    expect(mocks.issue).toHaveBeenCalledWith(
      "ana@example.com",
      expect.objectContaining({ purpose: "organizer", passwordHash: "hash" }),
    );
  });
  it("fails closed when email verification is unavailable", async () => {
    mocks.issue.mockResolvedValue(false);
    expect((await signUpAction(signup())).success).toBe(false);
    expect(db.user.create).not.toHaveBeenCalled();
  });
  it("creates only a verified user after a valid code", async () => {
    expect((await verifySignUpAction(code())).success).toBe(true);
    expect(db.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ emailVerified: expect.any(Date) }),
    });
  });
  it("rejects incorrect or expired codes", async () => {
    mocks.consume.mockResolvedValue(null);
    expect((await verifySignUpAction(code())).success).toBe(false);
    expect(db.user.create).not.toHaveBeenCalled();
  });
  it("never changes a verified account or links a Google account", async () => {
    for (const user of [
      { id: "u", emailVerified: new Date(), accounts: [] },
      { id: "u", emailVerified: null, accounts: [{ provider: "google" }] },
    ]) {
      db.user.findFirst.mockResolvedValue(user);
      expect((await verifySignUpAction(code())).success).toBe(false);
    }
    expect(db.user.updateMany).not.toHaveBeenCalled();
  });
  it("replaces a legacy unverified password only with atomic email-proof guards", async () => {
    db.user.findFirst.mockResolvedValue({
      id: "u",
      emailVerified: null,
      accounts: [],
    });
    db.user.updateMany.mockResolvedValue({ count: 1 });
    expect((await verifySignUpAction(code())).success).toBe(true);
    expect(db.user.updateMany).toHaveBeenCalledWith({
      where: { id: "u", emailVerified: null, accounts: { none: {} } },
      data: expect.objectContaining({
        emailVerified: expect.any(Date),
        passwordHash: "hash",
      }),
    });
  });
  it("disables dangerous email linking", () =>
    expect(providerOptions("google").allowDangerousEmailAccountLinking).toBe(
      false,
    ));
  it("requires Google to prove mailbox ownership", async () => {
    const signIn = captured.config!.callbacks!.signIn!;
    expect(
      await signIn({
        account: { provider: "google" },
        profile: { email_verified: false },
      } as never),
    ).toBe(false);
    expect(
      await signIn({
        account: { provider: "google" },
        profile: { email_verified: true },
      } as never),
    ).toBe(true);
  });
  it("does not authenticate a legacy unverified password", async () => {
    const authorize = providerOptions("credentials").authorize as (
      data: unknown,
      request: Request,
    ) => Promise<unknown>;
    db.user.findFirst.mockResolvedValue({
      id: "u",
      passwordHash: "hash",
      emailVerified: null,
    });
    expect(
      await authorize(
        { email: "a@example.com", password: "valid" },
        new Request("https://momos.test"),
      ),
    ).toBeNull();
  });
  it("authenticates verified credentials only after password and rate checks", async () => {
    const authorize = providerOptions("credentials").authorize as (
      data: unknown,
      request: Request,
    ) => Promise<unknown>;
    db.user.findFirst.mockResolvedValue({
      id: "u",
      email: "a@example.com",
      passwordHash: "hash",
      emailVerified: new Date(),
    });
    expect(
      await authorize(
        { email: "a@example.com", password: "valid" },
        new Request("https://momos.test"),
      ),
    ).toMatchObject({ id: "u" });
    mocks.rate.mockResolvedValue(false);
    expect(
      await authorize(
        { email: "a@example.com", password: "valid" },
        new Request("https://momos.test"),
      ),
    ).toBeNull();
  });
});

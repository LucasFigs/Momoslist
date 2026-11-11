import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const GUEST_COOKIE_NAME = "momos_guest_session";
export const GUEST_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export async function createGuestSession(guestId: string) {
  const token = randomBytes(32).toString("hex");
  await prisma.guestSession.create({
    data: {
      tokenHash: hash(token),
      guestId,
      expiresAt: new Date(Date.now() + GUEST_COOKIE_MAX_AGE_SECONDS * 1000),
    },
  });
  (await cookies()).delete("guest_id");
  (await cookies()).set(GUEST_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: GUEST_COOKIE_MAX_AGE_SECONDS,
  });
}
export async function revokeGuestSession() {
  const token = (await cookies()).get(GUEST_COOKIE_NAME)?.value;
  if (token)
    await prisma.guestSession.deleteMany({ where: { tokenHash: hash(token) } });
  (await cookies()).delete(GUEST_COOKIE_NAME);
  (await cookies()).delete("guest_id");
}
export async function getCurrentGuest() {
  const token = (await cookies()).get(GUEST_COOKIE_NAME)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const session = await prisma.guestSession.findUnique({
    where: { tokenHash: hash(token) },
    include: { guest: true },
  });
  return session && session.expiresAt > new Date() ? session.guest : null;
}

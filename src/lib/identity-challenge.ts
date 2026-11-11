import {
  randomBytes,
  randomInt,
  createHash,
  timingSafeEqual,
} from "node:crypto";
import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { takeRateLimit } from "@/lib/rate-limit";
import type { Prisma } from "@prisma/client";

const COOKIE = "momos_identity_challenge";
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export async function issueChallenge(
  email: string,
  payload: Prisma.InputJsonObject,
) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-vercel-forwarded-for") ??
    requestHeaders.get("x-forwarded-for") ??
    "unknown";
  if (
    !(await takeRateLimit("identity-ip", ip, 10, 900)) ||
    !(await takeRateLimit("identity-email", email, 3, 900))
  )
    return false;
  const id = randomBytes(32).toString("hex");
  const code = randomInt(100000, 1000000).toString();
  await prisma.identityChallenge.create({
    data: {
      id,
      codeHash: digest(id + code),
      payload,
      expiresAt: new Date(Date.now() + 10 * 60_000),
    },
  });
  const sent = await sendEmail(
    {
      to: email,
      subject: "Seu código de acesso ao Momoslist",
      html: `<p>Seu código é <strong>${code}</strong>.</p><p>Expira em 10 minutos. Não compartilhe este código.</p>`,
      text: `Seu código Momoslist é ${code}. Expira em 10 minutos. Não compartilhe.`,
    },
    true,
  );
  if (!sent) {
    await prisma.identityChallenge.deleteMany({ where: { id } });
    return false;
  }
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return true;
}
export async function consumeChallenge(code: unknown, purpose: string) {
  const id = (await cookies()).get(COOKIE)?.value;
  if (!id || typeof code !== "string" || !/^\d{6}$/.test(code)) return null;
  // Each attempt is counted atomically, including simultaneous submissions.
  const attempt = await prisma.identityChallenge.updateMany({
    where: { id, expiresAt: { gt: new Date() }, attempts: { lt: 5 } },
    data: { attempts: { increment: 1 } },
  });
  if (!attempt.count) return null;
  const row = await prisma.identityChallenge.findUnique({ where: { id } });
  if (
    !row ||
    !timingSafeEqual(Buffer.from(row.codeHash), Buffer.from(digest(id + code)))
  )
    return null;
  const data = row.payload as Record<string, string>;
  if (data.purpose !== purpose) return null;
  const consumed = await prisma.identityChallenge.deleteMany({ where: { id } });
  if (!consumed.count) return null;
  (await cookies()).delete(COOKIE);
  return data;
}

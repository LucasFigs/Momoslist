"use server";
import { headers } from "next/headers";
import { takeRateLimit } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schemas/auth.schema";
import { issueChallenge, consumeChallenge } from "@/lib/identity-challenge";
import { withErrorHandling } from "@/lib/logger";
type Result =
  | { success: true; verificationRequired?: boolean }
  | { success: false; error: string };
export async function signUpAction(formData: FormData): Promise<Result> {
  return withErrorHandling("signUp", async () => {
    const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success)
      return {
        success: false as const,
        error: parsed.error.issues[0]?.message ?? "Confira seus dados.",
      };
    const { name, email, password } = parsed.data;
    const requestHeaders = await headers();
    const ip =
      requestHeaders.get("x-vercel-forwarded-for") ??
      requestHeaders.get("x-forwarded-for") ??
      "unknown";
    if (!(await takeRateLimit("signup-hash", ip, 5, 900)))
      return {
        success: false as const,
        error: "Aguarde alguns minutos antes de tentar novamente.",
      };
    // No account (and no password) is installed before proof of mailbox ownership.
    const sent = await issueChallenge(email, {
      purpose: "organizer",
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });
    return sent
      ? { success: true as const, verificationRequired: true }
      : {
          success: false as const,
          error:
            "Não foi possível enviar o código. Aguarde alguns minutos e tente novamente.",
        };
  });
}
export async function verifySignUpAction(formData: FormData): Promise<Result> {
  return withErrorHandling("verifySignUp", async () => {
    const data = await consumeChallenge(formData.get("code"), "organizer");
    if (!data)
      return {
        success: false as const,
        error: "Código inválido ou expirado. Solicite outro código.",
      };
    const existing = await prisma.user.findFirst({
      where: { email: { equals: data.email, mode: "insensitive" } },
      include: { accounts: true },
    });
    if (existing) {
      // Legacy unverified passwords are replaced after email proof. Verified/Google accounts are never linked here.
      if (existing.emailVerified || existing.accounts.length)
        return {
          success: false as const,
          error: "Esta conta já existe. Entre pelo método usado no cadastro.",
        };
      const replaced = await prisma.user.updateMany({
        where: { id: existing.id, emailVerified: null, accounts: { none: {} } },
        data: { passwordHash: data.passwordHash, emailVerified: new Date() },
      });
      if (!replaced.count)
        return {
          success: false as const,
          error: "A conta já foi confirmada. Entre com seu método original.",
        };
    } else {
      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: data.passwordHash,
          emailVerified: new Date(),
        },
      });
    }
    return { success: true as const };
  });
}

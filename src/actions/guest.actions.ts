"use server";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { guestIdentifySchema } from "@/schemas/guest.schema";
import {
  createGuestSession,
  revokeGuestSession,
  getCurrentGuest,
} from "@/lib/guest-session";
import { issueChallenge, consumeChallenge } from "@/lib/identity-challenge";
import { takeRateLimit } from "@/lib/rate-limit";
import { withErrorHandling } from "@/lib/logger";

type IdentifyResult =
  | { success: true; verificationRequired?: boolean; guestName?: string }
  | { success: false; error: string };
export async function identifyGuestAction(
  formData: FormData,
): Promise<IdentifyResult> {
  return withErrorHandling("identifyGuest", async () => {
    const parsed = guestIdentifySchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success)
      return {
        success: false as const,
        error: parsed.error.issues[0]?.message ?? "Confira seus dados.",
      };

    const requestHeaders = await headers();
    const ip =
      requestHeaders.get("x-vercel-forwarded-for") ??
      requestHeaders.get("x-forwarded-for") ??
      "unknown";
    if (!(await takeRateLimit("guest-identify-ip", ip, 60, 900)))
      return {
        success: false as const,
        error: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
      };

    // New guests can proceed immediately. A previously registered email must
    // still be verified: otherwise knowing it would grant access to old gifts,
    // Pix declarations and messages.
    const existing = await prisma.guest.findUnique({
      where: { email: parsed.data.email },
      select: { id: true },
    });
    if (!existing) {
      let guest;
      try {
        guest = await prisma.guest.create({ data: parsed.data });
      } catch (error) {
        // A concurrent request may have registered this email first.
        const target =
          error instanceof Prisma.PrismaClientKnownRequestError
            ? error.meta?.target
            : undefined;
        if (
          !(error instanceof Prisma.PrismaClientKnownRequestError) ||
          error.code !== "P2002" ||
          !Array.isArray(target) ||
          !target.includes("email")
        )
          throw error;
      }
      if (guest) {
        await createGuestSession(guest.id);
        return { success: true as const, guestName: guest.name };
      }
    }

    const sent = await issueChallenge(parsed.data.email, {
      purpose: "guest",
      ...parsed.data,
    });
    return sent
      ? { success: true as const, verificationRequired: true }
      : {
          success: false as const,
          error:
            "Não foi possível enviar o código. Aguarde alguns minutos e tente novamente. Seu acesso depende da confirmação por e-mail.",
        };
  });
}
export async function verifyGuestAction(
  formData: FormData,
): Promise<IdentifyResult> {
  return withErrorHandling("verifyGuest", async () => {
    const data = await consumeChallenge(formData.get("code"), "guest");
    if (!data)
      return {
        success: false as const,
        error: "Código inválido ou expirado. Solicite outro código.",
      };
    // Only verified recovery may update the existing guest's contact details.
    const guest = await prisma.guest.upsert({
      where: { email: data.email },
      create: { email: data.email, name: data.name, phone: data.phone },
      update: { name: data.name, phone: data.phone },
    });
    // An email may have first been entered by someone else without proof.
    // After genuine ownership is verified, revoke all previous guest sessions.
    await prisma.guestSession.deleteMany({ where: { guestId: guest.id } });
    await createGuestSession(guest.id);
    return { success: true as const, guestName: guest.name };
  });
}
export async function forgetGuestAction(): Promise<{ success: true }> {
  await revokeGuestSession();
  return { success: true };
}
export async function getIdentifiedGuestNameAction(): Promise<string | null> {
  return (await getCurrentGuest())?.name ?? null;
}

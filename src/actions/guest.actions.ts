"use server";
import { prisma } from "@/lib/prisma";
import { guestIdentifySchema } from "@/schemas/guest.schema";
import {
  createGuestSession,
  revokeGuestSession,
  getCurrentGuest,
} from "@/lib/guest-session";
import { issueChallenge, consumeChallenge } from "@/lib/identity-challenge";
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
    // Recovery proves email ownership; it never renames an existing guest from unverified input.
    const guest = await prisma.guest.upsert({
      where: { email: data.email },
      create: { email: data.email, name: data.name, phone: data.phone },
      update: {},
    });
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

"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { guestIdentifySchema } from "@/schemas/guest.schema";
import { GUEST_COOKIE_NAME, GUEST_COOKIE_MAX_AGE_SECONDS, getCurrentGuest } from "@/lib/guest-session";

type IdentifyResult = { success: true; guestName: string } | { success: false; error: string };

/**
 * Identifica o convidado por nome + e-mail + telefone (sem senha) e guarda
 * um cookie httpOnly para lembrá-lo neste navegador.
 *
 * Se o e-mail já existir com um telefone DIFERENTE, recusamos — é a única
 * checagem de identidade que temos nesse modelo simplificado, então vale
 * mantê-la (impede que alguém troque só o e-mail e assuma o nome de outro
 * convidado, mesmo sem senha).
 */
export async function identifyGuestAction(formData: FormData): Promise<IdentifyResult> {
  const parsed = guestIdentifySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { name, email, phone } = parsed.data;

  try {
    const existing = await prisma.guest.findUnique({ where: { email } });

    let guest;
    if (existing) {
      if (existing.phone !== phone) {
        return {
          success: false,
          error:
            "Esse e-mail já está cadastrado com outro telefone. Confira os dados ou avise o anfitrião.",
        };
      }
      guest = existing.name === name ? existing : await prisma.guest.update({
        where: { id: existing.id },
        data: { name },
      });
    } else {
      guest = await prisma.guest.create({ data: { name, email, phone } });
    }

    cookies().set(GUEST_COOKIE_NAME, guest.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: GUEST_COOKIE_MAX_AGE_SECONDS,
    });

    return { success: true, guestName: guest.name };
  } catch (error) {
    logger.error("identifyGuest", error, { email });
    return { success: false, error: "Não foi possível identificar você agora. Tente novamente." };
  }
}

/** "Trocar" — esquece o convidado identificado neste navegador. */
export async function forgetGuestAction(): Promise<{ success: true }> {
  cookies().delete(GUEST_COOKIE_NAME);
  return { success: true };
}

export async function getIdentifiedGuestNameAction(): Promise<string | null> {
  const guest = await getCurrentGuest();
  return guest?.name ?? null;
}

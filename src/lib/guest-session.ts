import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const GUEST_COOKIE_NAME = "guest_id";
export const GUEST_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 dias

/**
 * Lê o convidado identificado a partir do cookie httpOnly.
 * Uso em Server Components e Server Actions (leitura). Nunca lança —
 * cookie ausente ou apontando pra um Guest que não existe mais só
 * significa "ninguém identificado".
 */
export async function getCurrentGuest() {
  const guestId = cookies().get(GUEST_COOKIE_NAME)?.value;
  if (!guestId) return null;

  return prisma.guest.findUnique({ where: { id: guestId } });
}

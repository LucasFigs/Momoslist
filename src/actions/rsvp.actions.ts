"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentGuest } from "@/lib/guest-session";
import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/email";
import { rsvpConfirmationEmail } from "@/lib/email-templates";
import { rsvpSchema, type RsvpInput } from "@/schemas/rsvp.schema";

type SimpleResult = { success: true } | { success: false; error: string };

// ---------------------------------------------------------------------------
// Convidado
// ---------------------------------------------------------------------------

/**
 * Registra (ou atualiza) a confirmação de presença do convidado identificado. Uma resposta por lista:
 * responder de novo troca a anterior — é assim que a pessoa "altera" ou muda para "não vou".
 */
export async function saveRsvpAction(eventId: string, input: RsvpInput): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se para confirmar sua presença." };

  const parsed = rsvpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Confira os dados informados." };
  }

  // A regra vale no servidor (não só na tela): lista publicada e confirmações ligadas pelo casal.
  // Já carrega tudo que o e-mail de confirmação precisa, para não fazer uma segunda consulta depois.
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      published: true,
      rsvpEnabled: true,
      title: true,
      slug: true,
      secureToken: true,
      themeColor: true,
      theme: true,
      eventDate: true,
      locationName: true,
    },
  });
  if (!event || !event.published || !event.rsvpEnabled) {
    return { success: false, error: "As confirmações de presença não estão abertas para esta lista." };
  }

  try {
    await prisma.rsvp.upsert({
      where: { eventId_guestId: { eventId, guestId: guest.id } },
      create: { eventId, guestId: guest.id, ...parsed.data },
      update: parsed.data,
    });
  } catch (error) {
    logger.error("saveRsvp", error, { eventId, guestId: guest.id });
    return { success: false, error: "Não foi possível salvar agora. Tente novamente." };
  }

  // E-mail de cortesia: nunca bloqueia a resposta do convidado se falhar (ver lib/email.ts).
  const { email: guestEmail, name: guestName } = guest;
  await sendEmail({
    to: guestEmail,
    ...rsvpConfirmationEmail({
      guestName,
      event,
      answer: { status: parsed.data.status, companionAdults: parsed.data.companionAdults, companionChildren: parsed.data.companionChildren },
    }),
  });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

// ---------------------------------------------------------------------------
// Casal
// ---------------------------------------------------------------------------

async function requireOwnedEvent(eventId: string) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, error: "Você precisa estar logado." };

  const event = await prisma.event.findUnique({ where: { id: eventId }, select: { ownerId: true } });
  if (!event || event.ownerId !== session.user.id) return { ok: false as const, error: "Lista não encontrada." };
  return { ok: true as const };
}

/** Liga/desliga o recebimento de confirmações. Desligar NÃO apaga as respostas já recebidas. */
export async function setRsvpEnabledAction(eventId: string, enabled: boolean): Promise<SimpleResult> {
  const owned = await requireOwnedEvent(eventId);
  if (!owned.ok) return { success: false, error: owned.error };

  await prisma.event.update({ where: { id: eventId }, data: { rsvpEnabled: enabled } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

/** Remove uma resposta (ex.: duplicada ou de alguém que pediu para sair da contagem). */
export async function deleteRsvpAction(rsvpId: string): Promise<SimpleResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const rsvp = await prisma.rsvp.findUnique({
    where: { id: rsvpId },
    select: { eventId: true, event: { select: { ownerId: true } } },
  });
  if (!rsvp || rsvp.event.ownerId !== session.user.id) return { success: false, error: "Resposta não encontrada." };

  await prisma.rsvp.delete({ where: { id: rsvpId } });

  revalidatePath(`/dashboard/eventos/${rsvp.eventId}`);
  return { success: true };
}

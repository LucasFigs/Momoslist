"use server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getCurrentGuest } from "@/lib/guest-session";
import { takeRateLimit } from "@/lib/rate-limit";
import { parseMessage } from "@/schemas/message.schema";
import { withErrorHandling } from "@/lib/logger";
type Result = { success: true } | { success: false; error: string };
async function refresh(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { slug: true, secureToken: true },
  });
  revalidatePath(`/dashboard/eventos/${eventId}`);
  if (event) revalidatePath(`/lista/${event.slug}-${event.secureToken}`);
}
/** One independent message per guest/event; retries update it rather than creating duplicates. */
export async function saveEventMessageAction(
  eventId: string,
  message: string,
  isPublic: boolean,
): Promise<Result> {
  return withErrorHandling("saveEventMessage", async () => {
    const guest = await getCurrentGuest();
    if (!guest)
      return {
        success: false as const,
        error: "Identifique-se para deixar um recadinho.",
      };
    const note = parseMessage(message);
    if (!note.ok || !note.value || typeof isPublic !== "boolean")
      return {
        success: false as const,
        error:
          "Escreva um recadinho de até 500 caracteres e escolha quem pode ler.",
      };
    if (!(await takeRateLimit("message", guest.id, 5, 300)))
      return {
        success: false as const,
        error: "Aguarde alguns minutos antes de enviar novamente.",
      };
    const messageText = note.value;
    return await prisma
      .$transaction(
        async (tx) => {
          const event = await tx.event.findFirst({
            where: { id: eventId, published: true },
            select: { id: true },
          });
          if (!event)
            return {
              success: false as const,
              error: "Esta lista não está recebendo recadinhos.",
            };
          await tx.eventMessage.upsert({
            where: { eventId_guestId: { eventId, guestId: guest.id } },
            create: {
              eventId,
              guestId: guest.id,
              message: messageText,
              public: isPublic,
            },
            // An edit cannot undo organizer moderation.
            update: { message: messageText, public: isPublic },
          });
          return { success: true as const };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      )
      .then(async (result) => {
        if (result.success) await refresh(eventId);
        return result;
      });
  });
}
export async function deleteEventMessageAction(
  eventId: string,
): Promise<Result> {
  return withErrorHandling("deleteEventMessage", async () => {
    const guest = await getCurrentGuest();
    if (!guest)
      return { success: false as const, error: "Identifique-se novamente." };
    await prisma.eventMessage.deleteMany({
      where: { eventId, guestId: guest.id },
    });
    await refresh(eventId);
    return { success: true as const };
  });
}
/** Namespaced IDs prevent mixing reservations, contributions and independent notes. */
export async function moderateMessageAction(
  eventId: string,
  itemId: string,
  hidden: boolean,
): Promise<Result> {
  return withErrorHandling("moderateMessage", async () => {
    const session = await auth();
    if (!session?.user?.id || typeof hidden !== "boolean")
      return { success: false as const, error: "Acesso não autorizado." };
    const owned = await prisma.event.findFirst({
      where: { id: eventId, ownerId: session.user.id },
      select: { id: true },
    });
    if (!owned)
      return { success: false as const, error: "Lista não encontrada." };
    const id = itemId.slice(2);
    let count = 0;
    if (itemId.startsWith("m-"))
      count = (
        await prisma.eventMessage.updateMany({
          where: { id, eventId },
          data: { hidden },
        })
      ).count;
    if (itemId.startsWith("r-"))
      count = (
        await prisma.giftReservation.updateMany({
          where: { id, gift: { eventId } },
          data: { messageHidden: hidden },
        })
      ).count;
    if (itemId.startsWith("c-"))
      count = (
        await prisma.contribution.updateMany({
          where: { id, gift: { eventId } },
          data: { messageHidden: hidden },
        })
      ).count;
    if (!count)
      return {
        success: false as const,
        error: "Recadinho não encontrado nesta lista.",
      };
    await refresh(eventId);
    return { success: true as const };
  });
}

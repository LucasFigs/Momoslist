"use server";

import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPixPayload } from "@/lib/pix-payload";
import { logger } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";
import { parseMessage } from "@/schemas/message.schema";

type SimpleResult = { success: true } | { success: false; error: string };

export type PaymentDetails =
  | { kind: "EXTERNAL_PURCHASE"; purchaseUrl: string | null; giftName: string; message: string | null }
  | {
      kind: "PIX";
      giftName: string;
      message: string | null;
      amountLabel: string;
      hostName: string;
      pixKey: string;
      pixKeyType: string;
      copyPasteCode: string;
      qrCodeDataUrl: string | null;
    };

/**
 * Devolve os dados de pagamento da reserva. A chave Pix só sai daqui se quem
 * pediu for o próprio dono de uma reserva ativa com método PIX — ou seja, ela
 * nunca fica exposta na página pública antes de ser realmente necessária.
 */
export async function getPaymentDetailsAction(
  reservationId: string
): Promise<{ success: true; details: PaymentDetails } | { success: false; error: string }> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: { include: { owner: { select: { name: true } } } } } } },
  });

  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }

  if (!["CONFIRMED", "COMPLETED"].includes(reservation.status)) {
    return { success: false, error: "Essa reserva não está ativa." };
  }

  const { gift } = reservation;
  const { event } = gift;

  if (reservation.paymentMethod === "EXTERNAL_PURCHASE") {
    return {
      success: true,
      details: {
        kind: "EXTERNAL_PURCHASE",
        purchaseUrl: gift.purchaseUrl,
        giftName: gift.name,
        message: reservation.message,
      },
    };
  }

  if (reservation.paymentMethod === "PIX") {
    if (!event.pixKey || !event.pixKeyType) {
      return {
        success: false,
        error:
          gift.kind === "PIX"
            ? "O anfitrião ainda não cadastrou uma chave Pix. Avise-o para conseguir concluir este presente."
            : "O anfitrião ainda não cadastrou uma chave Pix. Escolha comprar em uma loja.",
      };
    }

    const hostName = event.owner.name?.trim() || event.title;
    const copyPasteCode = buildPixPayload({
      pixKey: event.pixKey,
      merchantName: hostName,
      amountInCents: gift.priceInCents,
    });

    let qrCodeDataUrl: string | null = null;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(copyPasteCode, { width: 280, margin: 1 });
    } catch (error) {
      // Se a geração do QR falhar, o Copia e Cola sozinho já resolve.
      logger.error("pixQrCode", error, { reservationId });
      qrCodeDataUrl = null;
    }

    return {
      success: true,
      details: {
        kind: "PIX",
        giftName: gift.name,
        message: reservation.message,
        amountLabel: (gift.priceInCents / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        hostName,
        pixKey: event.pixKey,
        pixKeyType: event.pixKeyType,
        qrCodeDataUrl,
        copyPasteCode,
      },
    };
  }

  return { success: false, error: "Método de pagamento não definido." };
}

/** Convidado informa que comprou o presente na loja externa. */
export async function confirmExternalPurchaseAction(
  reservationId: string,
  message?: string
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "EXTERNAL_PURCHASE") {
    return { success: false, error: "Essa reserva não é de compra em loja." };
  }
  if (reservation.status !== "CONFIRMED") {
    return { success: false, error: "Essa reserva não pode mais ser atualizada." };
  }

  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: {
      status: "COMPLETED",
      purchaseConfirmedAt: new Date(),
      // Recadinho em branco não apaga um que já exista: só "salvar recadinho" edita ou remove.
      ...(note.value && { message: note.value, messageAt: new Date() }),
    },
  });

  return { success: true };
}

/** Convidado declara que fez o Pix — ainda depende da confirmação manual do anfitrião. */
export async function declarePixPaymentAction(reservationId: string, message?: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return { success: false, error: "Essa reserva não é de pagamento via Pix." };
  }
  if (reservation.status !== "CONFIRMED") {
    return { success: false, error: "Essa reserva não pode mais ser atualizada." };
  }

  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: {
      pixStatus: "DECLARED",
      pixDeclaredAt: new Date(),
      ...(note.value && { message: note.value, messageAt: new Date() }),
    },
  });

  return { success: true };
}

/**
 * Adiciona, edita ou remove (texto vazio) o recadinho de uma reserva ativa, mesmo depois de avisar o Pix ou a
 * compra. Só o próprio convidado pode, e só enquanto a reserva não foi cancelada nem expirou.
 */
export async function saveReservationMessageAction(reservationId: string, message: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { select: { eventId: true } } },
  });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (!["CONFIRMED", "COMPLETED"].includes(reservation.status)) {
    return { success: false, error: "Essa reserva não está ativa." };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: { message: note.value, messageAt: note.value ? new Date() : null },
  });

  revalidatePath(`/dashboard/eventos/${reservation.gift.eventId}`);
  return { success: true };
}

/** Anfitrião confirma que recebeu o Pix — só o dono da lista pode fazer isso. */
export async function confirmPixReceivedAction(reservationId: string): Promise<SimpleResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });

  if (!reservation || reservation.gift.event.ownerId !== session.user.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return { success: false, error: "Essa reserva não é de pagamento via Pix." };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: {
      pixStatus: "CONFIRMED",
      pixConfirmedAt: new Date(),
      status: "COMPLETED",
    },
  });

  return { success: true };
}

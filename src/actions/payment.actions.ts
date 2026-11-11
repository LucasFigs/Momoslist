"use server";

import { sendEmail } from "@/lib/email";
import { giftReservedEmail } from "@/lib/email-templates";
import { formatCentsToBRL } from "@/lib/utils";
import { safeStoreUrl } from "@/lib/store-url";
import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPixPayload } from "@/lib/pix-payload";
import { logger, withErrorHandling } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";
import { parseMessage } from "@/schemas/message.schema";

type SimpleResult = { success: true } | { success: false; error: string };

export type PaymentDetails =
  | {
      kind: "EXTERNAL_PURCHASE";
      purchaseUrl: string | null;
      giftName: string;
      message: string | null;
      messagePublic: boolean;
      received: boolean;
    }
  | {
      kind: "PIX";
      giftName: string;
      message: string | null;
      messagePublic: boolean;
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
async function getPaymentDetailsActionImpl(
  reservationId: string,
): Promise<
  { success: true; details: PaymentDetails } | { success: false; error: string }
> {
  const guest = await getCurrentGuest();
  if (!guest)
    return {
      success: false,
      error: "Identifique-se novamente para continuar.",
    };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: {
      gift: {
        include: { event: { include: { owner: { select: { name: true } } } } },
      },
    },
  });

  if (
    !reservation ||
    reservation.guestId !== guest.id ||
    !reservation.gift.event.published
  ) {
    return { success: false, error: "Reserva não encontrada." };
  }

  if (
    reservation.status === "TEMPORARY" &&
    reservation.paymentMethod &&
    reservation.expiresAt > new Date()
  ) {
    const exposed = await prisma.giftReservation.updateMany({
      where: {
        id: reservationId,
        guestId: guest.id,
        status: "TEMPORARY",
        paymentMethod: reservation.paymentMethod,
        expiresAt: { gt: new Date() },
        gift: { event: { published: true } },
      },
      data: { status: "CONFIRMED" },
    });
    if (!exposed.count)
      return {
        success: false,
        error: "Sua reserva expirou ou mudou. Atualize a página.",
      };
    reservation.status = "CONFIRMED";
    await sendEmail({
      to: guest.email,
      ...giftReservedEmail({
        guestName: guest.name,
        event: reservation.gift.event,
        giftName: reservation.gift.name,
        priceLabel: formatCentsToBRL(
          reservation.amountInCents ?? reservation.gift.priceInCents,
        ),
        paymentMethod: reservation.paymentMethod,
        purchaseUrl: safeStoreUrl(reservation.gift.purchaseUrl),
      }),
    });
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
        received: Boolean(reservation.receivedAt),
        purchaseUrl: safeStoreUrl(gift.purchaseUrl),
        giftName: gift.name,
        message: reservation.message,
        messagePublic: reservation.messagePublic,
      },
    };
  }

  if (reservation.paymentMethod === "PIX") {
    if (!event.pixKey || !event.pixKeyType) {
      return {
        success: false,
        error:
          gift.kind === "PIX"
            ? "O casal ainda não cadastrou uma chave Pix. Avise o casal para conseguir concluir este presente."
            : "O casal ainda não cadastrou uma chave Pix. Escolha comprar em uma loja.",
      };
    }

    const hostName = event.owner.name?.trim() || event.title;
    const copyPasteCode = buildPixPayload({
      pixKey: event.pixKey,
      merchantName: hostName,
      amountInCents: reservation.amountInCents ?? gift.priceInCents,
    });

    let qrCodeDataUrl: string | null = null;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(copyPasteCode, {
        width: 280,
        margin: 1,
      });
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
        messagePublic: reservation.messagePublic,
        amountLabel: (
          (reservation.amountInCents ?? gift.priceInCents) / 100
        ).toLocaleString("pt-BR", {
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
async function confirmExternalPurchaseActionImpl(
  reservationId: string,
  message?: string,
  messagePublic = false,
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest)
    return {
      success: false,
      error: "Identifique-se novamente para continuar.",
    };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });
  if (
    !reservation ||
    reservation.guestId !== guest.id ||
    !reservation.gift.event.published
  ) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "EXTERNAL_PURCHASE") {
    return { success: false, error: "Essa reserva não é de compra em loja." };
  }
  if (reservation.status !== "CONFIRMED") {
    return {
      success: false,
      error: "Essa reserva não pode mais ser atualizada.",
    };
  }

  if (typeof messagePublic !== "boolean")
    return { success: false, error: "Visibilidade inválida." };
  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  const changed = await prisma.giftReservation.updateMany({
    where: {
      id: reservationId,
      status: reservation.status,
      pixStatus: reservation.pixStatus,
      paymentMethod: reservation.paymentMethod,
      gift: {
        event: { ownerId: reservation.gift.event.ownerId, published: true },
      },
    },
    data: {
      status: "COMPLETED",
      purchaseConfirmedAt: new Date(),
      // Recadinho em branco não apaga um que já exista: só "salvar recadinho" edita ou remove.
      ...(note.value && {
        message: note.value,
        messagePublic,
        messageAt: new Date(),
      }),
    },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A operação mudou. Atualize a página e tente novamente.",
    };
  return { success: true };
}

/** Convidado declara que fez o Pix — ainda depende da confirmação manual do casal. */
async function declarePixPaymentActionImpl(
  reservationId: string,
  message?: string,
  messagePublic = false,
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest)
    return {
      success: false,
      error: "Identifique-se novamente para continuar.",
    };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });
  if (
    !reservation ||
    reservation.guestId !== guest.id ||
    !reservation.gift.event.published
  ) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return {
      success: false,
      error: "Essa reserva não é de pagamento via Pix.",
    };
  }
  if (reservation.status !== "CONFIRMED") {
    return {
      success: false,
      error: "Essa reserva não pode mais ser atualizada.",
    };
  }

  if (reservation.pixStatus !== "NOT_DECLARED")
    return reservation.pixStatus === "DECLARED" ||
      reservation.pixStatus === "CONFIRMED"
      ? { success: true }
      : { success: false, error: "Este Pix não pode ser informado." };

  if (typeof messagePublic !== "boolean")
    return { success: false, error: "Visibilidade inválida." };
  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  const changed = await prisma.giftReservation.updateMany({
    where: {
      id: reservationId,
      status: reservation.status,
      pixStatus: reservation.pixStatus,
      paymentMethod: reservation.paymentMethod,
      gift: {
        event: { ownerId: reservation.gift.event.ownerId, published: true },
      },
    },
    data: {
      pixStatus: "DECLARED",
      pixDeclaredAt: new Date(),
      ...(note.value && {
        message: note.value,
        messagePublic,
        messageAt: new Date(),
      }),
    },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A operação mudou. Atualize a página e tente novamente.",
    };
  return { success: true };
}

/**
 * Adiciona, edita ou remove (texto vazio) o recadinho de uma reserva ativa, mesmo depois de avisar o Pix ou a
 * compra. Só o próprio convidado pode, e só enquanto a reserva não foi cancelada nem expirou.
 */
async function saveReservationMessageActionImpl(
  reservationId: string,
  message: string,
  messagePublic = false,
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest)
    return {
      success: false,
      error: "Identifique-se novamente para continuar.",
    };

  if (typeof messagePublic !== "boolean")
    return { success: false, error: "Visibilidade inválida." };
  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });
  if (
    !reservation ||
    reservation.guestId !== guest.id ||
    !reservation.gift.event.published
  ) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (!["CONFIRMED", "COMPLETED"].includes(reservation.status)) {
    return { success: false, error: "Essa reserva não está ativa." };
  }

  const changed = await prisma.giftReservation.updateMany({
    where: {
      id: reservationId,
      status: reservation.status,
      pixStatus: reservation.pixStatus,
      paymentMethod: reservation.paymentMethod,
      gift: {
        event: { ownerId: reservation.gift.event.ownerId, published: true },
      },
    },
    data: {
      message: note.value,
      messagePublic,
      messageAt: note.value ? new Date() : null,
    },
  });

  revalidatePath(`/dashboard/eventos/${reservation.gift.eventId}`);
  if (!changed.count)
    return {
      success: false,
      error: "A operação mudou. Atualize a página e tente novamente.",
    };
  return { success: true };
}

/** O casal confirma que recebeu o Pix — só o dono da lista pode fazer isso. */
async function confirmPixReceivedActionImpl(
  reservationId: string,
): Promise<SimpleResult> {
  const session = await auth();
  if (!session?.user?.id)
    return { success: false, error: "Você precisa estar logado." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });

  if (!reservation || reservation.gift.event.ownerId !== session.user.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return {
      success: false,
      error: "Essa reserva não é de pagamento via Pix.",
    };
  }

  if (
    reservation.status === "COMPLETED" &&
    reservation.pixStatus === "CONFIRMED"
  )
    return { success: true };
  if (
    reservation.status !== "CONFIRMED" ||
    reservation.pixStatus !== "DECLARED"
  )
    return {
      success: false,
      error: "Este Pix não está aguardando confirmação.",
    };

  const changed = await prisma.giftReservation.updateMany({
    where: {
      id: reservationId,
      status: reservation.status,
      pixStatus: reservation.pixStatus,
      paymentMethod: reservation.paymentMethod,
      gift: { event: { ownerId: reservation.gift.event.ownerId } },
    },
    data: {
      pixStatus: "CONFIRMED",
      pixConfirmedAt: new Date(),
      status: "COMPLETED",
    },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A operação mudou. Atualize a página e tente novamente.",
    };
  return { success: true };
}

/**
 * O casal confirma que recebeu (em mãos ou na entrega) um presente comprado em loja — diferente do Pix, essa
 * confirmação não depende do convidado ter avisado nada antes: o casal pode confirmar assim que o presente
 * chegar, mesmo que o convidado nunca tenha marcado "já comprei".
 */
async function confirmExternalPurchaseReceivedActionImpl(
  reservationId: string,
): Promise<SimpleResult> {
  const session = await auth();
  if (!session?.user?.id)
    return { success: false, error: "Você precisa estar logado." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });

  if (!reservation || reservation.gift.event.ownerId !== session.user.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "EXTERNAL_PURCHASE") {
    return { success: false, error: "Essa reserva não é de compra em loja." };
  }
  if (
    !["CONFIRMED", "COMPLETED"].includes(reservation.status) ||
    reservation.receivedAt
  ) {
    return {
      success: false,
      error: "Essa reserva não está aguardando confirmação.",
    };
  }

  const changed = await prisma.giftReservation.updateMany({
    where: {
      id: reservationId,
      status: reservation.status,
      pixStatus: reservation.pixStatus,
      paymentMethod: reservation.paymentMethod,
      gift: { event: { ownerId: reservation.gift.event.ownerId } },
    },
    data: {
      status: "COMPLETED",
      receivedAt: new Date(),
    },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A operação mudou. Atualize a página e tente novamente.",
    };
  return { success: true };
}

/**
 * O casal informa que NÃO recebeu o Pix que o convidado declarou (não caiu, valor errado, engano etc.).
 * Cancela a reserva — o presente volta a ficar disponível para outra pessoa —, em vez de só "desmarcar"
 * o Pix, porque manter a reserva travada por um pagamento que nunca chegou deixaria o item preso sem motivo.
 */
async function rejectPixReceivedActionImpl(
  reservationId: string,
): Promise<SimpleResult> {
  const session = await auth();
  if (!session?.user?.id)
    return { success: false, error: "Você precisa estar logado." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });

  if (!reservation || reservation.gift.event.ownerId !== session.user.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return {
      success: false,
      error: "Essa reserva não é de pagamento via Pix.",
    };
  }
  if (reservation.pixStatus !== "DECLARED") {
    return {
      success: false,
      error: "Esse Pix não está aguardando confirmação.",
    };
  }

  const changed = await prisma.giftReservation.updateMany({
    where: {
      id: reservationId,
      status: reservation.status,
      pixStatus: reservation.pixStatus,
      paymentMethod: reservation.paymentMethod,
      gift: { event: { ownerId: reservation.gift.event.ownerId } },
    },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      pixStatus: "NOT_DECLARED",
    },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A operação mudou. Atualize a página e tente novamente.",
    };
  return { success: true };
}

export async function getPaymentDetailsAction(
  reservationId: string,
): Promise<
  { success: true; details: PaymentDetails } | { success: false; error: string }
> {
  return withErrorHandling("getPaymentDetailsAction", () =>
    getPaymentDetailsActionImpl(reservationId),
  );
}

export async function confirmExternalPurchaseAction(
  reservationId: string,
  message?: string,
  messagePublic = false,
): Promise<SimpleResult> {
  return withErrorHandling("confirmExternalPurchaseAction", () =>
    confirmExternalPurchaseActionImpl(reservationId, message, messagePublic),
  );
}

export async function declarePixPaymentAction(
  reservationId: string,
  message?: string,
  messagePublic = false,
): Promise<SimpleResult> {
  return withErrorHandling("declarePixPaymentAction", () =>
    declarePixPaymentActionImpl(reservationId, message, messagePublic),
  );
}

export async function saveReservationMessageAction(
  reservationId: string,
  message: string,
  messagePublic = false,
): Promise<SimpleResult> {
  return withErrorHandling("saveReservationMessageAction", () =>
    saveReservationMessageActionImpl(reservationId, message, messagePublic),
  );
}

export async function confirmPixReceivedAction(
  reservationId: string,
): Promise<SimpleResult> {
  return withErrorHandling("confirmPixReceivedAction", () =>
    confirmPixReceivedActionImpl(reservationId),
  );
}

export async function confirmExternalPurchaseReceivedAction(
  reservationId: string,
): Promise<SimpleResult> {
  return withErrorHandling("confirmExternalPurchaseReceivedAction", () =>
    confirmExternalPurchaseReceivedActionImpl(reservationId),
  );
}

export async function rejectPixReceivedAction(
  reservationId: string,
): Promise<SimpleResult> {
  return withErrorHandling("rejectPixReceivedAction", () =>
    rejectPixReceivedActionImpl(reservationId),
  );
}

/** Explicit owner-reviewed release only. Never auto-release a potentially paid reservation. */
export async function releaseUnpaidReservationAction(
  reservationId: string,
): Promise<SimpleResult> {
  return withErrorHandling("releaseUnpaidReservation", async () => {
    const session = await auth();
    if (!session?.user?.id)
      return {
        success: false as const,
        error: "Você precisa estar conectado.",
      };
    const changed = await prisma.giftReservation.updateMany({
      where: {
        id: reservationId,
        status: { in: ["TEMPORARY", "CONFIRMED"] },
        pixStatus: { in: ["NOT_DECLARED", "NOT_APPLICABLE"] },
        receivedAt: null,
        purchaseConfirmedAt: null,
        gift: { event: { ownerId: session.user.id } },
      },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });
    if (!changed.count)
      return {
        success: false as const,
        error:
          "A reserva mudou ou já tem pagamento/compra informado. Confira antes de ajustar.",
      };
    revalidatePath("/dashboard");
    return { success: true as const };
  });
}

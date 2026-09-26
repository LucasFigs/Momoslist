"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RESERVATION_TIMEOUT_MINUTES, formatCentsToBRL } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";
import { sendEmail } from "@/lib/email";
import { giftReservedEmail } from "@/lib/email-templates";

type ReservationSummary = {
  id: string;
  status: "TEMPORARY" | "CONFIRMED";
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX" | null;
  expiresAt: string;
};

type ActionResult =
  | { success: true; reservation: ReservationSummary }
  | { success: false; error: string };

type SimpleResult = { success: true } | { success: false; error: string };

/**
 * Cria uma reserva temporária para o presente, dentro de uma transação
 * SERIALIZABLE: se dois convidados tentarem reservar a última unidade ao
 * mesmo tempo, o Postgres garante que só uma das transações seja aceita — a
 * outra falha com erro de serialização e recebe "presente indisponível".
 */
export async function createReservationAction(giftId: string): Promise<ActionResult> {
  const guest = await getCurrentGuest();
  if (!guest) {
    return { success: false, error: "Identifique-se para escolher um presente." };
  }
  const guestId = guest.id;

  try {
    const reservation = await prisma.$transaction(
      async (tx) => {
        const now = new Date();

        // 1. Expira reservas temporárias vencidas antes de contar disponibilidade.
        await tx.giftReservation.updateMany({
          where: { giftId, status: "TEMPORARY", expiresAt: { lt: now } },
          data: { status: "EXPIRED" },
        });

        // 2. Se o próprio convidado já tem uma reserva ativa deste presente, reaproveita.
        const existingMine = await tx.giftReservation.findFirst({
          where: { giftId, guestId, status: { in: ["TEMPORARY", "CONFIRMED"] } },
        });
        if (existingMine) return existingMine;

        const gift = await tx.gift.findUnique({ where: { id: giftId } });
        if (!gift) throw new Error("GIFT_NOT_FOUND");
        // Vaquinha não se "reserva": a participação é por contribuição (contribution.actions).
        if (gift.kind === "FUND") throw new Error("NOT_RESERVABLE");

        // 3. Conta reservas ativas de TODOS os convidados e compara com a quantidade.
        const activeCount = await tx.giftReservation.count({
          where: { giftId, status: { in: ["TEMPORARY", "CONFIRMED", "COMPLETED"] } },
        });

        if (activeCount >= gift.quantity) {
          throw new Error("UNAVAILABLE");
        }

        return tx.giftReservation.create({
          data: {
            giftId,
            guestId,
            status: "TEMPORARY",
            expiresAt: new Date(now.getTime() + RESERVATION_TIMEOUT_MINUTES * 60_000),
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );

    return {
      success: true,
      reservation: {
        id: reservation.id,
        status: reservation.status as "TEMPORARY" | "CONFIRMED",
        paymentMethod: reservation.paymentMethod,
        expiresAt: reservation.expiresAt.toISOString(),
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "UNAVAILABLE") {
      return { success: false, error: "Esse presente acabou de ser escolhido por outra pessoa." };
    }
    if (message === "NOT_RESERVABLE") {
      return { success: false, error: "Este item é uma vaquinha: use o botão Contribuir." };
    }
    if (message === "GIFT_NOT_FOUND") {
      return { success: false, error: "Presente não encontrado." };
    }
    // Erro de serialização do Postgres (conflito de concorrência) cai aqui.
    logger.error("createReservation", err, { giftId, guestId });
    return { success: false, error: "Não foi possível reservar agora. Tente novamente." };
  }
}

/** Convidado escolhe o método (loja externa ou Pix) e confirma — a reserva vira definitiva. */
export async function confirmReservationMethodAction(
  reservationId: string,
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX"
): Promise<ActionResult> {
  const guest = await getCurrentGuest();
  if (!guest) {
    return { success: false, error: "Identifique-se novamente para continuar." };
  }

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }

  // Item do tipo Pix ainda não tem loja definida: a única forma de presentear é o Pix.
  if (reservation.gift.kind === "PIX" && paymentMethod === "EXTERNAL_PURCHASE") {
    return { success: false, error: "Este item é pago apenas por Pix." };
  }

  if (reservation.status !== "TEMPORARY") {
    return { success: false, error: "Essa reserva não está mais disponível para confirmação." };
  }

  if (reservation.expiresAt < new Date()) {
    await prisma.giftReservation.update({ where: { id: reservationId }, data: { status: "EXPIRED" } });
    return { success: false, error: "Sua reserva expirou. Escolha o presente novamente." };
  }

  const updated = await prisma.giftReservation.update({
    where: { id: reservationId },
    data: {
      status: "CONFIRMED",
      paymentMethod,
      pixStatus: paymentMethod === "PIX" ? "NOT_DECLARED" : "NOT_APPLICABLE",
    },
  });

  // E-mail de cortesia: nunca bloqueia a confirmação da reserva se falhar (ver lib/email.ts).
  await sendEmail({
    to: guest.email,
    ...giftReservedEmail({
      guestName: guest.name,
      event: reservation.gift.event,
      giftName: reservation.gift.name,
      priceLabel: formatCentsToBRL(reservation.gift.priceInCents),
      paymentMethod,
      purchaseUrl: reservation.gift.purchaseUrl,
    }),
  });

  return {
    success: true,
    reservation: {
      id: updated.id,
      status: "CONFIRMED",
      paymentMethod: updated.paymentMethod,
      expiresAt: updated.expiresAt.toISOString(),
    },
  };
}

/** Convidado desiste de um presente reservado (temporário ou já confirmado). */
export async function cancelReservationAction(reservationId: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) {
    return { success: false, error: "Identifique-se novamente para continuar." };
  }

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }

  // COMPLETED entra: quem clicou "Já comprei" por engano precisa poder desfazer.
  if (!["TEMPORARY", "CONFIRMED", "COMPLETED"].includes(reservation.status)) {
    return { success: false, error: "Essa reserva não pode mais ser cancelada." };
  }

  // Pix confirmado = o casal já recebeu o dinheiro. Devolver o presente à lista sozinho deixaria a
  // conta desencontrada, então esse caso fica com o casal.
  if (reservation.paymentMethod === "PIX" && reservation.pixStatus === "CONFIRMED") {
    return {
      success: false,
      error: "O casal já confirmou o recebimento do seu Pix. Fale com o casal para qualquer ajuste.",
    };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  return { success: true };
}

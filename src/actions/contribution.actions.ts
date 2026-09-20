"use server";

import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPixPayload } from "@/lib/pix-payload";
import { logger } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";
import { formatCentsToBRL } from "@/lib/utils";
import { MAX_AMOUNT_IN_CENTS } from "@/schemas/gift.schema";

type SimpleResult = { success: true } | { success: false; error: string };

export type ContributionPixDetails = {
  amountLabel: string;
  hostName: string;
  pixKey: string;
  pixKeyType: string;
  copyPasteCode: string;
  qrCodeDataUrl: string | null;
};

/**
 * Carrega a vaquinha e valida tudo que vale para qualquer contribuição: o item
 * é uma vaquinha, a lista está publicada, o Pix está configurado e o valor
 * respeita o mínimo. NÃO há teto pela meta: contribuir além dela é permitido.
 */
async function loadFundForContribution(giftId: string, amountInCents: number) {
  const gift = await prisma.gift.findUnique({
    where: { id: giftId },
    include: { event: { include: { owner: { select: { name: true } } } } },
  });

  if (!gift || gift.kind !== "FUND" || !gift.event.published) {
    return { ok: false as const, error: "Vaquinha não encontrada." };
  }
  if (!gift.event.pixKey || !gift.event.pixKeyType) {
    return { ok: false as const, error: "O anfitrião ainda não cadastrou uma chave Pix." };
  }
  if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
    return { ok: false as const, error: "Informe um valor válido." };
  }

  const min = gift.minContributionInCents ?? 1;
  if (amountInCents < min) {
    return { ok: false as const, error: `O valor mínimo é ${formatCentsToBRL(min)}.` };
  }
  if (amountInCents > MAX_AMOUNT_IN_CENTS) {
    return { ok: false as const, error: `O valor máximo é ${formatCentsToBRL(MAX_AMOUNT_IN_CENTS)}.` };
  }

  return { ok: true as const, gift, event: gift.event };
}

/** Gera o Pix (QR + copia e cola) com o valor escolhido. Não grava nada ainda. */
export async function getContributionPixAction(
  giftId: string,
  amountInCents: number
): Promise<{ success: true; details: ContributionPixDetails } | { success: false; error: string }> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se para contribuir." };

  const loaded = await loadFundForContribution(giftId, amountInCents);
  if (!loaded.ok) return { success: false, error: loaded.error };

  const { event } = loaded;
  const hostName = event.owner.name?.trim() || event.title;
  const copyPasteCode = buildPixPayload({
    pixKey: event.pixKey!,
    merchantName: hostName,
    amountInCents,
  });

  let qrCodeDataUrl: string | null = null;
  try {
    qrCodeDataUrl = await QRCode.toDataURL(copyPasteCode, { width: 280, margin: 1 });
  } catch (error) {
    // Sem QR, o copia e cola sozinho resolve.
    logger.error("contributionQrCode", error, { giftId });
  }

  return {
    success: true,
    details: {
      amountLabel: formatCentsToBRL(amountInCents),
      hostName,
      pixKey: event.pixKey!,
      pixKeyType: event.pixKeyType!,
      copyPasteCode,
      qrCodeDataUrl,
    },
  };
}

/** Convidado avisa que fez o Pix. Só aqui a contribuição passa a existir (e a contar na barra). */
export async function declareContributionAction(
  giftId: string,
  amountInCents: number
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se para contribuir." };

  const loaded = await loadFundForContribution(giftId, amountInCents);
  if (!loaded.ok) return { success: false, error: loaded.error };

  // Duplo clique / reenvio: a mesma contribuição declarada há poucos segundos não vira duas.
  const recentDuplicate = await prisma.contribution.findFirst({
    where: {
      giftId,
      guestId: guest.id,
      amountInCents,
      status: "DECLARED",
      declaredAt: { gt: new Date(Date.now() - 60_000) },
    },
  });
  if (!recentDuplicate) {
    await prisma.contribution.create({
      data: { giftId, guestId: guest.id, amountInCents },
    });
  }

  revalidatePath(`/dashboard/eventos/${loaded.gift.eventId}`);
  return { success: true };
}

/** Convidado desfaz uma contribuição que ainda não foi confirmada (ex.: digitou o valor errado). */
export async function cancelContributionAction(contributionId: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: { gift: { select: { eventId: true } } },
  });
  if (!contribution || contribution.guestId !== guest.id) {
    return { success: false, error: "Contribuição não encontrada." };
  }
  if (contribution.status !== "DECLARED") {
    return {
      success: false,
      error: "Essa contribuição já foi confirmada pelo anfitrião. Fale com ele para qualquer ajuste.",
    };
  }

  await prisma.contribution.update({
    where: { id: contributionId },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  revalidatePath(`/dashboard/eventos/${contribution.gift.eventId}`);
  return { success: true };
}

async function requireOwnedContribution(contributionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, error: "Você precisa estar logado." };

  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: { gift: { include: { event: { select: { ownerId: true, id: true } } } } },
  });
  if (!contribution || contribution.gift.event.ownerId !== session.user.id) {
    return { ok: false as const, error: "Contribuição não encontrada." };
  }
  return { ok: true as const, contribution, eventId: contribution.gift.event.id };
}

/** Anfitrião confirma que o Pix caiu — passa de "aguardando" para "confirmado". */
export async function confirmContributionAction(contributionId: string): Promise<SimpleResult> {
  const owned = await requireOwnedContribution(contributionId);
  if (!owned.ok) return { success: false, error: owned.error };

  if (owned.contribution.status !== "DECLARED") {
    return { success: false, error: "Essa contribuição não está aguardando confirmação." };
  }

  await prisma.contribution.update({
    where: { id: contributionId },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });

  revalidatePath(`/dashboard/eventos/${owned.eventId}`);
  return { success: true };
}

/** Anfitrião recusa uma contribuição que não recebeu (ou foi declarada por engano). */
export async function rejectContributionAction(contributionId: string): Promise<SimpleResult> {
  const owned = await requireOwnedContribution(contributionId);
  if (!owned.ok) return { success: false, error: owned.error };

  if (owned.contribution.status === "CANCELLED") {
    return { success: false, error: "Essa contribuição já foi removida." };
  }

  await prisma.contribution.update({
    where: { id: contributionId },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  revalidatePath(`/dashboard/eventos/${owned.eventId}`);
  return { success: true };
}

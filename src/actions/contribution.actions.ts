"use server";

import { Prisma } from "@prisma/client";
import { takeRateLimit } from "@/lib/rate-limit";
import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPixPayload } from "@/lib/pix-payload";
import { logger, withErrorHandling } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";
import { formatCentsToBRL } from "@/lib/utils";
import { MAX_AMOUNT_IN_CENTS } from "@/schemas/gift.schema";
import { parseMessage } from "@/schemas/message.schema";
import { sendEmail } from "@/lib/email";
import { contributionDeclaredEmail } from "@/lib/email-templates";

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
    return {
      ok: false as const,
      error: "O casal ainda não cadastrou uma chave Pix.",
    };
  }
  if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
    return { ok: false as const, error: "Informe um valor válido." };
  }

  const min = gift.minContributionInCents ?? 1;
  if (amountInCents < min) {
    return {
      ok: false as const,
      error: `O valor mínimo é ${formatCentsToBRL(min)}.`,
    };
  }
  if (amountInCents > MAX_AMOUNT_IN_CENTS) {
    return {
      ok: false as const,
      error: `O valor máximo é ${formatCentsToBRL(MAX_AMOUNT_IN_CENTS)}.`,
    };
  }

  return { ok: true as const, gift, event: gift.event };
}

/** Gera o Pix (QR + copia e cola) com o valor escolhido. Não grava nada ainda. */
async function getContributionPixActionImpl(
  giftId: string,
  amountInCents: number,
): Promise<
  | { success: true; details: ContributionPixDetails }
  | { success: false; error: string }
> {
  const guest = await getCurrentGuest();
  if (!guest)
    return { success: false, error: "Identifique-se para contribuir." };

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
    qrCodeDataUrl = await QRCode.toDataURL(copyPasteCode, {
      width: 280,
      margin: 1,
    });
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
async function declareContributionActionImpl(
  giftId: string,
  amountInCents: number,
  message?: string,
  messagePublic = false,
  requestKey?: string,
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest)
    return { success: false, error: "Identifique-se para contribuir." };

  if (
    requestKey !== undefined &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestKey,
    )
  )
    return {
      success: false,
      error: "Identificador de contribuição inválido. Reabra o formulário.",
    };
  const loaded = await loadFundForContribution(giftId, amountInCents);
  if (!loaded.ok) return { success: false, error: loaded.error };

  if (typeof messagePublic !== "boolean")
    return { success: false, error: "Visibilidade inválida." };
  const note = parseMessage(message);
  if (!note.ok) return { success: false, error: note.error };

  // Duplo clique / reenvio: a mesma contribuição declarada há poucos segundos não vira duas.
  if (!(await takeRateLimit("contribute", guest.id, 10, 900)))
    return {
      success: false,
      error: "Aguarde alguns minutos antes de contribuir novamente.",
    };
  let created = false;
  try {
    created = await prisma.$transaction(
      async (tx) => {
        const fund = await tx.gift.findFirst({
          where: { id: giftId, kind: "FUND", event: { published: true } },
        });
        if (!fund || amountInCents < (fund.minContributionInCents ?? 1))
          throw new Error("FundUnavailable");
        const duplicate = await tx.contribution.findFirst({
          where: {
            giftId,
            guestId: guest.id,
            amountInCents,
            status: { in: ["DECLARED", "CONFIRMED"] },
            ...(requestKey
              ? { requestKey }
              : { declaredAt: { gt: new Date(Date.now() - 60_000) } }),
          },
        });
        if (duplicate) {
          if (duplicate.amountInCents !== amountInCents)
            throw new Error("ContributionChanged");
          return false;
        }
        await tx.contribution.create({
          data: {
            giftId,
            guestId: guest.id,
            amountInCents,
            requestKey,
            message: note.value,
            messagePublic,
          },
        });
        return true;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  } catch {
    return {
      success: false,
      error:
        "Não foi possível registrar agora. Confira suas contribuições antes de tentar novamente.",
    };
  }
  if (created) {
    // E-mail de cortesia: nunca bloqueia o registro da contribuição se falhar (ver lib/email.ts).
    await sendEmail({
      to: guest.email,
      ...contributionDeclaredEmail({
        guestName: guest.name,
        event: loaded.event,
        fundName: loaded.gift.name,
        amountLabel: formatCentsToBRL(amountInCents),
      }),
    });
  }

  revalidatePath(`/dashboard/eventos/${loaded.gift.eventId}`);
  return { success: true };
}

/** Convidado desfaz uma contribuição que ainda não foi confirmada (ex.: digitou o valor errado). */
async function cancelContributionActionImpl(
  contributionId: string,
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest)
    return {
      success: false,
      error: "Identifique-se novamente para continuar.",
    };

  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: {
      gift: {
        select: { eventId: true, event: { select: { published: true } } },
      },
    },
  });
  if (
    !contribution ||
    contribution.guestId !== guest.id ||
    !contribution.gift.event.published
  ) {
    return { success: false, error: "Contribuição não encontrada." };
  }
  if (contribution.status !== "DECLARED") {
    return {
      success: false,
      error:
        "Essa contribuição já foi confirmada pelo casal. Fale com o casal para qualquer ajuste.",
    };
  }

  const changed = await prisma.contribution.updateMany({
    where: { id: contributionId, status: "DECLARED" },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A contribuição mudou. Atualize a página.",
    };
  revalidatePath(`/dashboard/eventos/${contribution.gift.eventId}`);
  return { success: true };
}

async function requireOwnedContribution(contributionId: string) {
  const session = await auth();
  if (!session?.user?.id)
    return { ok: false as const, error: "Você precisa estar logado." };

  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: {
      gift: { include: { event: { select: { ownerId: true, id: true } } } },
    },
  });
  if (!contribution || contribution.gift.event.ownerId !== session.user.id) {
    return { ok: false as const, error: "Contribuição não encontrada." };
  }
  return {
    ok: true as const,
    contribution,
    eventId: contribution.gift.event.id,
  };
}

/** O casal confirma que o Pix caiu — passa de "aguardando" para "confirmado". */
async function confirmContributionActionImpl(
  contributionId: string,
): Promise<SimpleResult> {
  const owned = await requireOwnedContribution(contributionId);
  if (!owned.ok) return { success: false, error: owned.error };

  if (owned.contribution.status !== "DECLARED") {
    return {
      success: false,
      error: "Essa contribuição não está aguardando confirmação.",
    };
  }

  const changed = await prisma.contribution.updateMany({
    where: { id: contributionId, status: "DECLARED" },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A contribuição mudou. Atualize a página.",
    };
  revalidatePath(`/dashboard/eventos/${owned.eventId}`);
  return { success: true };
}

/** O casal recusa uma contribuição que não recebeu (ou foi declarada por engano). */
async function rejectContributionActionImpl(
  contributionId: string,
): Promise<SimpleResult> {
  const owned = await requireOwnedContribution(contributionId);
  if (!owned.ok) return { success: false, error: owned.error };

  if (owned.contribution.status !== "DECLARED") {
    return { success: false, error: "Essa contribuição já foi removida." };
  }

  const changed = await prisma.contribution.updateMany({
    where: { id: contributionId, status: "DECLARED" },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  if (!changed.count)
    return {
      success: false,
      error: "A contribuição mudou. Atualize a página.",
    };
  revalidatePath(`/dashboard/eventos/${owned.eventId}`);
  return { success: true };
}

export async function getContributionPixAction(
  giftId: string,
  amountInCents: number,
): Promise<
  | { success: true; details: ContributionPixDetails }
  | { success: false; error: string }
> {
  return withErrorHandling("getContributionPixAction", () =>
    getContributionPixActionImpl(giftId, amountInCents),
  );
}

export async function declareContributionAction(
  giftId: string,
  amountInCents: number,
  message?: string,
  messagePublic = false,
  requestKey?: string,
): Promise<SimpleResult> {
  return withErrorHandling("declareContributionAction", () =>
    declareContributionActionImpl(
      giftId,
      amountInCents,
      message,
      messagePublic,
      requestKey,
    ),
  );
}

export async function cancelContributionAction(
  contributionId: string,
): Promise<SimpleResult> {
  return withErrorHandling("cancelContributionAction", () =>
    cancelContributionActionImpl(contributionId),
  );
}

export async function confirmContributionAction(
  contributionId: string,
): Promise<SimpleResult> {
  return withErrorHandling("confirmContributionAction", () =>
    confirmContributionActionImpl(contributionId),
  );
}

export async function rejectContributionAction(
  contributionId: string,
): Promise<SimpleResult> {
  return withErrorHandling("rejectContributionAction", () =>
    rejectContributionActionImpl(contributionId),
  );
}

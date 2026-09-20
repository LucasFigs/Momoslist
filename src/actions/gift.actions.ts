"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase-storage";
import { giftSchema, parsePriceToCents } from "@/schemas/gift.schema";
import { logger } from "@/lib/logger";

type ActionResult = { success: true } | { success: false; error: string };

const ACTIVE_RESERVATION_STATUSES = ["TEMPORARY", "CONFIRMED", "COMPLETED"] as const;

async function requireOwnedEvent(eventId: string, userId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ownerId !== userId) return null;
  return event;
}

async function requireOwnedGift(giftId: string, userId: string) {
  const gift = await prisma.gift.findUnique({ where: { id: giftId }, include: { event: true } });
  if (!gift || gift.event.ownerId !== userId) return null;
  return gift;
}

function parseGiftForm(formData: FormData, kindOverride?: "PRODUCT" | "FUND") {
  const kind = kindOverride ?? (formData.get("kind") === "FUND" ? "FUND" : "PRODUCT");

  return giftSchema.safeParse({
    kind,
    name: formData.get("name"),
    description: formData.get("description"),
    // Vaquinha não tem link de loja nem quantidade: sempre 1 item, sem estoque.
    purchaseUrl: kind === "FUND" ? "" : formData.get("purchaseUrl"),
    price: formData.get("price"),
    minContribution: formData.get("minContribution"),
    quantity: kind === "FUND" ? 1 : formData.get("quantity"),
  });
}

export async function createGiftAction(eventId: string, formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const event = await requireOwnedEvent(eventId, session.user.id);
  if (!event) return { success: false, error: "Lista não encontrada." };

  const parsed = parseGiftForm(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { kind, name, description, purchaseUrl, price, minContribution, quantity } = parsed.data;
  const priceInCents = parsePriceToCents(price);

  const imageFile = formData.get("image");
  let imageUrl: string | undefined;

  if (imageFile instanceof File && imageFile.size > 0) {
    const uploadResult = await uploadImage(imageFile, `events/${eventId}`);
    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }
    imageUrl = uploadResult.url;
  }

  await prisma.gift.create({
    data: {
      eventId,
      kind,
      name,
      description: description || null,
      purchaseUrl: purchaseUrl || null,
      priceInCents,
      minContributionInCents: kind === "FUND" && minContribution ? parsePriceToCents(minContribution) : null,
      quantity,
      imageUrl,
    },
  });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function updateGiftAction(giftId: string, formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const gift = await requireOwnedGift(giftId, session.user.id);
  if (!gift) return { success: false, error: "Presente não encontrado." };

  // O tipo (produto/vaquinha) não muda depois de criado: reservas e contribuições têm regras diferentes.
  const parsed = parseGiftForm(formData, gift.kind);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { kind, name, description, purchaseUrl, price, minContribution, quantity } = parsed.data;

  // Regra do documento: a nova quantidade nunca pode ficar menor que o número
  // de reservas já ativas (ainda sempre 0 até a Fase 4, mas a checagem já vale).
  const activeReservations = await prisma.giftReservation.count({
    where: { giftId, status: { in: [...ACTIVE_RESERVATION_STATUSES] } },
  });

  if (quantity < activeReservations) {
    return {
      success: false,
      error: `A quantidade não pode ser menor que ${activeReservations} (já reservado por convidados).`,
    };
  }

  const imageFile = formData.get("image");
  let imageUrl = gift.imageUrl ?? undefined;

  if (imageFile instanceof File && imageFile.size > 0) {
    const uploadResult = await uploadImage(imageFile, `events/${gift.eventId}`);
    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }
    imageUrl = uploadResult.url;
  }

  await prisma.gift.update({
    where: { id: giftId },
    data: {
      name,
      description: description || null,
      purchaseUrl: purchaseUrl || null,
      priceInCents: parsePriceToCents(price),
      minContributionInCents: kind === "FUND" && minContribution ? parsePriceToCents(minContribution) : null,
      quantity,
      imageUrl,
    },
  });

  revalidatePath(`/dashboard/eventos/${gift.eventId}`);
  return { success: true };
}

export async function deleteGiftAction(giftId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const gift = await requireOwnedGift(giftId, session.user.id);
  if (!gift) return { success: false, error: "Presente não encontrado." };

  const activeReservations = await prisma.giftReservation.count({
    where: { giftId, status: { in: [...ACTIVE_RESERVATION_STATUSES] } },
  });

  if (activeReservations > 0) {
    return {
      success: false,
      error: "Este presente já foi escolhido por um convidado e não pode ser excluído.",
    };
  }

  // Cancelar em cascata apagaria o histórico de dinheiro que o convidado diz ter enviado.
  const activeContributions = await prisma.contribution.count({
    where: { giftId, status: { in: ["DECLARED", "CONFIRMED"] } },
  });
  if (activeContributions > 0) {
    return {
      success: false,
      error:
        "Esta vaquinha já recebeu contribuições e não pode ser excluída. Recuse as contribuições pendentes antes, se for o caso.",
    };
  }

  await prisma.gift.delete({ where: { id: giftId } });

  revalidatePath(`/dashboard/eventos/${gift.eventId}`);
  return { success: true };
}

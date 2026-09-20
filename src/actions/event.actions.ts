"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildEventSlug, generateSecureToken } from "@/lib/slug";
import { eventSchema } from "@/schemas/event.schema";
import { uploadImage } from "@/lib/supabase-storage";
import { logger } from "@/lib/logger";
import { HEX_COLOR_PATTERN } from "@/lib/theme";

type ActionResult = { success: true } | { success: false; error: string };

async function requireOwnerEvent(eventId: string, userId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ownerId !== userId) {
    return null;
  }
  return event;
}

export async function createEventAction(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    eventDate: formData.get("eventDate"),
    pixKey: formData.get("pixKey"),
    pixKeyType: formData.get("pixKeyType"),
    deliveryAddress: formData.get("deliveryAddress"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    locationMapsUrl: formData.get("locationMapsUrl"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const {
    title,
    type,
    description,
    eventDate,
    pixKey,
    pixKeyType,
    deliveryAddress,
    locationName,
    locationAddress,
    locationMapsUrl,
  } = parsed.data;

  // Tenta algumas vezes até achar um slug livre (colisão é rara, mas o slug é único no banco).
  let event;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      event = await prisma.event.create({
        data: {
          ownerId: session.user.id,
          title,
          type,
          description: description || null,
          eventDate: eventDate ?? null,
          pixKey: pixKey || null,
          pixKeyType: pixKeyType || null,
          deliveryAddress: deliveryAddress || null,
          locationName: locationName || null,
          locationAddress: locationAddress || null,
          locationMapsUrl: locationMapsUrl || null,
          slug: buildEventSlug(title),
          secureToken: generateSecureToken(),
        },
      });
      break;
    } catch {
      // colisão de slug/token — tenta de novo com novos valores aleatórios
      continue;
    }
  }

  if (!event) {
    return { success: false, error: "Não foi possível criar a lista. Tente novamente." };
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/eventos/${event.id}`);
}

export async function updateEventAction(
  eventId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    eventDate: formData.get("eventDate"),
    pixKey: formData.get("pixKey"),
    pixKeyType: formData.get("pixKeyType"),
    deliveryAddress: formData.get("deliveryAddress"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    locationMapsUrl: formData.get("locationMapsUrl"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const {
    title,
    type,
    description,
    eventDate,
    pixKey,
    pixKeyType,
    deliveryAddress,
    locationName,
    locationAddress,
    locationMapsUrl,
  } = parsed.data;

  await prisma.event.update({
    where: { id: eventId },
    data: {
      title,
      type,
      description: description || null,
      eventDate: eventDate ?? null,
      pixKey: pixKey || null,
      pixKeyType: pixKeyType || null,
      deliveryAddress: deliveryAddress || null,
      locationName: locationName || null,
      locationAddress: locationAddress || null,
      locationMapsUrl: locationMapsUrl || null,
    },
  });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function setEventPublishedAction(
  eventId: string,
  published: boolean
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  if (published) {
    const giftCount = await prisma.gift.count({ where: { eventId } });
    if (giftCount === 0) {
      return { success: false, error: "Adicione ao menos um presente antes de publicar." };
    }
  }

  await prisma.event.update({ where: { id: eventId }, data: { published } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateEventCoverImageAction(
  eventId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  const imageFile = formData.get("cover");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { success: false, error: "Selecione uma imagem." };
  }

  const uploadResult = await uploadImage(imageFile, `events/${eventId}/cover`);
  if (!uploadResult.success) {
    logger.error("updateEventCoverImage", new Error(uploadResult.error), { eventId });
    return { success: false, error: uploadResult.error };
  }

  await prisma.event.update({ where: { id: eventId }, data: { coverImageUrl: uploadResult.url } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

/** Salva a cor de acento da lista pública. Aceita qualquer #RRGGBB: o contraste é garantido ao aplicar (lib/theme). */
export async function updateEventThemeAction(
  eventId: string,
  themeColor: string
): Promise<ActionResult> {
  if (!HEX_COLOR_PATTERN.test(themeColor)) {
    return { success: false, error: "Escolha uma cor válida." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  await prisma.event.update({ where: { id: eventId }, data: { themeColor: themeColor.toUpperCase() } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function updateEventProfileImageAction(
  eventId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  const imageFile = formData.get("profile");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { success: false, error: "Selecione uma imagem." };
  }

  const uploadResult = await uploadImage(imageFile, `events/${eventId}/profile`);
  if (!uploadResult.success) {
    logger.error("updateEventProfileImage", new Error(uploadResult.error), { eventId });
    return { success: false, error: uploadResult.error };
  }

  await prisma.event.update({ where: { id: eventId }, data: { profileImageUrl: uploadResult.url } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

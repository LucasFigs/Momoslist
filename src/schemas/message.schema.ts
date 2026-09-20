import { z } from "zod";

export const MAX_MESSAGE_LENGTH = 500;

const messageSchema = z
  .string()
  .trim()
  .max(MAX_MESSAGE_LENGTH, `O recadinho pode ter até ${MAX_MESSAGE_LENGTH} caracteres.`);

/**
 * Valida o recadinho vindo do cliente. Ausente ou só espaços vira `null` (sem recado); qualquer outro tipo é
 * recusado. Quebras de linha são mantidas: o texto é sempre exibido como texto puro (React escapa o conteúdo).
 */
export function parseMessage(raw: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
  if (raw === undefined || raw === null) return { ok: true, value: null };
  const parsed = messageSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Recadinho inválido." };
  return { ok: true, value: parsed.data || null };
}

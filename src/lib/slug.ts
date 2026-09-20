/** Transforma um título em um slug simples (minúsculo, sem acento, com hífens). */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Sufixo curto e aleatório para reduzir chance de colisão de slug (ex: "a7k29"). */
function randomSuffix(length = 5): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

/** Token adicional (não previsível) usado junto ao slug para dificultar enumeração. */
export function generateSecureToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
}

export function buildEventSlug(title: string): string {
  const base = slugify(title) || "lista";
  return `${base}-${randomSuffix()}`;
}

const SECURE_TOKEN_LENGTH = 24;

/**
 * Recebe o segmento de URL combinado "<slug>-<secureToken>" e separa as duas
 * partes. O secureToken tem tamanho fixo, então basta pegar os últimos N
 * caracteres — o restante (menos o hífen separador) é o slug.
 */
export function parseEventSlugToken(
  combined: string
): { slug: string; secureToken: string } | null {
  if (combined.length <= SECURE_TOKEN_LENGTH + 1) return null;

  const secureToken = combined.slice(-SECURE_TOKEN_LENGTH);
  const slug = combined.slice(0, combined.length - SECURE_TOKEN_LENGTH - 1);

  if (!slug || !secureToken) return null;
  return { slug, secureToken };
}

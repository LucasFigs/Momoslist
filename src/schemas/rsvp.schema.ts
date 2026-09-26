import { z } from "zod";
import { MAX_COMPANIONS_PER_KIND, MAX_COMPANION_NAMES_LENGTH, parseCompanionNames } from "@/lib/rsvp";

const count = (label: string) =>
  z
    .number({ invalid_type_error: `Informe quantos ${label}.` })
    .int(`Informe um número inteiro de ${label}.`)
    .min(0, `A quantidade de ${label} não pode ser negativa.`)
    .max(MAX_COMPANIONS_PER_KIND, `O máximo é ${MAX_COMPANIONS_PER_KIND} ${label}.`);

/** `FormData`/JSON ausente vira string vazia — sem isso o Zod recusa `null` antes mesmo de checar o conteúdo. */
const emptyIfMissing = (value: unknown) => (value === null || value === undefined ? "" : value);

/** Texto livre com um nome de acompanhante por linha (ver src/lib/rsvp.ts `parseCompanionNames`). A obrigatoriedade
 *  (um nome por acompanhante) é checada abaixo, em `superRefine` — aqui só o tamanho geral. */
const companionNames = z.preprocess(
  emptyIfMissing,
  z
    .string()
    .trim()
    .max(MAX_COMPANION_NAMES_LENGTH, `A lista de nomes pode ter até ${MAX_COMPANION_NAMES_LENGTH} caracteres.`)
);

/**
 * O que o convidado envia. Quem não vai nunca carrega acompanhantes (nem nomes), mesmo que o cliente mande.
 * Quem leva acompanhantes precisa nomear cada um: a tela já força isso com um campo por pessoa, e aqui o
 * servidor confere de novo (nunca confiar só na validação do cliente) — pelo menos um nome por acompanhante.
 */
export const rsvpSchema = z
  .object({
    status: z.enum(["ATTENDING", "NOT_ATTENDING"], { errorMap: () => ({ message: "Diga se você vai comparecer." }) }),
    companionAdults: count("adultos"),
    companionChildren: count("crianças"),
    companionNames,
  })
  .superRefine((data, ctx) => {
    if (data.status !== "ATTENDING") return;
    const total = data.companionAdults + data.companionChildren;
    if (total === 0) return;

    const names = parseCompanionNames(data.companionNames);
    if (names.length < total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companionNames"],
        message: "Informe o nome de cada acompanhante.",
      });
    }
  })
  .transform((data) => ({
    status: data.status,
    companionAdults: data.status === "NOT_ATTENDING" ? 0 : data.companionAdults,
    companionChildren: data.status === "NOT_ATTENDING" ? 0 : data.companionChildren,
    companionNames: data.status === "NOT_ATTENDING" || !data.companionNames ? null : data.companionNames,
  }));

export type RsvpInput = z.input<typeof rsvpSchema>;

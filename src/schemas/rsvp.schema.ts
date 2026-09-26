import { z } from "zod";
import { MAX_COMPANIONS_PER_KIND, MAX_COMPANION_NAMES_LENGTH } from "@/lib/rsvp";

const count = (label: string) =>
  z
    .number({ invalid_type_error: `Informe quantos ${label}.` })
    .int(`Informe um número inteiro de ${label}.`)
    .min(0, `A quantidade de ${label} não pode ser negativa.`)
    .max(MAX_COMPANIONS_PER_KIND, `O máximo é ${MAX_COMPANIONS_PER_KIND} ${label}.`);

/** `FormData`/JSON ausente vira string vazia — o campo é opcional, então nunca deve falhar por estar faltando. */
const emptyIfMissing = (value: unknown) => (value === null || value === undefined ? "" : value);

/** Texto livre e opcional: um nome de acompanhante por linha (ver src/lib/rsvp.ts `parseCompanionNames`). */
const companionNames = z.preprocess(
  emptyIfMissing,
  z
    .string()
    .trim()
    .max(MAX_COMPANION_NAMES_LENGTH, `A lista de nomes pode ter até ${MAX_COMPANION_NAMES_LENGTH} caracteres.`)
);

/** O que o convidado envia. Quem não vai nunca carrega acompanhantes (nem nomes), mesmo que o cliente mande. */
export const rsvpSchema = z
  .object({
    status: z.enum(["ATTENDING", "NOT_ATTENDING"], { errorMap: () => ({ message: "Diga se você vai comparecer." }) }),
    companionAdults: count("adultos"),
    companionChildren: count("crianças"),
    companionNames,
  })
  .transform((data) => ({
    status: data.status,
    companionAdults: data.status === "NOT_ATTENDING" ? 0 : data.companionAdults,
    companionChildren: data.status === "NOT_ATTENDING" ? 0 : data.companionChildren,
    companionNames: data.status === "NOT_ATTENDING" || !data.companionNames ? null : data.companionNames,
  }));

export type RsvpInput = z.input<typeof rsvpSchema>;

import { z } from "zod";
import { MAX_COMPANIONS_PER_KIND } from "@/lib/rsvp";

const count = (label: string) =>
  z
    .number({ invalid_type_error: `Informe quantos ${label}.` })
    .int(`Informe um número inteiro de ${label}.`)
    .min(0, `A quantidade de ${label} não pode ser negativa.`)
    .max(MAX_COMPANIONS_PER_KIND, `O máximo é ${MAX_COMPANIONS_PER_KIND} ${label}.`);

/** O que o convidado envia. Quem não vai nunca carrega acompanhantes, mesmo que o cliente mande. */
export const rsvpSchema = z
  .object({
    status: z.enum(["ATTENDING", "NOT_ATTENDING"], { errorMap: () => ({ message: "Diga se você vai comparecer." }) }),
    companionAdults: count("adultos"),
    companionChildren: count("crianças"),
  })
  .transform((data) =>
    data.status === "NOT_ATTENDING" ? { ...data, companionAdults: 0, companionChildren: 0 } : data
  );

export type RsvpInput = z.input<typeof rsvpSchema>;

import { z } from "zod";

export const guestIdentifySchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone com DDD")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length >= 10 && value.length <= 13, {
      message: "Informe um telefone válido com DDD",
    }),
});

export type GuestIdentifyInput = z.infer<typeof guestIdentifySchema>;

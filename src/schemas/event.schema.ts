import { z } from "zod";

export const eventTypeValues = ["CHA_PANELA", "CHA_CASA_NOVA"] as const;
export const pixKeyTypeValues = ["CPF", "CNPJ", "EMAIL", "TELEFONE", "ALEATORIA"] as const;

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Dê um nome para o seu evento").max(100),
  type: z.enum(eventTypeValues, { message: "Selecione o tipo de evento" }),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  eventDate: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? new Date(value) : undefined)),
  pixKey: z.string().trim().max(140).optional().or(z.literal("")),
  pixKeyType: z.enum(pixKeyTypeValues).optional().or(z.literal("")),
  deliveryAddress: z.string().trim().max(500).optional().or(z.literal("")),
  locationName: z.string().trim().max(120).optional().or(z.literal("")),
  locationAddress: z.string().trim().max(500).optional().or(z.literal("")),
  locationMapsUrl: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "O link do mapa deve começar com http:// ou https://"
    ),
});

export type EventInput = z.infer<typeof eventSchema>;

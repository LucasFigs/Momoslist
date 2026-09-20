import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Informe a senha"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(80),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .max(72, "Senha muito longa"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

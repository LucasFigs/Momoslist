import { z } from "zod";

export const credentialsSchema = z.object({
  // Normaliza antes de validar: o Google devolve o e-mail em minúsculas e celulares costumam pôr maiúscula/espaço.
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(1, "Informe a senha"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(80),
  // Normaliza antes de validar: o Google devolve o e-mail em minúsculas e celulares costumam pôr maiúscula/espaço.
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .max(72, "Senha muito longa"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

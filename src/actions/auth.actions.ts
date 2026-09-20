"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schemas/auth.schema";

type SignUpResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Cria um novo usuário (anfitrião ou convidado — mesma entidade User).
 * Toda validação é refeita aqui no servidor, mesmo que o formulário já valide no cliente.
 */
export async function signUpAction(formData: FormData): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } });
  if (existing) {
    return { success: false, error: "Já existe uma conta com este e-mail." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  return { success: true };
}

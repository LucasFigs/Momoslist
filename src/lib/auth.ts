import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { credentialsSchema } from "@/schemas/auth.schema";
import { authConfig } from "@/lib/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Sempre mostra o seletor de contas: sem isso o Google reaproveita em silêncio a conta já aberta no navegador.
      authorization: { params: { prompt: "select_account" } },
      // Quem já criou conta com e-mail/senha e depois entra com o Google (mesmo e-mail) cai na mesma conta,
      // em vez de "OAuthAccountNotLinked". Só é seguro porque o callback signIn abaixo exige e-mail verificado.
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Sem diferenciar maiúsculas: contas antigas podem ter sido salvas com o e-mail como foi digitado.
        const user = await prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } });
        if (!user || !user.passwordHash) return null;

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      // O vínculo automático por e-mail só vale se o Google garante que o e-mail é da pessoa.
      if (account?.provider === "google") return profile?.email_verified === true;
      return true;
    },
  },
});

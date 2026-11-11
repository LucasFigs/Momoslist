import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { takeRateLimit } from "@/lib/rate-limit";

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
      allowDangerousEmailAccountLinking: false,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(rawCredentials, request) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const ip =
          request.headers.get("x-vercel-forwarded-for") ??
          request.headers.get("x-forwarded-for") ??
          "unknown";
        if (
          !(await takeRateLimit("login-ip", ip, 30, 900)) ||
          !(await takeRateLimit("login", email, 10, 900))
        )
          return null;

        // Sem diferenciar maiúsculas: contas antigas podem ter sido salvas com o e-mail como foi digitado.
        const user = await prisma.user.findFirst({
          where: { email: { equals: email, mode: "insensitive" } },
        });
        if (!user || !user.passwordHash || !user.emailVerified) return null;

        const passwordMatches = await bcrypt.compare(
          password,
          user.passwordHash,
        );
        if (!passwordMatches) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt(args) {
      const token = await authConfig.callbacks.jwt(args);
      if (!token.id) return null;
      const user = await prisma.user.findUnique({
        where: { id: String(token.id) },
        select: {
          emailVerified: true,
          accounts: { select: { provider: true } },
        },
      });
      if (
        !user ||
        (!user.emailVerified &&
          !user.accounts.some((account) => account.provider === "google"))
      )
        return null;
      return token;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google")
        return profile?.email_verified === true;
      return true;
    },
  },
});

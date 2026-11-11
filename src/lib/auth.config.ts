import { safeRedirect } from "@/lib/safe-redirect";
import type { NextAuthConfig } from "next-auth";

/**
 * Parte da configuração do Auth.js que roda no Edge (middleware). NÃO importe aqui Prisma, bcrypt
 * nem provedores que dependam deles: o Edge da Vercel tem limite de tamanho e não roda o Prisma.
 * A configuração completa (banco, Google, senha) fica em `auth.ts`.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  // Em produção o Auth.js só aceita hosts confiáveis; a Vercel já é detectada, mas isso evita depender disso.
  trustHost:
    process.env.VERCEL === "1" ||
    process.env.AUTH_TRUST_HOST === "true" ||
    process.env.NODE_ENV !== "production",
  session: { strategy: "jwt" },
  logger: {
    error(error) {
      console.error(
        JSON.stringify({ scope: "auth", level: "error", code: error.name }),
      );
    },
    warn(code) {
      console.warn(JSON.stringify({ scope: "auth", level: "warn", code }));
    },
    debug() {},
  },
  providers: [],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl + "/"))
        return baseUrl + safeRedirect(url.slice(baseUrl.length));
      return baseUrl + safeRedirect(url);
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

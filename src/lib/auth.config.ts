import type { NextAuthConfig } from "next-auth";

/**
 * Parte da configuração do Auth.js que roda no Edge (middleware). NÃO importe aqui Prisma, bcrypt
 * nem provedores que dependam deles: o Edge da Vercel tem limite de tamanho e não roda o Prisma.
 * A configuração completa (banco, Google, senha) fica em `auth.ts`.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  // Em produção o Auth.js só aceita hosts confiáveis; a Vercel já é detectada, mas isso evita depender disso.
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
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

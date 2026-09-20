import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";
import { Wordmark } from "@/components/wordmark";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* O atalho só faz sentido onde há um cabeçalho repetido antes do conteúdo. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link
            href="/dashboard"
            aria-label="Momoslist — início do painel"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Wordmark />
          </Link>
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <span className="hidden truncate text-sm text-muted-foreground sm:inline">
              {session?.user?.name ?? session?.user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1} className="container py-8 focus:outline-none sm:py-10">
        {children}
      </main>
    </div>
  );
}

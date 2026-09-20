import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

/** Rodapé institucional das páginas públicas do site (landing e políticas). */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Wordmark className="text-lg" />
        <nav aria-label="Institucional" className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/privacidade" className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}

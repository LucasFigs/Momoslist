"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // O detalhe técnico fica no console/log; o usuário vê só a mensagem amigável.
    console.error("[app-error]", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-2xl font-medium text-foreground">
        Algo não saiu como esperado
      </h1>
      <p className="max-w-sm text-muted-foreground">
        Não foi possível concluir essa ação. Tente novamente em instantes.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </main>
  );
}

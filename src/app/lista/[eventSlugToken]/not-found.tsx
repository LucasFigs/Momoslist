import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-3xl font-medium text-foreground">Lista não encontrada</h1>
      <p className="max-w-sm text-muted-foreground">
        Esse link pode estar incorreto ou a lista ainda não foi publicada pelo casal.
        Confira o link recebido e tente novamente.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </main>
  );
}

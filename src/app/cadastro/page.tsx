import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CadastroForm } from "./cadastro-form";
import { Wordmark } from "@/components/wordmark";

export const metadata: Metadata = { title: "Criar conta" };

export default function CadastroPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" aria-label="Momoslist — página inicial" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Wordmark className="text-2xl" />
        </Link>
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h1">Criar conta</CardTitle>
            <CardDescription>Comece sua lista de presentes em poucos minutos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <CadastroForm />
            </Suspense>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Entrar
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

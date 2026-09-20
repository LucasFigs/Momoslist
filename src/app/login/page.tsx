import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { SwitchAccountButton } from "./switch-account-button";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" aria-label="Momoslist — página inicial" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Wordmark className="text-2xl" />
        </Link>
        {session?.user ? (
          // Já há uma sessão aberta: avisa quem é, em vez de deixar o convidado achar que entrou em outra conta.
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h1">Você já está conectado</CardTitle>
              <CardDescription>
                Sessão ativa como <strong className="text-foreground">{session.user.email ?? session.user.name}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/dashboard">Ir para o meu painel</Link>
              </Button>
              <SwitchAccountButton />
            </CardContent>
          </Card>
        ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h1">Entrar</CardTitle>
            <CardDescription>Acesse sua conta para gerenciar sua lista.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <LoginForm />
            </Suspense>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Ainda não tem conta?{" "}
              <Link href="/cadastro" className="font-medium text-primary underline-offset-4 hover:underline">
                Criar conta
              </Link>
            </p>
          </CardContent>
        </Card>
        )}
        <Link href="/privacidade" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Política de Privacidade
        </Link>
      </div>
    </main>
  );
}

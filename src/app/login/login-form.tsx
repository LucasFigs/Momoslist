"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("E-mail ou senha incorretos.");
        return;
      }

      router.push(callbackUrl);
    });
  }

  const justSignedUp = searchParams.get("cadastro") === "sucesso";

  return (
    <div className="flex flex-col gap-5">
      {justSignedUp && (
        <p
          role="status"
          className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground"
        >
          Conta criada! Entre com seu e-mail e senha para continuar.
        </p>
      )}
      <form action={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@email.com"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Senha</Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
            required
          />
        </div>

        {error && (
          <p id="login-error" role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="mt-1">
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        ou
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl })}
      >
        Entrar com Google
      </Button>
    </div>
  );
}

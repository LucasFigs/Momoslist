"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signUpAction } from "@/actions/auth.actions";

export function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signUpAction(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      const params = new URLSearchParams({ cadastro: "sucesso" });
      if (callbackUrl) params.set("callbackUrl", callbackUrl);
      router.push(`/login?${params.toString()}`);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Seu nome"
          required
          minLength={2}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="voce@email.com"
          aria-describedby={error ? "cadastro-error" : undefined}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Senha</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          aria-describedby="password-hint"
          required
          minLength={8}
        />
        <p id="password-hint" className="text-xs text-muted-foreground">
          Use pelo menos 8 caracteres.
        </p>
      </div>

      {error && (
        <p id="cadastro-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}

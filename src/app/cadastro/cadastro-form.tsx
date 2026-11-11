"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signUpAction, verifySignUpAction } from "@/actions/auth.actions";

export function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, setPending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setPending(true);
    try {
      const result = await (verifying
        ? verifySignUpAction(formData)
        : signUpAction(formData));
      if (!result.success) {
        setError(result.error);
        return;
      }
      if (result.verificationRequired) {
        setVerifying(true);
        return;
      }
      const params = new URLSearchParams({ cadastro: "sucesso" });
      if (callbackUrl) params.set("callbackUrl", callbackUrl);
      router.push(`/login?${params.toString()}`);
    } catch {
      setError("Não foi possível continuar. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); void handleSubmit(new FormData(event.currentTarget)); }} className="flex flex-col gap-4">
      {verifying && (
        <div className="space-y-2">
          <p role="status">
            Enviamos um código para seu e-mail. Ele vale por 10 minutos.
          </p>
          <Label htmlFor="signup-code">Código de 6 dígitos</Label>
          <Input
            id="signup-code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            autoFocus
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setVerifying(false)}
          >
            Solicitar outro código
          </Button>
        </div>
      )}
      <fieldset
        disabled={verifying}
        className={verifying ? "hidden" : "contents"}
      >
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
      </fieldset>
      {error && (
        <p
          id="cadastro-error"
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending
          ? "Aguarde..."
          : verifying
            ? "Confirmar e-mail"
            : "Receber código por e-mail"}
      </Button>
    </form>
  );
}

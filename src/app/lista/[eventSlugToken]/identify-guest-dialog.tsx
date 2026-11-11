"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTitle,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/dialog";
import {
  identifyGuestAction,
  verifyGuestAction,
} from "@/actions/guest.actions";

interface IdentifyGuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIdentified: () => void;
}

export function IdentifyGuestDialog({
  open,
  onOpenChange,
  onIdentified,
}: IdentifyGuestDialogProps) {
  const [isPending, setPending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setPending(true);
    try {
      const result = await (verifying
        ? verifyGuestAction(formData)
        : identifyGuestAction(formData));
      if (!result.success) {
        setError(result.error);
        return;
      }
      if (result.verificationRequired) {
        setVerifying(true);
        return;
      }
      onIdentified();
    } catch {
      setError("Não foi possível continuar. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SheetContent aria-describedby={undefined}>
        {/* O <form> envolve corpo e rodapé: o botão fixo no rodapé continua enviando o formulário (e o Enter também). */}
        <form action={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <SheetHeader>
            <DialogTitle>Como podemos te chamar?</DialogTitle>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Confirme seu e-mail com um código para acompanhar suas escolhas
              com segurança. Nada de senha. Todos os campos abaixo são
              obrigatórios.
            </p>
          </SheetHeader>

          <SheetBody className="flex flex-col gap-4">
            {verifying && (
              <div className="space-y-2">
                <p role="status">
                  Enviamos um código para seu e-mail. Ele vale por 10 minutos.
                </p>
                <Label htmlFor="guest-code">Código de 6 dígitos</Label>
                <Input
                  id="guest-code"
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
                <Label htmlFor="guest-name">
                  Nome{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="guest-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Seu nome"
                  required
                  minLength={2}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="guest-email">
                  E-mail{" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="guest-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="voce@email.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="guest-phone">
                  Telefone (com DDD){" "}
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="guest-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(85) 91234-5678"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>{" "}
                Campos obrigatórios
              </p>
            </fieldset>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </SheetBody>

          <SheetFooter>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Confirmando..." : "Continuar"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Dialog>
  );
}

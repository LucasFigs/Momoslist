"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { identifyGuestAction } from "@/actions/guest.actions";

interface IdentifyGuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIdentified: () => void;
}

export function IdentifyGuestDialog({ open, onOpenChange, onIdentified }: IdentifyGuestDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await identifyGuestAction(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      onIdentified();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como podemos te chamar?</DialogTitle>
        </DialogHeader>
        <p className="mb-4 text-sm text-muted-foreground">
          Só pedimos seu nome, e-mail e telefone para você conseguir acompanhar ou alterar sua
          escolha depois. Nada de senha.
        </p>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guest-name">Nome</Label>
            <Input id="guest-name" name="name" autoComplete="name" placeholder="Seu nome" required minLength={2} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guest-email">E-mail</Label>
            <Input id="guest-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="voce@email.com" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guest-phone">Telefone (com DDD)</Label>
            <Input id="guest-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(85) 91234-5678" required />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="mt-1">
            {isPending ? "Confirmando..." : "Continuar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

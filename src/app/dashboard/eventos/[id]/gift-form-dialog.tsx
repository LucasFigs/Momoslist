"use client";

import { Fragment, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Gift as GiftIcon, PiggyBank, Plus } from "lucide-react";
import type { Gift } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createGiftAction, updateGiftAction } from "@/actions/gift.actions";

type ActionResult = { success: true } | { success: false; error: string };
type Kind = "PRODUCT" | "FUND";

interface GiftFormDialogProps {
  eventId: string;
  gift?: Gift;
  trigger?: React.ReactNode;
  /** Sem chave Pix ninguém consegue contribuir com uma vaquinha: avisamos já na criação. */
  pixConfigured?: boolean;
}

const KIND_OPTIONS: { value: Kind; title: string; description: string; icon: typeof GiftIcon }[] = [
  {
    value: "PRODUCT",
    title: "Presente",
    description: "Um item que o convidado escolhe e compra ou paga.",
    icon: GiftIcon,
  },
  {
    value: "FUND",
    title: "Vaquinha",
    description: "Vários convidados contribuem em Pix, cada um com o valor que quiser.",
    icon: PiggyBank,
  },
];

function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function GiftFormDialog({ eventId, gift, trigger, pixConfigured = true }: GiftFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(gift);
  // O tipo não muda depois de criado: reservas e contribuições seguem regras diferentes.
  const [kind, setKind] = useState<Kind>(gift?.kind ?? "PRODUCT");
  const isFund = kind === "FUND";

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setError(null);
      // Ao criar, o próximo item volta a começar como "Presente".
      if (!isEditing) setKind("PRODUCT");
    }
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const action: (fd: FormData) => Promise<ActionResult> = isEditing
        ? (fd) => updateGiftAction(gift!.id, fd)
        : (fd) => createGiftAction(eventId, fd);

      const result = await action(formData);
      if (!result.success) {
        // Fica inline (dentro do modal, junto dos campos) e também vira toast.
        setError(result.error);
        toast({ title: "Não foi possível salvar", description: result.error, variant: "destructive" });
        return;
      }
      const noun = isFund ? "Vaquinha" : "Presente";
      toast({ title: isEditing ? `${noun} atualizada` : `${noun} adicionada` });
      handleOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Adicionar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (isFund ? "Editar vaquinha" : "Editar presente") : "Novo item da lista"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="kind" value={kind} />

          {!isEditing && (
            <div role="radiogroup" aria-label="Tipo do item" className="grid grid-cols-2 gap-2">
              {KIND_OPTIONS.map(({ value, title, description, icon: Icon }) => {
                const selected = kind === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setKind(value)}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      selected ? "border-primary bg-primary/5" : "border-input bg-card hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {title}
                    </span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              defaultValue={gift?.name}
              placeholder={isFund ? "Lua de mel" : "Jogo de panelas"}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={gift?.description ?? ""}
              placeholder={isFund ? "Conte para onde vai o dinheiro e por que é especial." : undefined}
            />
          </div>

          {/* key por variante: sem ela o React reaproveita o <input> da "Quantidade" (valor 1) no campo "Mínimo"
              ao trocar de Presente para Vaquinha, e o 1 vazaria como mínimo de R$ 1,00. */}
          {isFund ? (
            <Fragment key="fund-fields">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">Meta total (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    inputMode="decimal"
                    placeholder="5.000,00"
                    defaultValue={gift ? centsToInput(gift.priceInCents) : ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="minContribution">Mínimo por pessoa (R$)</Label>
                  <Input
                    id="minContribution"
                    name="minContribution"
                    inputMode="decimal"
                    placeholder="50,00"
                    defaultValue={gift?.minContributionInCents ? centsToInput(gift.minContributionInCents) : ""}
                    required
                  />
                </div>
              </div>
              <p className="-mt-2 text-xs text-muted-foreground">
                Cada convidado escolhe quanto contribuir a partir do mínimo. A meta não é um limite: dá para
                arrecadar mais do que ela, o que evita conflito quando várias pessoas contribuem ao mesmo tempo.
              </p>
              {!pixConfigured && (
                <p role="alert" className="rounded-md bg-muted p-3 text-sm text-foreground">
                  Você ainda não cadastrou a chave Pix. Faça isso em <strong>Configurações</strong> — sem ela, os
                  convidados não conseguem contribuir.
                </p>
              )}
            </Fragment>
          ) : (
            <Fragment key="product-fields">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">Valor (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    inputMode="decimal"
                    placeholder="450,00"
                    defaultValue={gift ? centsToInput(gift.priceInCents) : ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    defaultValue={gift?.quantity ?? 1}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="purchaseUrl">Link da loja (opcional)</Label>
                <Input
                  id="purchaseUrl"
                  name="purchaseUrl"
                  type="url"
                  placeholder="https://..."
                  defaultValue={gift?.purchaseUrl ?? ""}
                />
              </div>
            </Fragment>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="image">
              Imagem {isEditing ? "(envie apenas se quiser trocar)" : "(opcional)"}
            </Label>
            <Input id="image" name="image" type="file" accept="image/png,image/jpeg,image/webp" />
            <p className="text-xs text-muted-foreground">
              A imagem aparece inteira em um quadrado — sem cortes. Fundo branco fica melhor.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="mt-1">
            {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : isFund ? "Criar vaquinha" : "Adicionar presente"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

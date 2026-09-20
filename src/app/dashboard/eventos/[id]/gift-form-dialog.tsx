"use client";

import { Fragment, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Gift as GiftIcon, PiggyBank, Plus, QrCode } from "lucide-react";
import type { Gift } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { shrinkImage } from "@/lib/shrink-image";
import { createGiftAction, updateGiftAction } from "@/actions/gift.actions";

type ActionResult = { success: true } | { success: false; error: string };
type Kind = "PRODUCT" | "PIX" | "FUND";

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
    description: "Com link de loja ou Pix.",
    icon: GiftIcon,
  },
  {
    value: "PIX",
    title: "Pix",
    description: "Sem loja ainda: só Pix.",
    icon: QrCode,
  },
  {
    value: "FUND",
    title: "Vaquinha",
    description: "Vários contribuem em Pix.",
    icon: PiggyBank,
  },
];

/** Sem chave Pix ninguém consegue pagar ou contribuir: avisamos já na criação. */
function MissingPixNotice({ action }: { action: string }) {
  return (
    <p role="alert" className="rounded-md bg-muted p-3 text-sm text-foreground">
      Você ainda não cadastrou a chave Pix. Faça isso em <strong>Configurações</strong> — sem ela, os convidados
      não conseguem {action}.
    </p>
  );
}

function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function GiftFormDialog({ eventId, gift, trigger, pixConfigured = true }: GiftFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(gift);
  const initialKind: Kind = gift?.kind ?? "PRODUCT";
  const [kind, setKind] = useState<Kind>(initialKind);
  const isFund = kind === "FUND";
  const isPixOnly = kind === "PIX";
  // Presente e Pix se alternam à vontade (os dois são reservas). A vaquinha tem regras próprias e não troca de tipo.
  const kindOptions = isEditing
    ? initialKind === "FUND"
      ? []
      : KIND_OPTIONS.filter((option) => option.value !== "FUND")
    : KIND_OPTIONS;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setError(null);
      // Fechar sem salvar descarta a troca de tipo: ao criar volta a "Presente"; ao editar, ao tipo salvo.
      setKind(initialKind);
    }
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      // Reduz a foto no navegador: a Vercel recusa requisições acima de ~4,5 MB.
      const image = formData.get("image");
      if (image instanceof File && image.size > 0) formData.set("image", await shrinkImage(image));

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
      const noun = isFund ? "Vaquinha" : isPixOnly ? "Item Pix" : "Presente";
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
            {isEditing ? (isFund ? "Editar vaquinha" : "Editar item") : "Novo item da lista"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="kind" value={kind} />

          {kindOptions.length > 0 && (
            <div
              role="radiogroup"
              aria-label="Tipo do item"
              className={cn("grid grid-cols-1 gap-2", kindOptions.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}
            >
              {kindOptions.map(({ value, title, description, icon: Icon }) => {
                const selected = kind === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setKind(value)}
                    className={cn(
                      // border-2 nos dois estados: trocar a seleção não "empurra" o layout.
                      "relative flex flex-col items-start gap-1 rounded-lg border-2 p-3 pr-10 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-card text-foreground hover:border-input hover:bg-muted"
                    )}
                  >
                    {/* Marcador tipo "radio": vazio quando não escolhido, com check quando escolhido. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full border-2",
                        selected ? "border-primary-foreground bg-primary-foreground text-primary" : "border-input bg-card"
                      )}
                    >
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {title}
                    </span>
                    <span className={cn("text-xs", selected ? "text-primary-foreground/85" : "text-muted-foreground")}>
                      {description}
                    </span>
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
              placeholder={isFund ? "Lua de mel" : isPixOnly ? "Geladeira" : "Jogo de panelas"}
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
              {!pixConfigured && <MissingPixNotice action="contribuir" />}
            </Fragment>
          ) : (
            <Fragment key={`${kind}-fields`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">{isPixOnly ? "Valor do Pix (R$)" : "Valor (R$)"}</Label>
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

              {isPixOnly ? (
                <>
                  <p className="-mt-2 text-xs text-muted-foreground">
                    O convidado paga esse valor por Pix e você compra o item depois. Quando escolher a loja,
                    edite e troque o tipo para <strong>Presente</strong>, se quiser.
                  </p>
                  {!pixConfigured && <MissingPixNotice action="pagar" />}
                </>
              ) : (
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
              )}
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
            {isPending
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : isFund
                  ? "Criar vaquinha"
                  : isPixOnly
                    ? "Adicionar item Pix"
                    : "Adicionar presente"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

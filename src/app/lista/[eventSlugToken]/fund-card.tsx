"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, PiggyBank } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FundProgress } from "@/components/fund-progress";
import { GiftImage } from "@/components/gift-image";
import type { FundTotals } from "@/lib/fund";
import { cn, formatCentsToBRL } from "@/lib/utils";
import { ContributeDialog, type MyContribution } from "./contribute-dialog";
import { IdentifyGuestDialog } from "./identify-guest-dialog";

interface FundCardProps {
  gift: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    minInCents: number;
  };
  totals: FundTotals;
  /** Meta já atingida: vaquinha entra no mesmo estado visual "esgotado" dos presentes — sinaliza que não
   *  precisa mais de atenção. A meta continua sem ser um teto: contribuir além dela é sempre permitido. */
  reached: boolean;
  myContributions: MyContribution[];
  isIdentified: boolean;
  pixConfigured: boolean;
}

/** Card da vaquinha: mesma estrutura do GiftCard (imagem quadrada inteira), com a barra de progresso no lugar do preço. */
export function FundCard({ gift, totals, reached, myContributions, isIdentified, pixConfigured }: FundCardProps) {
  const router = useRouter();
  const [contributeOpen, setContributeOpen] = useState(false);
  const [identifyOpen, setIdentifyOpen] = useState(false);

  const myTotalInCents = myContributions.reduce((sum, item) => sum + item.amountInCents, 0);

  function handleContribute() {
    if (!isIdentified) {
      setIdentifyOpen(true);
      return;
    }
    setContributeOpen(true);
  }

  function handleIdentified() {
    setIdentifyOpen(false);
    setContributeOpen(true);
    // Atualiza a faixa "Identificado(a) como…" da página sem perder o diálogo aberto.
    router.refresh();
  }

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden",
        // Mesma leitura dos presentes: meta atingida = fundo apagado; minha contribuição = contorno na cor da lista.
        reached && "bg-muted/50",
        myTotalInCents > 0 && "border-primary/60 ring-1 ring-primary/30"
      )}
    >
      <div className={cn("relative aspect-square w-full border-b border-border", reached ? "bg-muted/60" : "bg-white")}>
        <GiftImage
          src={gift.imageUrl}
          alt={gift.name}
          fill
          fit="contain"
          sizes="(min-width: 1024px) 285px, (min-width: 768px) 33vw, 50vw"
          className={cn(reached && "opacity-40 grayscale")}
        />
        {reached ? (
          <Badge variant="overlayDark" className="absolute left-2 top-2">
            <Check className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            Meta atingida
          </Badge>
        ) : (
          <Badge variant="overlay" className="absolute left-2 top-2">
            <PiggyBank className="h-3 w-3 text-primary" aria-hidden="true" />
            Vaquinha
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="min-w-0">
          <h3
            className={cn(
              "line-clamp-2 break-words text-[15px] font-medium leading-snug sm:text-base",
              reached ? "text-muted-foreground" : "text-foreground"
            )}
          >
            {gift.name}
          </h3>
          {gift.description && (
            <p className="mt-1 hidden break-words text-sm text-muted-foreground sm:line-clamp-2">
              {gift.description}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-1">
          <FundProgress {...totals} />

          <p className="text-[11px] text-muted-foreground">
            {totals.contributionsCount === 0
              ? "Seja o primeiro a contribuir"
              : totals.contributionsCount === 1
                ? "1 contribuição"
                : `${totals.contributionsCount} contribuições`}
            {" · "}mín. {formatCentsToBRL(gift.minInCents)}
          </p>

          {myTotalInCents > 0 && (
            <p className="flex items-center gap-1.5 rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
              <Check className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              Você contribuiu com {formatCentsToBRL(myTotalInCents)}
            </p>
          )}

          <Button size="sm" variant={reached ? "outline" : "soft"} onClick={handleContribute} className="w-full">
            {myTotalInCents > 0 ? "Contribuir de novo" : "Contribuir"}
          </Button>
        </div>
      </CardContent>

      <IdentifyGuestDialog open={identifyOpen} onOpenChange={setIdentifyOpen} onIdentified={handleIdentified} />

      <ContributeDialog
        open={contributeOpen}
        onOpenChange={setContributeOpen}
        giftId={gift.id}
        giftName={gift.name}
        totals={totals}
        minInCents={gift.minInCents}
        myContributions={myContributions}
        pixConfigured={pixConfigured}
      />
    </Card>
  );
}

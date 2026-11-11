"use client";

import { GiftCard } from "@/app/lista/[eventSlugToken]/gift-card";
import { SummaryMetrics } from "@/app/dashboard/eventos/[id]/summary-metrics";
import { FundProgress } from "@/components/fund-progress";
import { Badge } from "@/components/ui/badge";

export function ProductDemoContent() {
  const makeInert = (element: HTMLDivElement | null) => {
    element?.setAttribute("inert", "");
  };
  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <figure className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <figcaption className="mb-4">
          <p className="text-xs text-muted-foreground">
            Lista do convidado — exemplo
          </p>
          <p className="mt-1 font-serif text-2xl">Nosso novo cantinho</p>
        </figcaption>
        <div ref={makeInert} data-demo="guest">
          <GiftCard
            gift={{
              id: "demo-only",
              name: "Jogo de panelas",
              description: "Para preparar as primeiras receitas na casa nova.",
              imageUrl: null,
              priceLabel: "R$ 450,00",
              purchaseUrl: null,
            }}
            availability={{ availableUnits: 1, status: "LAST_UNIT" }}
            isIdentified={false}
            pixOnly={false}
            pixConfigured={true}
            myReservation={null}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Conheça o presente antes de escolher. Depois, decida entre comprar em
          uma loja e presentear com Pix.
        </p>
      </figure>
      <figure className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <figcaption className="mb-4">
          <p className="text-xs text-muted-foreground">
            Painel do organizador — exemplo
          </p>
          <p className="mt-1 font-serif text-2xl">Tudo em um só lugar</p>
        </figcaption>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="success">Lista publicada</Badge>
          <Badge variant="pending">Pix aguardando conferência</Badge>
        </div>
        <div ref={makeInert} data-demo="dashboard">
          <SummaryMetrics
            groups={[
              {
                title: "Presentes",
                metrics: [
                  {
                    id: "demo-selected",
                    label: "Selecionados",
                    value: "8",
                    details: [],
                    emptyMessage: "Exemplo",
                  },
                  {
                    id: "demo-available",
                    label: "Disponíveis",
                    value: "12",
                    details: [],
                    emptyMessage: "Exemplo",
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="mt-4 rounded-xl border border-border p-4">
          <p className="mb-4 font-medium">Vaquinha para o sofá</p>
          <FundProgress
            size="lg"
            goalInCents={100000}
            confirmedInCents={60000}
            pendingInCents={15000}
            contributionsCount={5}
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          O painel separa o que foi declarado do que você já confirmou no banco.
          Também reúne presenças e recadinhos.
        </p>
      </figure>
    </div>
  );
}

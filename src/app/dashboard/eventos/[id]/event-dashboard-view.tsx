import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Event, Gift } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventForm } from "./event-form";
import { PublishToggle } from "./publish-toggle";
import { CopyLinkButton, ShareLinkButtons } from "./share-link-buttons";
import { Badge } from "@/components/ui/badge";
import { GiftFormDialog } from "./gift-form-dialog";
import { GiftList } from "./gift-list";
import { GuestSelections, type GuestSelection } from "./guest-selections";
import { CoverImageUploader } from "./cover-image-uploader";
import { ProfileImageUploader } from "./profile-image-uploader";
import { ThemeSelector } from "./theme-selector";
import { FundsOverview, type FundOverviewItem } from "./funds-overview";
import type { FundTotals } from "@/lib/fund";
import { resolveThemeColor } from "@/lib/theme";

type ActionResult = { success: true } | { success: false; error: string };

interface Metric {
  label: string;
  value: string;
}

export interface EventDashboardViewProps {
  event: Event & { gifts: Gift[] };
  primaryMetrics: Metric[];
  secondaryMetrics: Metric[];
  selections: GuestSelection[];
  publicUrl: string;
  updateAction: (formData: FormData) => Promise<ActionResult>;
  defaultTab?: string;
  /** Vaquinhas da lista, com as contribuições, para a aba Resumo. */
  funds: FundOverviewItem[];
  fundTotals: Record<string, FundTotals>;
  pixConfigured: boolean;
}

/** Parte visual da página do evento: recebe tudo pronto, sem acessar banco nem sessão. */
export function EventDashboardView({
  event,
  primaryMetrics,
  secondaryMetrics,
  selections,
  publicUrl,
  updateAction,
  defaultTab = "resumo",
  funds,
  fundTotals,
  pixConfigured,
}: EventDashboardViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Suas listas
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {/* 1º o estado da lista: é a primeira pergunta de quem abre esta página. */}
            <div className="mb-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant={event.published ? "success" : "neutral"}>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${event.published ? "bg-success" : "bg-muted-foreground"}`}
                  aria-hidden="true"
                />
                {event.published ? "Publicada" : "Rascunho"}
              </Badge>
              <span>{event.type === "CHA_PANELA" ? "Chá de Panela" : "Chá de Casa Nova"}</span>
              <span aria-hidden="true">·</span>
              <span>{event.gifts.length === 1 ? "1 item" : `${event.gifts.length} itens`}</span>
            </div>
            <h1 className="break-words font-serif text-2xl font-medium text-foreground sm:text-3xl">
              {event.title}
            </h1>
          </div>
          {/* 2º as ações principais, à mão. */}
          <div className="flex flex-wrap items-center gap-2">
            {event.published && <CopyLinkButton url={publicUrl} />}
            <PublishToggle eventId={event.id} published={event.published} />
          </div>
        </div>
      </div>

      {/* Abas logo abaixo do título: o conteúdo começa na primeira tela, mesmo no celular. */}
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="presentes">Presentes</TabsTrigger>
          <TabsTrigger value="personalizacao">Personalização</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        {/* Resumo */}
        <TabsContent value="resumo" className="flex flex-col gap-6">
          {/* Métricas numa superfície só: fáceis de escanear e sem cara de painel financeiro. */}
          <Card>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 p-5 md:grid-cols-3 lg:grid-cols-5">
              {[...primaryMetrics, ...secondaryMetrics].map((metric, index) => (
                <div key={metric.label} className={index === 0 ? "col-span-2 md:col-span-1" : undefined}>
                  <dt className="text-xs text-muted-foreground">{metric.label}</dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {funds.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Vaquinhas</CardTitle>
                <CardDescription>
                  Acompanhe a evolução e confirme os Pix que chegarem. A meta pode ser superada — as
                  contribuições continuam abertas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FundsOverview funds={funds} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Link da sua lista</CardTitle>
              <CardDescription>
                {event.published
                  ? "Compartilhe com seus convidados pelo WhatsApp ou redes sociais."
                  : "Publique a lista para que este link fique acessível aos convidados."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShareLinkButtons url={publicUrl} published={event.published} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas reservas</CardTitle>
              <CardDescription>
                Da mais recente para a mais antiga. Só você vê os nomes dos convidados — eles não
                aparecem na lista pública.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GuestSelections selections={selections} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Presentes */}
        <TabsContent value="presentes">
          <Card>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle>Presentes e vaquinhas</CardTitle>
                <CardDescription>
                  {event.gifts.length === 1 ? "1 item" : `${event.gifts.length} itens`}
                </CardDescription>
              </div>
              <GiftFormDialog eventId={event.id} pixConfigured={pixConfigured} />
            </CardHeader>
            <CardContent>
              <GiftList
                eventId={event.id}
                gifts={event.gifts}
                fundTotals={fundTotals}
                pixConfigured={pixConfigured}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personalização — largura de leitura: campos e uploaders não precisam esticar. */}
        <TabsContent value="personalizacao" className="flex max-w-3xl flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Capa e foto da lista</CardTitle>
              <CardDescription>
                A capa fica ao fundo, no topo da página; a foto de perfil fica redonda, metade sobre a
                capa e metade sobre o conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Capa (banner)</p>
                <CoverImageUploader eventId={event.id} currentUrl={event.coverImageUrl} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ideal: 1800 × 600 px (proporção 3:1). No celular as laterais podem ser cortadas,
                  então deixe o que importa no centro.
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Foto de perfil</p>
                <ProfileImageUploader eventId={event.id} currentUrl={event.profileImageUrl} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ideal: imagem quadrada, a partir de 400 × 400 px.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeSelector eventId={event.id} currentColor={resolveThemeColor(event.themeColor, event.theme)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações */}
        <TabsContent value="configuracoes" className="max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Informações do evento</CardTitle>
              <CardDescription>
                Dados exibidos aos convidados, local, endereço de entrega e sua chave Pix.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventForm
                action={updateAction}
                submitLabel="Salvar alterações"
                initialValues={event}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

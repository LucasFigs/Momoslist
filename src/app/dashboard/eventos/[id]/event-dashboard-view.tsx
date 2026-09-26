import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Event, Gift } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventForm } from "./event-form";
import { PublishToggle } from "./publish-toggle";
import { ShareButton } from "./share-button";
import { ListPreviewButton } from "./list-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GiftFormDialog } from "./gift-form-dialog";
import { GiftList } from "./gift-list";
import { GuestSelections, type GuestSelection } from "./guest-selections";
import { CoverImageUploader } from "./cover-image-uploader";
import { ProfileImageUploader } from "./profile-image-uploader";
import { ThemeSelector } from "./theme-selector";
import { FundsOverview, type FundOverviewItem } from "./funds-overview";
import { PendingApprovalsPanel, type PendingApprovalItem } from "./pending-approvals-panel";
import { SummaryMetrics, type SummaryMetricGroup } from "./summary-metrics";
import { RsvpPanel, type RsvpItem } from "./rsvp-panel";
import { MessagesPanel, type MessageItem } from "./messages-panel";
import type { FundTotals } from "@/lib/fund";
import { resolveThemeColor } from "@/lib/theme";

type ActionResult = { success: true } | { success: false; error: string };

export interface EventDashboardViewProps {
  event: Event & { gifts: Gift[] };
  /** Métricas do Resumo, já agrupadas por assunto (Presentes, Vaquinhas, Pix, Presença). */
  metricGroups: SummaryMetricGroup[];
  selections: GuestSelection[];
  publicUrl: string;
  updateAction: (formData: FormData) => Promise<ActionResult>;
  defaultTab?: string;
  /** Vaquinhas da lista, com as contribuições, para a aba Resumo. */
  funds: FundOverviewItem[];
  fundTotals: Record<string, FundTotals>;
  /** Unidades já reservadas por presente/item Pix — selo "X reservado(s)"/"Esgotado" na aba Presentes. */
  reservedUnitsByGiftId: Record<string, number>;
  pixConfigured: boolean;
  rsvpEnabled: boolean;
  rsvpItems: RsvpItem[];
  /** Recadinhos que os convidados deixaram ao presentear. */
  messageItems: MessageItem[];
  /** Pix (de presente, item Pix ou vaquinha) aguardando confirmação — mostrado logo abaixo do cabeçalho. */
  pendingApprovals: PendingApprovalItem[];
}

/** Parte visual da página do evento: recebe tudo pronto, sem acessar banco nem sessão. */
export function EventDashboardView({
  event,
  metricGroups,
  selections,
  publicUrl,
  updateAction,
  defaultTab = "resumo",
  funds,
  fundTotals,
  reservedUnitsByGiftId,
  pixConfigured,
  rsvpEnabled,
  rsvpItems,
  messageItems,
  pendingApprovals,
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
          {/* 2º as ações principais, à mão — compartilhar é a mais usada, então vem primeiro. */}
          <div className="flex flex-wrap items-center gap-2">
            <ShareButton url={publicUrl} />
            {/* Com a lista publicada, ver o que os convidados veem é a ação mais útil ao lado de despublicar. */}
            {event.published ? (
              <Button variant="outline" size="sm" asChild>
                <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  Abrir lista pública
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Button>
            ) : (
              // Rascunho não tem link público (responde 404): a pré-visualização é a única forma de ver.
              <ListPreviewButton eventId={event.id} label="Visualizar lista" />
            )}
            <PublishToggle eventId={event.id} published={event.published} />
          </div>
        </div>
      </div>

      {/* Abas logo abaixo do título: o conteúdo começa na primeira tela, mesmo no celular. */}
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="presentes">Presentes</TabsTrigger>
          <TabsTrigger value="confirmacoes">Confirmações</TabsTrigger>
          <TabsTrigger value="recadinhos">
            Recadinhos
            {messageItems.length > 0 && (
              <span className="ml-1.5 rounded-full bg-primary-soft px-1.5 text-xs font-semibold tabular-nums text-primary">
                {messageItems.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        {/* Resumo */}
        <TabsContent value="resumo" className="flex flex-col gap-6">
          {/* Métricas numa superfície só, agrupadas por assunto: cada número é clicável e mostra o que o compõe. */}
          <Card className="px-5 py-1">
            <SummaryMetrics groups={metricGroups} />
          </Card>

          {pendingApprovals.length > 0 && (
            // Logo abaixo das métricas: é a ação mais urgente do Resumo — dinheiro que já chegou e só falta
            // confirmar. Mesma superfície neutra das demais seções (Card comum), sem virar uma faixa colorida.
            <Card>
              <CardHeader className="px-5 pb-3 pt-4">
                <CardTitle className="text-base">Pix aguardando confirmação</CardTitle>
                <CardDescription>De presentes, itens Pix e vaquinhas — confirme assim que o dinheiro cair.</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-4">
                <PendingApprovalsPanel items={pendingApprovals} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="px-5 pb-3 pt-4">
              <CardTitle className="text-base">Presentes reservados</CardTitle>
              <CardDescription>
                Da mais recente para a mais antiga. Só você vê os nomes dos convidados — eles não
                aparecem na lista pública.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <GuestSelections selections={selections} />
            </CardContent>
          </Card>

          {funds.length > 0 && (
            // Bloco de apoio: mais leve que as métricas acima (título menor, sem texto longo, linhas compactas).
            <Card>
              <CardHeader className="px-5 pb-3 pt-4">
                <CardTitle className="text-base">Vaquinhas</CardTitle>
                <CardDescription>Acompanhe o progresso e confirme os Pix que chegarem.</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-4">
                <FundsOverview funds={funds} />
              </CardContent>
            </Card>
          )}
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
                reservedUnitsByGiftId={reservedUnitsByGiftId}
                pixConfigured={pixConfigured}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Confirmações de presença */}
        <TabsContent value="confirmacoes">
          <RsvpPanel eventId={event.id} eventSlug={event.slug} enabled={rsvpEnabled} items={rsvpItems} />
        </TabsContent>

        {/* Recadinhos dos convidados */}
        <TabsContent value="recadinhos">
          <MessagesPanel items={messageItems} />
        </TabsContent>

        {/* Configurações: informações do evento e aparência da lista, na mesma etapa. Ocupa a largura toda
            (como as outras abas): formulário à esquerda e aparência ao lado no desktop; empilhado no celular. */}
        <TabsContent value="configuracoes" className="grid items-start gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
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
                previewEventId={event.id}
                initialValues={event}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aparência da lista</CardTitle>
              <CardDescription>Capa, foto e cor que os convidados veem no topo da página.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Capa (banner)</p>
                <CoverImageUploader eventId={event.id} currentUrl={event.coverImageUrl} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ideal: 1800 × 600 px (proporção 3:1). No celular as laterais podem ser cortadas, então deixe o
                  que importa no centro.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="mb-2 text-sm font-medium text-foreground">Foto de perfil</p>
                <ProfileImageUploader eventId={event.id} currentUrl={event.profileImageUrl} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ideal: imagem quadrada, a partir de 400 × 400 px. Fica redonda, metade sobre a capa.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <ThemeSelector eventId={event.id} currentColor={resolveThemeColor(event.themeColor, event.theme)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

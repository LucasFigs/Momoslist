"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Download, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  buildAttendeeChecklistCsv,
  buildRsvpCsv,
  describeCompanions,
  parseCompanionNames,
  partyOf,
  summarizeRsvps,
  type RsvpStatusValue,
} from "@/lib/rsvp";
import { deleteRsvpAction, setRsvpEnabledAction } from "@/actions/rsvp.actions";

export interface RsvpItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: RsvpStatusValue;
  companionAdults: number;
  companionChildren: number;
  /** Um nome por linha; null nas respostas dadas antes deste campo existir. */
  companionNames: string | null;
  /** ISO 8601 */
  answeredAt: string;
}

type Filter = "all" | "ATTENDING" | "NOT_ATTENDING";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

interface RsvpPanelProps {
  eventId: string;
  eventSlug: string;
  enabled: boolean;
  items: RsvpItem[];
}

export function RsvpPanel({ eventId, eventSlug, enabled, items }: RsvpPanelProps) {
  const summary = useMemo(() => summarizeRsvps(items), [items]);

  return (
    <div className="flex flex-col gap-6">
      <EnableCard eventId={eventId} enabled={enabled} responses={summary.responses} />

      {summary.responses > 0 || enabled ? (
        <>
          <SummaryCard summary={summary} />
          <ResponsesCard eventSlug={eventSlug} items={items} summary={summary} enabled={enabled} />
        </>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------

function EnableCard({ eventId, enabled, responses }: { eventId: string; enabled: boolean; responses: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      const result = await setRsvpEnabledAction(eventId, !enabled);
      if (!result.success) {
        toast({ title: "Não foi possível alterar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: enabled ? "Confirmações desligadas" : "Confirmações ligadas",
        description: enabled
          ? "O botão saiu da lista. As respostas recebidas continuam guardadas."
          : "Seus convidados já veem o botão \"Confirmar presença\" na lista.",
      });
      router.refresh();
    });
  }

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <h2 id="rsvp-switch-label" className="text-base font-semibold text-foreground">
            Receber confirmações de presença
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {enabled
              ? "Seus convidados veem um cartão \"Confirme sua presença\" na lista, onde dizem se vão, se levam acompanhantes e quantos adultos e crianças."
              : responses > 0
                ? `Desligado. As ${responses} respostas recebidas continuam guardadas e voltam a valer quando você ligar de novo.`
                : "Ligue para que os convidados possam avisar se vão, se levam acompanhantes e quantos adultos e crianças."}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-labelledby="rsvp-switch-label"
          onClick={toggle}
          disabled={isPending}
          className={cn(
            "relative mt-0.5 inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:opacity-60",
            enabled ? "bg-primary" : "bg-input"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-6 w-6 rounded-full bg-card shadow-sm transition-transform",
              enabled ? "translate-x-6" : "translate-x-0"
            )}
          />
          <span className="sr-only">{enabled ? "Ligado" : "Desligado"}</span>
        </button>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------

function SummaryCard({ summary }: { summary: ReturnType<typeof summarizeRsvps> }) {
  const { people, adults, children } = summary;
  const adultsPercent = people > 0 ? (adults / people) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Totais</CardTitle>
        <CardDescription>
          {summary.responses === 0
            ? "Ainda não há respostas."
            : `${summary.responses} ${summary.responses === 1 ? "convidado respondeu" : "convidados responderam"}. O convidado que responde conta como 1 adulto, mais os acompanhantes que informar.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div>
          <p className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tabular-nums text-foreground">{people}</span>
            <span className="text-base text-muted-foreground">{people === 1 ? "pessoa confirmada" : "pessoas confirmadas"}</span>
          </p>

          {/* Barra adultos × crianças: a proporção salta aos olhos sem precisar somar de cabeça. */}
          <div
            role="img"
            aria-label={`${adults} adultos e ${children} crianças`}
            className="mt-3 flex h-3 overflow-hidden rounded-full bg-muted"
          >
            {people > 0 && (
              <>
                <div className="bg-primary" style={{ width: `${adultsPercent}%` }} />
                <div className="bg-primary/35" style={{ width: `${100 - adultsPercent}%` }} />
              </>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
              <strong className="font-semibold tabular-nums text-foreground">{adults}</strong> {adults === 1 ? "adulto" : "adultos"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary/35" aria-hidden="true" />
              <strong className="font-semibold tabular-nums text-foreground">{children}</strong> {children === 1 ? "criança" : "crianças"}
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4 sm:grid-cols-4">
          {[
            { label: "Vão sozinhos", value: summary.alone },
            { label: "Vão com acompanhantes", value: summary.withCompanions },
            { label: "Não poderão ir", value: summary.notAttendingResponses },
            { label: "Total de respostas", value: summary.responses },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------

function ResponsesCard({
  eventSlug,
  items,
  summary,
  enabled,
}: {
  eventSlug: string;
  items: RsvpItem[];
  summary: ReturnType<typeof summarizeRsvps>;
  enabled: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = normalize(query.trim());
    return items
      .filter((item) => filter === "all" || item.status === filter)
      .filter((item) => !term || normalize(`${item.name} ${item.email} ${item.phone}`).includes(term))
      // Mais recente primeiro: é a resposta que acabou de chegar que se quer achar de cara.
      .sort((a, b) => b.answeredAt.localeCompare(a.answeredAt));
  }, [items, filter, query]);

  function download(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function downloadCsv() {
    // Planilha completa: ordem alfabética, como quem procura um nome numa lista impressa.
    const rows = [...items]
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
      .map((item) => ({ ...item, answeredAt: new Date(item.answeredAt).toLocaleString("pt-BR") }));
    download(`confirmacoes-${eventSlug}.csv`, buildRsvpCsv(rows));
  }

  function downloadChecklist() {
    // Lista "achatada" (uma pessoa por linha): para conferir na portaria ou na recepção.
    const rows = [...items]
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
      .map((item) => ({ ...item, answeredAt: new Date(item.answeredAt).toLocaleString("pt-BR") }));
    download(`lista-de-convidados-${eventSlug}.csv`, buildAttendeeChecklistCsv(rows));
  }

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "Todos", count: summary.responses },
    { value: "ATTENDING", label: "Vão", count: summary.attendingResponses },
    { value: "NOT_ATTENDING", label: "Não vão", count: summary.notAttendingResponses },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle>Respostas</CardTitle>
          <CardDescription>Só você vê nomes, e-mails e telefones dos convidados.</CardDescription>
        </div>
        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {summary.attendingResponses > 0 && (
              <Button variant="outline" size="sm" onClick={downloadChecklist}>
                <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                Lista de convidados
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={downloadCsv}>
              <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Planilha completa
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {items.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title="Ainda não há respostas"
            description={
              enabled
                ? "Compartilhe o link da lista: quando alguém confirmar presença, aparece aqui."
                : "Ligue as confirmações acima para começar a receber respostas."
            }
            className="py-10"
          />
        ) : (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div role="tablist" aria-label="Filtrar respostas" className="inline-flex w-fit rounded-lg bg-muted p-1">
                {filters.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="tab"
                    aria-selected={filter === option.value}
                    onClick={() => setFilter(option.value)}
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      filter === option.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                    <span className="text-xs tabular-nums text-muted-foreground">{option.count}</span>
                  </button>
                ))}
              </div>

              <div className="relative sm:w-64">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar convidado"
                  aria-label="Buscar convidado"
                  className="pl-9"
                />
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                Nenhuma resposta encontrada com esse filtro.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
                {visible.map((item) => (
                  <RsvpRow key={item.id} item={item} />
                ))}
              </ul>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function RsvpRow({ item }: { item: RsvpItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [removeOpen, setRemoveOpen] = useState(false);

  const attending = item.status === "ATTENDING";
  const party = partyOf(item);
  const companions = describeCompanions(item.companionAdults, item.companionChildren);
  const companionNamesList = parseCompanionNames(item.companionNames);

  function handleRemove() {
    startTransition(async () => {
      const result = await deleteRsvpAction(item.id);
      setRemoveOpen(false);
      if (!result.success) {
        toast({ title: "Não foi possível remover", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Resposta removida", description: `${item.name} saiu da contagem.` });
      router.refresh();
    });
  }

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-3 sm:p-4">
      <div className="min-w-0 flex-1 basis-56">
        <p className="truncate font-medium text-foreground">{item.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {item.email} · {item.phone}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Badge variant={attending ? "success" : "neutral"}>{attending ? "Vai" : "Não vai"}</Badge>

        <div className="min-w-[8.5rem] text-sm">
          {attending ? (
            <>
              <p className="font-medium tabular-nums text-foreground">
                {party.people} {party.people === 1 ? "pessoa" : "pessoas"}
              </p>
              <p className="text-xs text-muted-foreground">{companions ? `+ ${companions}` : "sozinho(a)"}</p>
              {companionNamesList.length > 0 && (
                <p className="mt-0.5 max-w-[14rem] truncate text-xs text-muted-foreground" title={companionNamesList.join(", ")}>
                  {companionNamesList.join(", ")}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs text-muted-foreground">—</p>
          )}
        </div>

        <span className="hidden w-24 text-xs text-muted-foreground md:inline">
          {dateFormatter.format(new Date(item.answeredAt))}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRemoveOpen(true)}
          disabled={isPending}
          aria-label={`Remover resposta de ${item.name}`}
        >
          Remover
        </Button>
      </div>

      <ConfirmDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        title="Remover esta resposta?"
        description={`${item.name} deixa de contar nos totais. A pessoa pode responder de novo pela lista, se as confirmações estiverem ligadas.`}
        confirmLabel="Sim, remover"
        isPending={isPending}
        onConfirm={handleRemove}
      />
    </li>
  );
}

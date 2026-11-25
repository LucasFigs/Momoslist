import { ChevronDown, History, LockKeyhole, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCentsToBRL } from "@/lib/utils";

export interface HistoryRecord {
  id: string;
  kind: "Reserva" | "Contribuição";
  guestName: string;
  status: string;
  statusLabel: string;
  statusTone: "neutral" | "pending" | "success";
  paymentLabel: string | null;
  paymentTone: "neutral" | "pending" | "success";
  amountInCents: number;
  referenceAmount: boolean;
  dates: { label: string; at: string }[];
  message: string | null;
  messagePublic: boolean;
  messageHidden: boolean;
}
export interface HistoryGift {
  id: string;
  name: string;
  withdrawn: boolean;
  records: HistoryRecord[];
}
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short", timeStyle: "short", timeZone: "America/Fortaleza",
});

/** Somente apresentação; a consulta autoriza o proprietário antes de fornecer dados. */
export function GiftHistoryView({ gifts }: { gifts: HistoryGift[] }) {
  const count = gifts.reduce((total, gift) => total + gift.records.length, 0);
  return (
    <section aria-label="Histórico preservado" className="min-w-0">
      <Card className="overflow-hidden shadow-sm">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-4 py-4 outline-none hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-150 sm:px-5 [&::-webkit-details-marker]:hidden">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground" aria-hidden="true"><History className="h-4 w-4" strokeWidth={1.5} /></span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold tracking-tight text-foreground">Histórico preservado</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Presentes retirados, reservas e contribuições encerradas.</p>
            </div>
            <Badge variant="neutral" className="shrink-0 tabular-nums">{count}<span className="sr-only"> movimentações</span></Badge>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground group-open:rotate-180 motion-safe:transition-transform motion-safe:duration-150" strokeWidth={1.5} aria-hidden="true" />
          </summary>
          <div className="border-t border-border px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
            <p className="mb-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />Só os organizadores veem este histórico. A retirada não altera pagamentos nem a privacidade dos recadinhos. Horários de Fortaleza.</p>
            {gifts.length === 0 ? <EmptyState icon={History} title="Seu histórico ainda está vazio" description="Presentes retirados e movimentações encerradas aparecerão aqui, com seus registros preservados." className="py-8" /> : (
              <div className="space-y-6">
                {gifts.map((gift) => (
                  <section key={gift.id} aria-label={gift.name} className="min-w-0">
                    <div className="mb-3 flex min-w-0 flex-wrap items-start gap-2">
                      <h3 className="min-w-0 flex-1 break-words text-sm font-semibold leading-relaxed text-foreground [overflow-wrap:anywhere]">{gift.name}</h3>
                      {gift.withdrawn && <Badge variant="outline" className="shrink-0">Retirado</Badge>}
                    </div>
                    {gift.records.length === 0 ? <p className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">Este presente foi retirado sem reservas ou contribuições anteriores.</p> : (
                      <ul className="space-y-3">
                        {gift.records.map((record) => (
                          <li key={record.id} className="min-w-0 rounded-md border border-border bg-background/50 p-3 sm:p-4">
                            <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                              <div className="min-w-0">
                                <p className="break-words text-sm font-medium text-foreground [overflow-wrap:anywhere]">{record.guestName}</p>
                                <div className="mt-2 flex flex-wrap items-center gap-1.5"><span className="text-xs text-muted-foreground">{record.kind}</span><Badge variant={record.statusTone}>{record.statusLabel}</Badge>{record.paymentLabel && <Badge variant={record.paymentTone}>{record.paymentLabel}</Badge>}</div>
                              </div>
                              <div className="text-left sm:text-right"><p className="text-[11px] text-muted-foreground">{record.referenceAmount ? "Valor de referência atual" : "Valor registrado"}</p><p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{formatCentsToBRL(record.amountInCents)}</p></div>
                            </div>
                            <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2 lg:grid-cols-3">{record.dates.map((date) => <div key={date.label} className="min-w-0"><dt className="text-muted-foreground">{date.label}</dt><dd className="mt-0.5 tabular-nums text-foreground"><time dateTime={date.at}>{dateFormatter.format(new Date(date.at))}</time></dd></div>)}</dl>
                            {record.message && <div className="mt-4 border-t border-border pt-3"><div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"><MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" /><span>Recadinho</span><Badge variant="outline">{record.messagePublic ? "Público" : "Privado"}</Badge>{record.messageHidden && <Badge variant="neutral">Oculto no mural</Badge>}</div><blockquote className="whitespace-pre-wrap break-words border-l-2 border-primary-border pl-3 text-sm leading-relaxed text-foreground [overflow-wrap:anywhere]">{record.message}</blockquote></div>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            )}
          </div>
        </details>
      </Card>
    </section>
  );
}

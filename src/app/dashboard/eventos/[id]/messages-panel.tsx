"use client";

import { useRouter } from "next/navigation";
import { moderateMessageAction } from "@/actions/message.actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useMemo, useState, useTransition } from "react";
import {
  Gift as GiftIcon,
  MessageCircleHeart,
  PiggyBank,
  QrCode,
  Search,
  SearchX,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { DuckAvatar } from "@/components/duck-avatar";

export interface MessageItem {
  id: string;
  /** Mesmo id em toda mensagem da mesma pessoa — é o "seed" do avatar de patinho (sempre o mesmo por convidado). */
  guestId: string;
  guestName: string;
  giftName: string;
  kind: "PRODUCT" | "PIX" | "FUND" | "MESSAGE";
  public: boolean;
  hidden: boolean;
  /** Só nas contribuições de vaquinha (ex.: "R$ 150,00"). */
  amountLabel: string | null;
  message: string;
  /** ISO 8601 */
  at: string;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

/** Sem acento e em minúsculas: "Ação" acha "acao". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function GiftLine({ item }: { item: MessageItem }) {
  if (item.kind === "MESSAGE")
    return (
      <p className="text-xs text-muted-foreground">
        Recadinho independente de presente
      </p>
    );
  const Icon =
    item.kind === "FUND" ? PiggyBank : item.kind === "PIX" ? QrCode : GiftIcon;
  return (
    <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
      <Icon
        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary"
        aria-hidden="true"
      />
      <span className="min-w-0 break-words">
        {item.kind === "FUND" ? (
          <>
            Contribuiu com{" "}
            <span className="font-medium text-foreground">
              {item.amountLabel}
            </span>{" "}
            em{" "}
            <span className="font-medium text-foreground">{item.giftName}</span>
          </>
        ) : (
          <>
            Presenteou com{" "}
            <span className="font-medium text-foreground">{item.giftName}</span>
          </>
        )}
      </span>
    </p>
  );
}

export function MessagesPanel({
  items,
  eventId,
}: {
  items: MessageItem[];
  eventId: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  function moderate(item: MessageItem) {
    startTransition(async () => {
      const result = await moderateMessageAction(
        eventId,
        item.id,
        !item.hidden,
      );
      if (!result.success)
        toast({ title: result.error, variant: "destructive" });
      else router.refresh();
    });
  }
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"recent" | "oldest">("recent");

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    const filtered = needle
      ? items.filter((item) =>
          normalize(
            `${item.guestName} ${item.giftName} ${item.message}`,
          ).includes(needle),
        )
      : items;
    // ISO 8601 ordena corretamente como texto.
    return [...filtered].sort((a, b) =>
      order === "recent" ? b.at.localeCompare(a.at) : a.at.localeCompare(b.at),
    );
  }, [items, query, order]);

  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle>Recadinhos</CardTitle>
        <CardDescription>
          Recadinhos com ou sem presentes. A visibilidade é escolhida pelo
          autor; você pode ocultar mensagens do mural.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.length === 0 ? (
          <EmptyState
            icon={MessageCircleHeart}
            title="Ainda tá tudo quietinho por aqui"
            description="Assim que alguém deixar um recadinho ao presentear ou contribuir, ele aparece bem aqui — e no mural da lista também."
          />
        ) : (
          <>
            {/* Busca e ordem só fazem sentido quando há o que filtrar. */}
            {items.length > 3 && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label
                    htmlFor="messages-search"
                    className="text-sm text-muted-foreground"
                  >
                    Buscar
                  </Label>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="messages-search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Convidado, presente ou recado"
                      className="h-10 pl-9 sm:h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 sm:w-48">
                  <Label
                    htmlFor="messages-order"
                    className="text-sm text-muted-foreground"
                  >
                    Ordenar por
                  </Label>
                  <Select
                    id="messages-order"
                    value={order}
                    onChange={(event) =>
                      setOrder(event.target.value as "recent" | "oldest")
                    }
                    className="h-10 sm:h-9"
                  >
                    <option value="recent">Mais recentes</option>
                    <option value="oldest">Mais antigos</option>
                  </Select>
                </div>
              </div>
            )}

            <p role="status" className="text-xs text-muted-foreground">
              {query
                ? `${visible.length} de ${items.length} ${items.length === 1 ? "recadinho" : "recadinhos"}`
                : items.length === 1
                  ? "1 recadinho"
                  : `${items.length} recadinhos`}
            </p>

            {visible.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="Nenhum recadinho encontrado"
                description={`Não achamos nada para “${query}”.`}
                className="py-8"
              />
            ) : (
              <ul className="grid gap-3 lg:grid-cols-2">
                {visible.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                        <DuckAvatar seed={item.guestId} className="h-7 w-7" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {item.guestName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dateFormatter.format(new Date(item.at))}
                        </p>
                      </div>
                    </div>

                    {/* O recado é o protagonista do cartão: texto legível, com o traço da cor da lista. */}
                    <blockquote className="whitespace-pre-wrap break-words border-l-2 border-primary-border pl-3 text-[15px] leading-relaxed text-foreground">
                      {item.message}
                    </blockquote>

                    <GiftLine item={item} />
                    <p className="text-xs text-muted-foreground">
                      {item.public ? "Público" : "Privado"}
                      {item.hidden ? " · Oculto pelo organizador" : ""}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pending}
                      onClick={() => moderate(item)}
                    >
                      {item.hidden ? "Desfazer moderação" : "Ocultar do mural"}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

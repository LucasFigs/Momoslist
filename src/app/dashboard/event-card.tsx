import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GiftImage } from "@/components/gift-image";
import { themeStyleFor } from "@/lib/theme";

interface EventCardProps {
  id: string;
  title: string;
  type: string;
  published: boolean;
  coverImageUrl: string | null;
  themeColor: string | null;
  legacyTheme: string;
  giftCount: number;
}

/** Card de uma lista em "Suas listas": a capa ganha destaque e o card já vem na cor escolhida para a lista. */
export function EventCard({
  id,
  title,
  type,
  published,
  coverImageUrl,
  themeColor,
  legacyTheme,
  giftCount,
}: EventCardProps) {
  return (
    <Link
      href={`/dashboard/eventos/${id}`}
      style={themeStyleFor(themeColor, legacyTheme) as React.CSSProperties}
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full overflow-hidden transition-colors group-hover:border-primary/50">
        <div className="relative aspect-[16/8] w-full bg-gradient-to-br from-primary-soft to-primary-border">
          {coverImageUrl && (
            <GiftImage
              src={coverImageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            />
          )}
        </div>
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 break-words text-base font-semibold leading-snug text-foreground">
              {title}
            </h2>
            <Badge variant={published ? "success" : "neutral"} className="mt-0.5 flex-shrink-0">
              <span
                className={`h-1.5 w-1.5 rounded-full ${published ? "bg-success" : "bg-muted-foreground"}`}
                aria-hidden="true"
              />
              {published ? "Publicada" : "Rascunho"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {type === "CHA_PANELA" ? "Chá de Panela" : "Chá de Casa Nova"} ·{" "}
            {giftCount === 1 ? "1 item" : `${giftCount} itens`}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

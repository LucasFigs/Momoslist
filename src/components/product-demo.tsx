import { FundProgress } from "@/components/fund-progress";
import { Badge } from "@/components/ui/badge";
import { Gift, MessageCircleHeart, QrCode } from "lucide-react";
export function ProductDemo() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <figcaption className="border-b border-border bg-primary-subtle p-5">
          <p className="text-xs text-muted-foreground">
            Exemplo da lista no celular
          </p>
          <p className="mt-1 font-serif text-2xl">Nosso novo cantinho</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sua presença já deixa tudo mais especial.
          </p>
        </figcaption>
        <div className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Gift className="h-4 w-4" aria-hidden="true" />
            Presentes{" "}
            <span className="ml-3 text-muted-foreground">Recadinhos</span>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-primary-subtle">
              <QrCode className="h-12 w-12 text-primary" aria-hidden="true" />
            </div>
            <p className="font-medium">Um carinho para a casa nova</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pix com QR Code e Copia e Cola, direto para o casal.
            </p>
          </div>
          <p className="flex items-center gap-2 text-sm">
            <MessageCircleHeart
              className="h-4 w-4 text-primary"
              aria-hidden="true"
            />
            Recadinhos, mesmo sem presentes
          </p>
        </div>
      </figure>
      <figure className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <figcaption>
          <p className="text-xs text-muted-foreground">
            Exemplo do painel de quem organiza
          </p>
          <p className="mt-1 font-serif text-2xl">Tudo em um só lugar</p>
        </figcaption>
        <div className="my-5 flex flex-wrap gap-2">
          <Badge variant="success">Lista publicada</Badge>
          <Badge variant="pending">Pix aguardando conferência</Badge>
        </div>
        <div className="rounded-xl border border-border p-4">
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
          Confira o banco e confirme cada Pix no painel. Acompanhe os presentes,
          as presenças e os recadinhos com tranquilidade.
        </p>
      </figure>
    </div>
  );
}

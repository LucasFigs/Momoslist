import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wordmark } from "@/components/wordmark";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";

const passos = [
  {
    numero: "01",
    titulo: "Monte sua lista",
    texto: "Escolha o tipo de chá, conte um pouco sobre a ocasião e adicione os presentes que combinam com a sua nova casa.",
  },
  {
    numero: "02",
    titulo: "Compartilhe o link",
    texto: "Envie o link pelo WhatsApp. Cada convidado abre a lista, vê o que já foi escolhido e o que ainda está disponível.",
  },
  {
    numero: "03",
    titulo: "Acompanhe em tempo real",
    texto: "Veja quem já garantiu um presente, quem pagou via Pix e confirme o recebimento direto pelo seu painel.",
  },
];

export default function LandingPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Wordmark />
          <nav aria-label="Acesso" className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/cadastro">Criar lista</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="container flex min-h-[80vh] flex-col justify-center gap-8 py-16 sm:py-20">
            <Badge variant="primary" className="w-fit">
              Chá de panela · Chá de casa nova
            </Badge>
            <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Uma lista de presentes que parece feita à mão.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Crie sua lista, compartilhe com quem você ama e acompanhe cada
              presente escolhido — sem planilhas, sem confusão, sem repetir o
              jogo de panelas três vezes.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button size="lg" asChild>
                <Link href="/cadastro">Criar minha lista</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Já tenho uma conta</Link>
              </Button>
            </div>
          </div>
        </section>
  
        {/* Como funciona */}
        <section className="container py-24">
          <h2 className="mb-12 max-w-lg font-serif text-3xl font-medium text-foreground">
            Como funciona
          </h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {passos.map((passo) => (
              <div key={passo.numero}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                  {passo.numero}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{passo.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{passo.texto}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Exemplo de lista */}
        <section className="border-y border-border bg-muted/40">
          <div className="container py-24">
            <h2 className="mb-10 max-w-lg font-serif text-3xl font-medium text-foreground">
              O que seus convidados veem
            </h2>
            {/* Ilustração: não é interativa, então some para leitores de tela e do foco do teclado. */}
            <Card className="max-w-sm" aria-hidden="true">
              <div className="h-40 rounded-t-lg bg-gradient-to-br from-primary-soft to-primary-border" />
              <CardContent className="pt-5">
                <p className="text-base font-medium text-foreground">Jogo de Panelas</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Conjunto para a nossa nova cozinha.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium text-foreground">R$ 450,00</span>
                  <Button size="sm" variant="soft" tabIndex={-1}>
                    Presentear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
  
        {/* CTA final */}
        <section className="container py-24 text-center">
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-medium text-foreground">
            Sua lista fica pronta em poucos minutos.
          </h2>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/cadastro">Criar minha lista</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

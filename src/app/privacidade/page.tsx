import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Momoslist coleta, usa e protege os dados dos casais e dos convidados.",
};

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const UPDATED_AT = "20 de setembro de 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-medium text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Momoslist — página inicial" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Wordmark />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-3xl py-10 sm:py-14">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao início
        </Link>
        <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última atualização: {UPDATED_AT}</p>

        <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">
          O Momoslist é uma plataforma para criar listas de presentes de chá de panela e chá de casa nova. Esta página
          explica quais dados tratamos, para quê, e quais são os seus direitos, em linha com a Lei Geral de Proteção de
          Dados (LGPD).
        </p>

        <Section title="Quais dados coletamos">
          <p>
            <strong className="text-foreground">Casais (quem cria a lista):</strong> nome, e-mail e senha
            (armazenada apenas de forma criptografada). Se você entrar com o Google, recebemos do Google apenas seu
            nome, e-mail e foto de perfil. Também guardamos o que você cadastra na lista: dados do evento, fotos, endereços,
            presentes e a chave Pix que você escolhe exibir.
          </p>
          <p>
            <strong className="text-foreground">Convidados (quem abre o link da lista):</strong> nome, e-mail e
            telefone informados ao escolher um presente, contribuir com uma vaquinha ou confirmar presença, além das
            escolhas feitas (presentes reservados, valores contribuídos e resposta de presença com número de
            acompanhantes) e, se quiserem, um recadinho de texto livre para o casal. Evite incluir no recadinho
            informações sensíveis.
          </p>
          <p>
            <strong className="text-foreground">Dados técnicos:</strong> cookies necessários para manter você
            identificado(a) e a sessão ativa. Não usamos cookies de publicidade.
          </p>
        </Section>

        <Section title="Para que usamos">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Autenticar os casais e permitir que gerenciem suas listas.</li>
            <li>Mostrar ao casal quem escolheu cada presente, quem contribuiu e quem confirmou presença.</li>
            <li>Evitar que o mesmo presente seja escolhido por duas pessoas.</li>
            <li>Exibir a chave Pix do casal ao convidado que decide contribuir por Pix.</li>
          </ul>
          <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
        </Section>

        <Section title="Login com Google">
          <p>
            Ao entrar com o Google, usamos somente as informações básicas de perfil (nome, e-mail e foto) para criar e
            acessar a sua conta. Não acessamos seus e-mails, contatos, arquivos ou qualquer outro dado da sua conta
            Google. Você pode revogar o acesso a qualquer momento em{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              myaccount.google.com/permissions
            </a>
            .
          </p>
        </Section>

        <Section title="Quem vê os dados">
          <p>
            A lista é acessível somente por quem tem o link. O casal vê os dados dos convidados que interagiram com
            a sua lista, inclusive os recadinhos, que só o dono da lista lê e nunca aparecem na página pública. Os
            convidados não veem os dados uns dos outros. Usamos provedores de infraestrutura (hospedagem,
            banco de dados e armazenamento de imagens) que tratam os dados em nosso nome para fazer o serviço funcionar.
          </p>
        </Section>

        <Section title="Por quanto tempo guardamos">
          <p>
            Mantemos os dados enquanto a conta ou a lista existirem. Quando um evento é excluído, os presentes,
            reservas, contribuições e confirmações de presença ligados a ele são removidos junto.
          </p>
        </Section>

        <Section title="Seus direitos">
          <p>
            Você pode solicitar acesso, correção, portabilidade ou exclusão dos seus dados, e revogar consentimentos, a
            qualquer momento.{" "}
            {contactEmail ? (
              <>
                Escreva para{" "}
                <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {contactEmail}
                </a>
                .
              </>
            ) : (
              "Entre em contato pelo canal de suporte informado no site."
            )}
          </p>
        </Section>

        <Section title="Alterações desta política">
          <p>
            Podemos atualizar esta política para refletir mudanças no serviço. A data da última atualização fica sempre
            no topo desta página.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}

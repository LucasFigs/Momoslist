<div align="center">

# 🎁 Momoslist

**A lista de presentes do seu chá de panela ou casa nova, num link só.**
Sem planilha, sem presente repetido e sem o convidado precisar criar conta.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-8B5CF6?style=flat&logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)

[O que é](#-o-que-é) · [Por que existe](#-por-que-existe) · [Como funciona](#-como-funciona) · [Recursos](#-recursos) · [Telas](#-um-passeio-pelas-telas) · [Rodar localmente](#-rodando-localmente) · [Deploy](#-deploy-na-vercel)

</div>

---

## Atualização de segurança e recadinhos

Convidados confirmam o e-mail com código de uso único, sem senha. Organizadores com cadastro por senha também verificam o e-mail. Contas antigas sem verificação precisam confirmar o e-mail e definir uma nova senha em `/cadastro`; suas listas são preservadas. Google e senha não são associados automaticamente.

**Antes de implantar, leia [o procedimento de atualização](docs/deployment.md)**: esta versão requer SMTP funcionando, migrations aditivas e conferência das permissões de banco e Storage. Não use `db push` para atualizar um banco em uso.

Verificações: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` e `npm audit`. Os testes de banco e navegador exigem serviços locais isolados, conforme [o guia de testes](docs/testing.md). Planos, relatórios de execução, capturas, dados de testes e configurações particulares ficam em `.local/` e são ignorados pelo Git.

## ✨ O que é

O **Momoslist** é uma plataforma web para montar **listas de presentes de chá de panela e chá de casa nova**.

- **O casal** (quem vai receber) cria a lista, escolhe a cor e a capa, publica e acompanha tudo num painel.
- **O convidado** abre o link pelo WhatsApp, no celular, escolhe um presente ou contribui numa vaquinha, paga por **Pix** ou compra na loja, e confirma presença. **Sem cadastro com senha e sem instalar nada.**

> O dinheiro **não passa pela plataforma**: o Pix vai direto do convidado para o casal.

### Destaques

| | | |
|---|---|---|
| 🎁 **Presentes, Pix e Vaquinha**<br>Três tipos de item para cada situação, com loja, só Pix ou meta coletiva. | 💌 **Recadinhos**<br>O convidado escreve com ou sem presente, escolhe público ou privado e pode editar ou excluir. | 🙋 **Confirmação de presença**<br>Quem vai, com quantos acompanhantes, adultos e crianças, com totais e CSV. |
| ⚡ **Pix na hora**<br>QR Code e Pix Copia e Cola gerados com o valor exato, sem intermediário. | 🎨 **A cara do evento**<br>Capa, foto e cor de destaque por lista, com contraste de acessibilidade garantido. | 🔒 **Privado por link**<br>Só entra quem recebe o link; dados de contato e escolhas ficam com o casal; recados públicos são escolhidos pelo autor. |
| 📱 **Feito para o celular**<br>O convidado abre pelo WhatsApp e resolve em poucos toques. | 🧭 **Painel organizado**<br>Resumo, presentes, confirmações, recadinhos e configurações em abas. | 🚫 **Sem presente repetido**<br>Reservas protegidas no banco contra escolhas simultâneas. |

## 🎯 Por que existe

Listas em grupo de WhatsApp e planilhas compartilhadas funcionam até o segundo convidado escolher o mesmo jogo de panelas.

| Sem o Momoslist | Com o Momoslist |
|---|---|
| Duas pessoas compram o mesmo presente | Cada item é **reservado** no banco: a última unidade só vai para uma pessoa, mesmo com cliques simultâneos |
| "Já fiz o Pix" perdido numa conversa | O convidado declara o Pix e o casal **confirma o recebimento** num painel |
| Vaquinha controlada no papel | **Meta, valor mínimo e barra de progresso** em tempo real |
| Convidado sem saber onde comprar ou pagar | Link da loja **ou** QR Code e Pix Copia e Cola já com o valor certo |
| Mensagens carinhosas perdidas em conversas soltas | Cada convidado pode deixar um **recadinho** ao presentear, e o casal lê todos numa aba própria |
| Contagem de quem vai ao evento feita na mão | **Confirmação de presença** com acompanhantes, adultos e crianças, e exportação em CSV |
| Página genérica e sem identidade | Página pública **com a cor e a capa do evento**, pensada para o celular |

**Quem ganha o quê**

- 💚 **Casal:** controle total, nenhum presente repetido, visão clara do que já chegou e do que falta confirmar.
- 📱 **Convidado:** abre o link, escolhe e paga em poucos toques, sem criar senha.
- 🔒 **Ambos:** privacidade. A lista só é acessível por quem tem o link, e os convidados não veem os dados uns dos outros.

## 🧭 Como funciona

```mermaid
flowchart LR
  A[Casal cria a lista] --> B[Publica e compartilha o link no WhatsApp]
  B --> C[Convidado abre no celular]
  C --> D{O que quer fazer?}
  D -->|Escolher presente| E[Reserva o item por 15 min]
  E --> F{Como presentear?}
  F -->|Comprar em loja| G[Compra no site do vendedor e marca: já comprei]
  F -->|Pix| H[Paga com QR Code ou Pix Copia e Cola]
  D -->|Item só Pix| H
  D -->|Vaquinha| I[Contribui com o valor que quiser]
  I --> H
  D -->|Presença| J[Confirma presença e acompanhantes]
  N[Recadinho opcional para o casal] -.-> G
  N -.-> K
  H --> K[Convidado declara: já fiz o Pix]
  K --> L[Casal confirma o recebimento no painel]
```

### Os três tipos de item

| | 🎁 **Presente** | ⚡ **Pix** | 🐷 **Vaquinha** |
|---|---|---|---|
| **Para quê** | Um item que já tem onde comprar | Algo que vocês querem comprar, mas **ainda não escolheram a loja** | Um objetivo maior, como lua de mel ou reforma |
| **Link de loja** | Opcional | Não tem | Não tem |
| **Como o convidado paga** | Loja **ou** Pix | **Só Pix** | **Só Pix**, com o valor que quiser (a partir do mínimo) |
| **Quantidade** | Sim | Sim | Não (é uma única vaquinha) |
| **Sinalização para o convidado** | Sem selo | Selo **Pix** | Selo **Vaquinha** e barra de progresso |
| **Pode mudar de tipo depois?** | ✅ Para Pix | ✅ Para Presente | ❌ Continua vaquinha |

### Jornada de quem presenteia

1. Abre o link recebido no WhatsApp e vê a **capa, o local, a data e a mensagem** do casal.
2. Navega pela vitrine (busca e ordenação ficam na URL) e toca em **Presentear** ou **Contribuir**.
3. Informa nome, e-mail e telefone e confirma o código recebido no e-mail. Sem senha.
4. Escolhe **loja** ou **Pix**. Itens só-Pix e vaquinhas já seguem direto para o pagamento.
5. Paga com o **QR Code** ou o **Copia e Cola** e, se quiser, **deixa um recadinho**.
6. Toca em **Já fiz o Pix** (ou **Já comprei**). Pode **confirmar presença** e voltar depois para editar o recado ou desistir.

### Jornada de quem recebe

1. Cria a conta (e-mail e senha ou Google), cadastra o evento, o Pix e os itens.
2. Escolhe a **capa, a foto e a cor**, confere em **Visualizar como convidado** e **publica**.
3. Compartilha o link. No **Resumo** vê o que já foi escolhido e o que falta confirmar.
4. **Confirma os Pix** que chegaram, acompanha as **vaquinhas** e as **confirmações de presença**.
5. Lê os **recadinhos** na aba própria, com busca e ordenação.

## 🎬 Um passeio pelas telas

**Página do convidado (celular)**

```
┌───────────────────────────────┐
│  ░░░░░ capa do evento ░░░░░   │
│           ( foto )            │
│        CHÁ DE CASA NOVA       │
│      Ana e Bruno · 4 dez      │
├───────────────────────────────┤
│ ✔ Confirme sua presença [Ir]  │
├───────────────────────────────┤
│ Lista de presentes            │
│ [Buscar...]      [Sugeridos ▾]│
│ ┌─────────┐   ┌─────────┐     │
│ │ ⚡ Pix   │   │🐷Vaquinha│     │
│ │  foto   │   │  foto   │     │
│ │Geladeira│   │Lua de mel│    │
│ │R$ 3.500 │   │▓▓▓░░ 40% │    │
│ │[Presentear]  │[Contribuir]   │
│ └─────────┘   └─────────┘     │
└───────────────────────────────┘
```

**Folha de pagamento, com recadinho**

```
┌─ Seu presente ────────────────┐
│ Cafeteira            R$ 249,00│
│        ┌───────────┐          │
│        │  QR Code  │          │
│        └───────────┘          │
│ [Copiar chave] [Copia e cola] │
│ ✎ Deixar um recadinho para o  │
│   casal (opcional)            │
├───────────────────────────────┤
│        [ Já fiz o Pix ]       │
└───────────────────────────────┘
```

**Painel do casal (desktop)**

```
Resumo │ Presentes │ Confirmações │ Recadinhos ⑦ │ Configurações
────────────────────────────────────────────────────────────────
 R$ 1.300   1 reservado   1 disponível   R$ 549 pendentes   4 pessoas
┌─ Vaquinhas ────────────────────────────────────────────────┐
│ 🐷 Lua de mel  ▓▓▓▓░░░░░  R$ 650 de R$ 5.000   [Revisar ▾] │
└────────────────────────────────────────────────────────────┘
┌─ Recadinhos ───────────────────────────────────────────────┐
│ ( C ) Carla Menezes        │ ( D ) Diego Sampaio           │
│ ▏Que a casa seja cheia...  │ ▏Parabéns! Muitos churrascos  │
│ 🎁 Presenteou com Panelas  │ ⚡ Presenteou com Geladeira    │
└────────────────────────────────────────────────────────────┘
```

## 🧩 Recursos

### 💍 Para o casal (painel, feito para desktop e responsivo)

- **Conta** por e-mail e senha ou **login com Google**; cada método mantém sua identidade, sem vinculação automática por e-mail.
- **Lista completa:** tipo de evento, data e horário, local com link do mapa, endereço de entrega e uma mensagem que preserva parágrafos.
- **Aparência própria:** capa, foto de perfil e **cor de destaque** por lista. A paleta é derivada da cor escolhida com **contraste de acessibilidade (WCAG AA)** garantido.
- **Pix pendente sempre à vista:** logo abaixo do cabeçalho, em qualquer aba, uma faixa reúne todo Pix aguardando confirmação — de presente, item Pix ou vaquinha — com um botão para confirmar (ou recusar, no caso de vaquinha) sem precisar caçar em qual aba ele está.
- **Painel em cinco abas:**
  - **Resumo:** métricas agrupadas por assunto (Presentes, Vaquinhas, Pix, Confirmação de presença) — **cada número é clicável** e abre a lista de itens que o compõe, para nunca ficar na dúvida do que "disponíveis" ou "confirmado" somam. Vaquinhas aparecem recolhidas num resumo compacto, com botão para expandir só quando quiser o detalhe.
  - **Presentes:** cadastro, edição e exclusão, com **ordenação** por ordem de cadastro, mais recentes, nome (A–Z e Z–A), menor e maior valor, e tipo de item.
  - **Confirmações:** liga e desliga o RSVP, totais de pessoas, adultos, crianças e recusas, lista de respostas (mais recente primeiro) e **exportação em CSV** — inclusive uma planilha "achatada" (uma pessoa por linha, com os nomes dos acompanhantes) pronta para a recepção ou a portaria.
  - **Recadinhos:** todas as mensagens dos convidados em cartões, com o nome, a data, o presente ou a contribuição, **busca** (ignora acentos) e **ordenação**. Um contador aparece na aba. Recados de reservas canceladas não aparecem.
  - **Configurações:** dados do evento e aparência da lista na mesma tela.
- **Compartilhar** ao lado de "Abrir lista pública", no topo — sem repetir o link em outro canto da tela.
- **Visualizar como convidado:** prévia que só o dono acessa, com os botões desativados, para nunca gerar reservas de teste.
- **Confirmação manual do Pix** e das contribuições de vaquinha, com opção de recusar.
- **Publicar e despublicar** a lista quando quiser.

### 📱 Para o convidado (página pública, feita para o celular)

- **Um link**, sem cadastro com senha. Ao interagir, informa nome, e-mail e telefone e confirma o e-mail com código.
- **Vitrine** de uma coluna nas telas mais estreitas e duas a partir de 360 px, com foto inteira (sem recortes), **busca e ordenação** que ficam na URL (dá para compartilhar o link já filtrado).
- **Sinalização clara:** itens só-Pix e vaquinhas têm selo próprio na foto, então o convidado sabe de antemão como vai presentear.
- **Reserva com prazo** antes de abrir as instruções; pagamentos possivelmente realizados ficam preservados para conferência. Pix declarado/confirmado e presentes recebidos exigem ajuste com o casal.
- **Vitrine organizada por prioridade:** por padrão, o que já foi escolhido ou uma vaquinha que já bateu a meta desce para o fim da lista — quem chega vê primeiro o que ainda precisa de ajuda.
- **Recadinhos com ou sem presente:** até 500 caracteres, com escolha explícita entre público e privado. Recadinhos independentes podem ser editados e excluídos pelo autor; o organizador pode ocultar mensagens do mural.
- **Pix com QR Code e Copia e Cola** gerados na hora, com o valor exato.
- **Vaquinha** com progresso, quanto falta e contribuição a partir do mínimo. Ao bater a meta, ela fica sinalizada como "concluída" (a contribuição continua aberta, mas deixa de chamar atenção).
- **Confirmação de presença:** vai ou não vai, com quantos acompanhantes, adultos, crianças e, opcionalmente, **os nomes de quem vai junto** — útil para o casal montar uma lista de recepção ou de portaria.
- **E-mail de confirmação** (quando configurado — ver [Configurando os serviços externos](#-configurando-os-serviços-externos)): ao confirmar presença ou escolher um presente, o convidado recebe um e-mail com o resumo e o link para voltar à lista.
- **Endereço de entrega copiável** para quem prefere enviar o presente.

## 📏 Regras de negócio importantes

| Tema | Regra |
|---|---|
| **Acesso à lista** | A URL exige **slug e token seguro** juntos, e a lista precisa estar publicada; caso contrário, 404. Listas não são indexadas por buscadores (`noindex`), mas geram prévia no WhatsApp. |
| **Concorrência** | A reserva roda em uma transação com isolamento **Serializable**: se dois convidados pegam a última unidade ao mesmo tempo, o banco aceita só uma. |
| **Reserva temporária** | Expira após `RESERVATION_TIMEOUT_MINUTES` (padrão 15) enquanto as instruções não foram abertas. Ao mostrar os dados de pagamento, a reserva passa a exigir conferência e não expira automaticamente. |
| **Desistência** | O convidado pode liberar escolhas não pagas. Pix declarado/confirmado e presentes recebidos ficam protegidos contra cancelamento unilateral; ajustes são feitos com o casal. |
| **Item do tipo Pix** | Não tem link de loja: o método de pagamento é escolhido sozinho (Pix) ao reservar, e o servidor recusa "compra em loja" nesse tipo. O valor é congelado na reserva e usado no Pix, mesmo após alteração do catálogo. |
| **Chave Pix** | Só é entregue a quem tem reserva ativa com método Pix; nunca aparece na página pública antes disso. |
| **Dinheiro** | Sempre em **centavos inteiros** (nunca `float`). Nenhum pagamento passa pela plataforma: o Pix vai direto para o casal. |
| **Pix Copia e Cola** | Payload EMV / BR Code do BACEN gerado localmente em [`lib/pix-payload.ts`](src/lib/pix-payload.ts). |
| **Vaquinha** | Valor mínimo por pessoa; a meta pode ser ultrapassada (o excedente aparece à parte) — contribuir depois de atingi-la continua permitido, só a vitrine deixa de destacar a vaquinha. O percentual e a conclusão da meta usam apenas valores **confirmados**; o trecho **aguardando confirmação** aparece separado. O casal pode confirmar ou recusar cada contribuição. |
| **Identidade do convidado** | Código por e-mail e sessão opaca revogável em cookie `httpOnly`, por até 30 dias. E-mail e telefone conhecidos não bastam para recuperar o histórico. |
| **Confirmação de presença** | Uma resposta por convidado (pode ser alterada). Conta como 1 adulto + acompanhantes. Os nomes dos acompanhantes são texto livre e opcionais — não precisam bater com a contagem. Só funciona se a lista estiver publicada e o RSVP ligado. |
| **Recadinhos** | Até 500 caracteres e texto puro. Há mensagens independentes e vinculadas a presentes/contribuições; são privadas por padrão e podem ser publicadas pelo autor. O organizador pode ocultá-las. |
| **E-mails** | Códigos de identidade exigem entrega bem-sucedida, com expiração e limite de tentativas. E-mails de cortesia não são usados como prova de identidade. |
| **Prévia do casal** | Somente o dono acessa; a página fica `inert`, para que nunca gere reserva de teste. |
| **Ordem dos itens** | No painel, a ordenação é só uma visão do casal. Na vitrine pública, o padrão ("Sugeridos") mantém a ordem de cadastro, mas empurra para o fim o que já foi esgotado ou uma vaquinha que já bateu a meta. |

## 🏗️ Arquitetura e decisões técnicas

```mermaid
flowchart TB
  subgraph Clientes
    G[Convidado no celular]
    H[Casal no desktop]
  end
  subgraph Vercel
    MW[Middleware no Edge protege o painel]
    APP[Next.js App Router com Server Components e Server Actions]
  end
  subgraph Supabase
    DB[(Postgres)]
    ST[(Storage de imagens)]
  end
  GO[Google OAuth]
  G --> APP
  H --> MW --> APP
  APP --> DB
  APP --> ST
  APP --> GO
```

- **Next.js App Router com Server Components.** As páginas buscam os dados no servidor; a interatividade fica em componentes cliente pequenos.
- **Server Actions** para todas as mutações (`src/actions`). Cada action **revalida a entrada com Zod no servidor** e confere se o usuário é dono do recurso. A validação do cliente é só conforto.
- **Autenticação em duas camadas.** `lib/auth.config.ts` é a configuração leve (sem Prisma nem bcrypt), usada no **middleware** Node.js que protege `/dashboard/*`. `lib/auth.ts` é a configuração completa (Prisma, Google, senha). Sessão em **JWT**.
- **Casal e convidado são entidades diferentes.** O casal é um `User` com Auth.js. O convidado é um `Guest` leve (sem senha), o que tira atrito de quem só quer presentear.
- **Imagens.** Vão para o **Supabase Storage** (bucket público `gift-images`) pelo servidor, com a chave de serviço. Antes de enviar, o navegador **reduz a foto** (`lib/shrink-image.ts`), porque a Vercel recusa requisições acima de ~4,5 MB.
- **Identidade visual.** Base neutra e fixa, com uma **cor de destaque por lista** aplicada via variáveis CSS (`--primary*`). Tipografia: Inter para a interface e Fraunces (serifada) só em títulos de destaque. Componentes no estilo shadcn/ui sobre Radix.
- **Acessibilidade.** Contraste garantido nas cores derivadas, foco visível, atalho "Pular para o conteúdo", diálogos com `role="alertdialog"` para ações destrutivas, `aria-label` em botões de ícone e respeito a `prefers-reduced-motion`.
- **Erros e logs.** `error.tsx` global e um logger estruturado: o detalhe técnico vai para o log do servidor e o usuário vê uma mensagem clara.

---

## 🗄️ Modelo de dados

Definido em [`prisma/schema.prisma`](prisma/schema.prisma).

```mermaid
erDiagram
  USER ||--o{ EVENT : "cria"
  EVENT ||--o{ GIFT : "tem"
  EVENT ||--o{ RSVP : "recebe"
  GIFT ||--o{ GIFT_RESERVATION : "é reservado em"
  GIFT ||--o{ CONTRIBUTION : "recebe (vaquinha)"
  GUEST ||--o{ GIFT_RESERVATION : "faz"
  GUEST ||--o{ CONTRIBUTION : "faz"
  GUEST ||--o{ RSVP : "responde"
```

| Modelo | Papel |
|---|---|
| `User`, `Account`, `Session`, `VerificationToken` | Casais e o vínculo com provedores (Auth.js). |
| `Event` | A lista: dados do evento, Pix, tema, `slug` + `secureToken`, `published`, `rsvpEnabled`. |
| `Gift` | Item da lista. `kind` = `PRODUCT` (presente), `PIX` (só Pix, sem loja) ou `FUND` (vaquinha, com meta e mínimo). |
| `Guest` | Convidado (nome, e-mail, telefone). E-mail único. |
| `GiftReservation` | Reserva de um produto: `status`, `paymentMethod`, `pixStatus` e o **recadinho** opcional (`message`). |
| `Contribution` | Contribuição a uma vaquinha, em centavos, com status próprio e **recadinho** opcional (`message`). |
| `Rsvp` | Resposta de presença: uma por evento e convidado (`@@unique([eventId, guestId])`), com os nomes dos acompanhantes opcionais (`companionNames`, texto livre). |

Enums principais: `EventType`, `PixKeyType`, `ReservationStatus` (`TEMPORARY → CONFIRMED → COMPLETED`, ou `CANCELLED`/`EXPIRED`), `PaymentMethod`, `PixStatus` (`NOT_DECLARED → DECLARED → CONFIRMED`), `GiftKind` (`PRODUCT`, `PIX`, `FUND`), `ContributionStatus`, `RsvpStatus`.

---

## 📁 Estrutura de pastas

```
prisma/
  schema.prisma              modelo de dados
scripts/
  check-storage.mjs          diagnóstico do Supabase Storage
src/
  actions/                   Server Actions (auth, event, gift, reservation,
                             payment, contribution, guest, rsvp)
  schemas/                   validações Zod (uma por domínio)
  lib/                       regras e utilitários
    auth.ts / auth.config.ts   Auth.js (completo / leve para o Edge)
    pix-payload.ts             BR Code / Pix Copia e Cola
    theme.ts                   paleta por lista com contraste garantido
    fund.ts, rsvp.ts           cálculos de vaquinha e de presença
    gift-availability.ts       disponibilidade = quantidade − reservas ativas
    shrink-image.ts            redução de foto no navegador
    supabase-storage.ts        upload de imagens
    email.ts, email-templates.ts  SMTP para códigos obrigatórios de identidade e e-mails de cortesia
  components/                componentes compartilhados (ui/ = base do design system)
  app/
    page.tsx                 landing
    login/, cadastro/        autenticação do casal
    privacidade/             política de privacidade
    dashboard/               painel do casal (protegido pelo middleware)
    lista/[eventSlugToken]/  página pública do convidado
    previa/[id]/             prévia do casal (só o dono)
    api/auth/                rotas do Auth.js
  middleware.ts              protege /dashboard/*
```

---

## 🚀 Rodando localmente

**Pré-requisitos:** Node.js 22.13+ da série 22 (conforme `engines.node`) e um projeto no [Supabase](https://supabase.com) (Postgres e Storage). Para atualizar uma instalação em uso, siga [o roteiro de implantação segura](docs/deployment.md) antes de integrar/publicar.

```bash
# 1. Instalar dependências (o postinstall já roda `prisma generate`)
npm install

# 2. Criar o arquivo de ambiente e preencher (veja a seção abaixo)
cp .env.example .env

# 3. Criar as tabelas no banco
npm run db:deploy

# 4. Subir o projeto
npm run dev
```

Acesse `http://localhost:3000`.

Para conferir se o envio de imagens está configurado corretamente:

```bash
npm run check:storage
```

---

## 🔐 Variáveis de ambiente

Copie [`.env.example`](.env.example) para `.env`. O `.env` **nunca deve ir para o git** (já está no `.gitignore`).

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | sim | Conexão do Supabase pelo **pooler** (porta 6543) com `?pgbouncer=true&connection_limit=1`. É a usada em runtime. |
| `DIRECT_URL` | sim | Conexão direta (porta 5432). Usada só pelo Prisma CLI (`db push`, `migrate`). |
| `AUTH_SECRET` | sim | Segredo do Auth.js. Gere com `openssl rand -base64 32` (ou `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`). Use um valor **diferente** em produção. |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | para login Google | Credenciais OAuth do Google Cloud. |
| `NEXT_PUBLIC_SUPABASE_URL` | sim | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sim | Chave pública (anon) do Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | sim | Chave de serviço, **secreta**. Só é usada no servidor (upload de imagens). Nunca use o prefixo `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_SITE_URL` | sim | URL pública do site, sem barra final. Em produção é embutida no build: se mudar, faça novo deploy. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | recomendada | E-mail exibido na Política de Privacidade para pedidos sobre dados pessoais. |
| `RESERVATION_TIMEOUT_MINUTES` | não | Validade da reserva temporária. Padrão: `15`. |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | não | Ativam os e-mails de confirmação (presença e presente escolhido), enviados pelo SMTP do Gmail. Sem elas, o app funciona normalmente e só pula o envio — ver [Configurando os serviços externos](#-configurando-os-serviços-externos). |
| `EMAIL_FROM_NAME` | não | Nome de exibição do remetente desses e-mails. Padrão: `Momoslist`. |

---

## 🔌 Configurando os serviços externos

### Supabase Storage (upload de imagens)

1. No painel do Supabase, vá em **Storage → New bucket**.
2. Crie um bucket chamado exatamente **`gift-images`** e marque como **Public**.
3. Em **Project Settings → API**, copie a **service_role key** para `SUPABASE_SERVICE_ROLE_KEY`.

### Login com Google

1. No [Google Cloud Console](https://console.cloud.google.com), crie um projeto e configure a **Tela de permissão OAuth** (tipo Externo). Escopos básicos: `email`, `profile`, `openid`.
2. Em **Credenciais**, crie um **ID do cliente OAuth** do tipo *Aplicativo da Web*.
3. Cadastre as **URIs de redirecionamento autorizadas**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://SEU-DOMINIO/api/auth/callback/google`
4. Copie o ID e o segredo para `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`.

Enquanto o app estiver em modo **Testando**, só entram os e-mails cadastrados como usuários de teste. Para liberar qualquer pessoa é preciso **publicar o app**, o que exige domínio próprio, página inicial e a política de privacidade em `/privacidade`.

### Verificação por e-mail (obrigatória — Gmail ou SMTP)

Configure o Gmail abaixo ou um SMTP compatível conforme `.env.example`. Sem entrega de e-mail, o app recusa novos acessos de convidados e novos cadastros; nunca dispensa a prova de identidade. E-mails de cortesia continuam sem bloquear operações já autenticadas.

1. Na conta Gmail que vai enviar os e-mails, ative a **verificação em duas etapas** em [myaccount.google.com/security](https://myaccount.google.com/security) — é pré-requisito para o próximo passo.
2. Em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), crie uma **senha de app** (escolha um nome como "Momoslist"). O Google mostra uma senha de 16 letras — copie-a, ela só aparece uma vez.
3. Defina `GMAIL_USER` com o endereço completo dessa conta Gmail.
4. Defina `GMAIL_APP_PASSWORD` com a senha de app gerada (não é a senha normal da conta).
5. Opcional: `EMAIL_FROM_NAME` para o nome de exibição do remetente (o endereço visível continua sendo o `GMAIL_USER`).
6. Redeploy (ou reinicie o `npm run dev`) para as variáveis valerem.

**Limites de envio:** confira as cotas e a entregabilidade da conta usada. O app também aceita outro servidor SMTP sem alterar o código; não é necessário contratar um novo serviço.

---

## 🛠️ Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento. |
| `npm run build` / `npm start` | Build e execução de produção. |
| `npm run lint` | ESLint. |
| `npm run db:deploy` | Aplica migrations versionadas; veja o procedimento de baseline para bancos existentes. |
| `npm run db:migrate` | Cria e aplica uma migration (desenvolvimento). |
| `npm run db:studio` | Abre o Prisma Studio para inspecionar os dados. |
| `npm run check:storage` | Diagnostica o bucket do Supabase (variáveis, bucket, permissão pública e upload real). |

---

## ▲ Deploy na Vercel

1. Envie o código para o GitHub e importe o repositório na Vercel (Next.js é detectado automaticamente).
2. Cadastre as [variáveis de ambiente](#variáveis-de-ambiente) em **Settings → Environment Variables**. Em uma implantação nova, gere `AUTH_SECRET`; em atualização, preserve o existente. Configure `NEXT_PUBLIC_SITE_URL` com o domínio final.
3. Faça o deploy. O [`vercel.json`](vercel.json) fixa a região `gru1` (São Paulo), próxima ao banco, para reduzir a latência.
4. No Google Cloud, adicione a origem `https://SEU-DOMINIO` e a URI `https://SEU-DOMINIO/api/auth/callback/google`.

**Checklist pós-deploy:** login com senha → login com Google → criar lista → enviar foto pelo celular → abrir o link como convidado → reservar um presente → colar o link no WhatsApp para ver a prévia.

Detalhes que já estão tratados no projeto para a Vercel: o `postinstall` gera o Prisma Client; o middleware usa a configuração leve do Auth.js em Node.js; o host é confiável na Vercel e configurável fora dela; e as fotos são reduzidas no navegador por causa do limite de 4,5 MB por requisição.

---

## 🛡️ Segurança e privacidade

- **Autorização em toda mutação.** Cada action confere que o recurso pertence ao usuário logado; o painel só consulta dados do dono.
- **Senhas** com hash bcrypt. A chave de serviço do Supabase nunca chega ao navegador.
- **Cookie de sessão** e cookie do convidado com `httpOnly` e `sameSite=lax` (e `secure` em produção).
- **Login com Google** exige e-mail verificado pelo provedor e nunca vincula automaticamente uma conta por e-mail. O seletor de contas é sempre exibido.
- **Privacidade (LGPD):** a política está em [`/privacidade`](src/app/privacidade/page.tsx). Convidados não veem dados uns dos outros; o casal vê apenas quem interagiu com a própria lista.

> **Identidade verificada:** recuperar uma identidade exige código de uso único no e-mail. O telefone não é prova de titularidade. Sessões antigas baseadas apenas no ID deixam de autenticar.

---

## 🧱 Limitações conhecidas e próximos passos

- **Redefinição de senha de contas já verificadas** ("Esqueci minha senha") continua como evolução futura. Contas antigas não verificadas podem confirmar o e-mail e definir nova senha pelo cadastro.
- **Limites persistentes** protegem login, códigos, reservas, uploads e mensagens; devem ser acompanhados em redes compartilhadas e complementados por limites HTTP da hospedagem.
- **Migrations versionadas:** bancos existentes exigem conferência da baseline antes da atualização, conforme `docs/deployment.md`.
- **Mesmo banco em desenvolvimento e produção**, se ambos usarem o mesmo projeto do Supabase; o ideal é ter um projeto separado para cada.
- **Expiração de reservas** é tratada sob demanda. Um cron (Vercel Cron) para limpeza periódica seria apenas higiene.
- **Pix é declarativo:** a plataforma não consulta o banco, então o casal confirma o recebimento manualmente.
- **Plano gratuito da Vercel (Hobby)** é só para uso não comercial.

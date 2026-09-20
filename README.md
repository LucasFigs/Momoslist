# Plataforma de Lista de Presentes

Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Prisma +
Auth.js, com Supabase (Postgres + Storage).

### Fase 1 — Fundação

- Estrutura de pastas (`app`, `components`, `lib`, `actions`, `schemas`, `types`)
- Schema Prisma completo (User, Event, Gift, GiftReservation + enums), já
  pensado para as regras de concorrência e histórico das fases futuras
- Autenticação com Auth.js: cadastro e login por e-mail/senha (hash com
  bcrypt) e login com Google, sessão JWT
- Middleware protegendo `/dashboard/*`
- Landing page e identidade visual inicial (paleta verde-sálvia / rosa-empoeirado,
  tipografia Fraunces + Inter)

### Fase 2 — Anfitrião

- Criação e edição de lista (nome, tipo de evento, data, descrição, chave Pix)
- Slug único + token seguro gerados automaticamente para a URL pública
  (a página pública em si é a Fase 3 — por enquanto o link já é gerado e
  copiável no dashboard, mas ainda não resolve)
- Publicar / despublicar lista (bloqueado se não houver nenhum presente)
- Cadastro, edição e exclusão de presentes, com upload de imagem para o
  Supabase Storage (bucket `gift-images`)
- Validação server-side com Zod em toda ação crítica; valores monetários
  sempre em centavos (nunca float)
- Regra "nova quantidade não pode ficar menor que reservas já ativas" já
  implementada (ainda sempre 0 até a Fase 4, mas a checagem já vale)
- Botão de copiar link e Web Share API

### Fase 3 — Lista pública

- Página pública em `/lista/[slug]-[secureToken]` — só resolve se slug **e**
  token baterem e a lista estiver publicada (senão, 404)
- Hero com capa, tipo do evento, data e mensagem para os convidados
- Cards de presentes com disponibilidade calculada a partir de
  `quantity - reservas ativas` (três estados: disponível, última unidade,
  indisponível — hoje sempre disponível, já que a Fase 4 ainda não existe)
- Cadastro/login do convidado reaproveitando o mesmo fluxo de autenticação da
  Fase 1 (mesma entidade `User` para anfitrião e convidado), com retorno
  automático para a lista após o login (`callbackUrl`)
- SEO básico (title, description, Open Graph) na página pública
- O botão "Quero presentear" para convidado já logado ainda não cria reserva
  de fato — isso é a Fase 4

### Fase 4 — Reservas

- Reserva temporária (`TEMPORARY`) criada dentro de uma transação com
  isolamento **Serializable** no Postgres: se dois convidados tentarem
  reservar a última unidade ao mesmo tempo, o banco garante que só uma
  transação seja aceita — a outra recebe "presente indisponível" de forma
  segura, sem depender só de checagem no código
- Expiração tratada a cada carregamento da página e a cada nova tentativa de
  reserva (reservas `TEMPORARY` vencidas viram `EXPIRED` automaticamente,
  liberando a unidade)
- Convidado escolhe o método (loja externa ou Pix) e confirma — a reserva
  passa de `TEMPORARY` para `CONFIRMED` (a tela mostra que os próximos
  passos — link da loja, chave Pix — chegam na Fase 5)
- Desistência: convidado pode cancelar a qualquer momento (reserva
  temporária ou já confirmada), liberando a unidade para outra pessoa
- Contador visual de tempo restante da reserva na própria página pública

### Fase 5 — Compra externa e Pix

- **Compra em loja**: abre o link cadastrado pelo anfitrião em nova aba e o
  convidado volta e marca "Já comprei este presente"
  (`paymentMethod = EXTERNAL_PURCHASE`, `status = COMPLETED`)
- **Pix**: mostra o valor exato, o nome do anfitrião, a chave e o tipo, com
  botões de copiar. Inclui **QR Code** e **Pix Copia e Cola** (BR Code /
  padrão EMV do BACEN) gerados localmente — sem integração bancária
- A chave Pix só é entregue ao convidado que tem uma reserva ativa com método
  Pix; ela nunca aparece na página pública antes de ser necessária
- Convidado declara o pagamento ("Já fiz o Pix" → `pixStatus = DECLARED`) e o
  anfitrião confirma o recebimento manualmente (`pixStatus = CONFIRMED`)
- **Dashboard do anfitrião**: indicadores (presentes, selecionados,
  disponíveis, Pix pendentes e confirmados em R$) e a lista de presentes
  escolhidos com nome do convidado — visível só para o dono da lista

### Fase 6 — Refinamento

- **Loading states**: skeletons na lista pública e no dashboard (`loading.tsx`),
  com `aria-busy`/`aria-live`
- **Tratamento de erros**: `error.tsx` global e logger estruturado
  (`lib/logger.ts`) — detalhes técnicos vão para o log do servidor, o usuário
  vê só "Não foi possível concluir essa ação"
- **Acessibilidade**: skip link ("Pular para o conteúdo"), `role="alert"` em
  todas as mensagens de erro, `aria-label` nos botões de ícone, diálogo de
  confirmação acessível (`role="alertdialog"`) no lugar do `confirm()` nativo,
  foco visível e navegação por teclado
- **Desistência com Pix declarado** exibe aviso extra deixando claro que não
  há estorno automático (seção 15)
- **Responsividade**: alvos de toque maiores no mobile, tipografia fluida,
  botões empilhados em telas estreitas
- **SEO**: `metadataBase`, Open Graph, `robots.ts` e `sitemap.ts`. A página
  pública gera prévia bonita no WhatsApp mas é **noindex** — listas são
  privadas por link, não devem ser indexadas
- **Empty states** amigáveis com título e texto de apoio
- Animações discretas apenas nos diálogos e transições de card

## Configurando o Supabase Storage (necessário para upload de imagens)

1. No painel do Supabase, vá em **Storage** → **New bucket**.
2. Crie um bucket chamado exatamente `gift-images` e marque como **Public**.
3. Em **Project Settings → API**, copie a **service_role key** (é diferente
   da anon key) e coloque em `SUPABASE_SERVICE_ROLE_KEY` no `.env`.
   Atenção: essa chave nunca deve ser exposta no frontend — só é usada nas
   Server Actions.

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e preencha:
   - `DATABASE_URL`: string de conexão do seu projeto Supabase/PostgreSQL
   - `AUTH_SECRET`: gere com `openssl rand -base64 32`
   - `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`: credenciais OAuth do Google Cloud Console
     (Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`)

3. Suba o schema no banco:
   ```bash
   npm run db:push
   ```

4. Rode o projeto:
   ```bash
   npm run dev
   ```

5. Acesse `http://localhost:3000`.

### Fase 8 — Identificação leve do convidado (sem senha)

- O convidado deixou de ser um `User` com senha. Agora é uma entidade
  própria `Guest`: nome + e-mail + telefone, sem autenticação Auth.js
- Ao clicar em "Quero presentear" pela primeira vez, um diálogo pede esses
  três dados, cria (ou reconhece) o `Guest` e guarda um cookie httpOnly
  neste navegador por 180 dias
- Pra acessar de outro aparelho, ele se identifica de novo com o **mesmo
  e-mail + telefone** — é isso que permite "alterar depois"
- Único cuidado de identidade que mantemos: se o e-mail já existir com um
  telefone diferente, recusamos (evita que alguém troque o telefone e
  assuma o nome de outro convidado)
- Botão "Não é você? Trocar" no topo da lista pública esquece o convidado
  atual deste navegador
- O anfitrião **não muda em nada** — continua com login normal
  (Google ou e-mail+senha) via Auth.js

> **Trade-off de segurança, aceito conscientemente para o público inicial
> (amigos, lista fechada):** sem verificação por e-mail ou SMS, quem souber
> o e-mail E o telefone de alguém consegue se passar por essa pessoa e
> mexer na reserva dela. Não é adequado para uma lista aberta ao público
> geral — se um dia isso mudar, a Fase 8 pode evoluir para um link mágico
> por e-mail sem precisar redesenhar o modelo de dados (o `Guest` continua
> o mesmo, só a forma de provar identidade muda).

⚠️ **Isso é uma mudança de schema.** O `guestId` de `GiftReservation` antes
apontava para `User` e agora aponta para uma tabela nova, `Guest`. Se você
já tem reservas de teste no banco, rode `npm run db:push` e aceite resetar
a tabela `gift_reservations` (ou apague os dados de teste manualmente antes)
— não tem como migrar reservas antigas automaticamente, porque os IDs de
`User` e `Guest` não coincidem.

### Fase 9 — Conteúdo configurável da lista

- **Capa/banner**: upload direto na página de gestão da lista (aparece em
  largura total no topo da página pública e na prévia do WhatsApp)
- **Data e horário** do evento juntos (antes só tínhamos a data)
- **Local do evento**: nome + endereço + link opcional do Google Maps
- **Endereço para entrega do presente**: campo separado, mostrado aos
  convidados que preferirem enviar em vez de levar no dia
- **Mensagem para os convidados** agora preserva quebras de linha
  (parágrafos), pra dar pra escrever um texto mais longo como no exemplo
  que você me mandou
- Aviso fixo "a compra não é feita por aqui" — aparece sozinho quando a
  lista tem pelo menos um presente de compra externa; não é um campo
  configurável porque é um fato sobre a plataforma, não uma escolha do
  anfitrião

⚠️ Mais uma mudança de schema (`Event` ganhou `deliveryAddress`,
`locationName`, `locationAddress`, `locationMapsUrl`). Rode `npm run db:push`
de novo — esses campos são todos opcionais, então não deve pedir para
resetar nenhuma tabela desta vez.

## Refatoração de front-end (pós-MVP)

A partir daqui, o trabalho passou a seguir um roteiro à parte, focado em
polimento de interface, com 4 fases próprias (A–D). Fases A–I (acima) já
estavam concluídas e continuam valendo — esta parte só reorganiza e refina
a camada visual por cima delas.

### Fase A — Identidade visual pública (concluída)

- **Sistema de toast** de verdade (shadcn/ui + Radix Toast, biblioteca que já
  estava instalada desde a Fase 1 mas nunca tinha sido usada)
- **Avatar circular** sobreposto à capa (`profileImageUrl`, novo campo,
  upload próprio no dashboard) — a capa em si já existia da Fase 9
- **Sistema de temas**: paletas "Sálvia" (padrão) e "Terracota", escolhidas
  pelo anfitrião no formulário da lista, aplicadas via `data-theme` — só na
  página pública, o dashboard mantém a identidade padrão do produto
- **`HeaderPublico`**: componente próprio, reaproveitando o que a Fase 9 já
  tinha (capa, título, local, data, mensagem, endereço de entrega) mais o
  avatar e um botão de compartilhar que usa `navigator.share` no mobile e
  copia + Toast no desktop

⚠️ Mudança de schema pequena: `Event` ganhou `profileImageUrl` e `theme`
(default `SALVIA`). `npm run db:push` — sem risco de perda de dado.

### Fase B — Vitrine e estados de carregamento (concluída)

- **Grid responsivo**: 2 colunas no mobile, 3 no tablet, 4 no desktop
  (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`), tanto na grade real quanto
  no skeleton
- **Busca + ordenação sincronizadas com a URL** (`?q=busca&sort=price_asc`):
  sobrevivem a um F5, e dá pra mandar o link já filtrado pra alguém. Busca
  com debounce de 300ms; ordenação por menor/maior preço ou disponíveis
  primeiro
- **`GiftsSection`**: virou um Server Component assíncrono próprio, isolado
  do resto da página. Ele que faz as consultas de reserva/disponibilidade e
  aplica o filtro/ordenação — a página em si só busca o evento
- **Skeleton com Suspense de verdade**: `<Suspense key={...}
  fallback={<GiftCardSkeletonList />}>` envolve o `GiftsSection`. A troca de
  `key` a cada busca/ordenação garante que o skeleton reaparece mesmo numa
  navegação client-side (`router.replace`), não só no primeiro carregamento
- Filtro e ordenação continuam client-side/em memória (não viraram query no
  banco) — para o tamanho típico de uma lista de presentes (dezenas de
  itens, não milhares), isso é mais simples e rápido do que ir ao Postgres
  a cada tecla

Nenhuma mudança de schema nesta fase.
### Fase C — Dashboard em Tabs (concluída)

- Página de gestão da lista deixou de ser uma pilha longa de Cards e virou
  4 abas (`@radix-ui/react-tabs`, também já usado noutros pontos do
  projeto): **Resumo, Presentes, Personalização, Configurações**
- **Resumo** (aba padrão): 3 métricas em destaque — Total arrecadado via
  Pix, Presentes reservados, Presentes disponíveis — mais 2 métricas
  secundárias (total de presentes, Pix pendentes) e a lista de "Últimas
  reservas" com nome do convidado, método e status
- **Presentes**: exatamente o que já existia (tabela + "Adicionar
  presente"), só que agora isolado numa aba própria
- **Personalização**: capa, foto de perfil (Fase A) e o seletor de tema —
  que ganhou vida própria: antes era um campo dentro do formulário grande,
  agora é um `<select>` que salva sozinho ao trocar (com Toast de
  confirmação), sem precisar clicar em "Salvar alterações" lá embaixo
- **Configurações**: o formulário de informações do evento (nome, tipo,
  data, local, endereço de entrega, mensagem, Pix) — igual ao que já
  existia, só que sem o campo de tema (que migrou pra Personalização)
- O link da lista e o botão de publicar continuam visíveis acima das
  abas, porque são as duas ações que o anfitrião mais usa, custe qual
  aba estiver aberta

Nenhuma mudança de schema nesta fase (o tema já tinha sido adicionado na
Fase A; aqui só ganhou uma tela própria).
### Fase D — Empty states, fallback de imagem (já existe, será revisado) e toasts em todos os fluxos

## Status

Todas as 6 fases do plano original estão implementadas. Antes de publicar
para uso real, recomendo:

1. Testar o QR Code / Copia e Cola do Pix com um valor baixo (R$ 1,00) no app
   do seu banco — geração de BR Code só se confirma na prática.
2. Configurar `NEXT_PUBLIC_SITE_URL` com o domínio real no deploy da Vercel.
3. Rodar `npm run db:migrate` (em vez de `db:push`) para gerar migrations
   versionadas antes do primeiro deploy de produção.
4. Opcional: cron job (Vercel Cron) para limpar reservas expiradas
   periodicamente — hoje a expiração já é tratada sob demanda, o cron seria
   só higiene.

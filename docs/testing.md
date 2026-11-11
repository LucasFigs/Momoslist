# Testes

`npm test` executa as regras de domínio e Server Actions com dependências controladas. Cobrem redirecionamento, Google/credenciais, cadastro verificado, isolamento, transições financeiras, snapshots, Pix/QR, vaquinhas, recadinhos e imagens.

`npm run typecheck`, `npm run lint`, `npm run build` e `npm audit` completam a verificação técnica. O build não acessa Google Fonts: as fontes e suas licenças ficam em `public/fonts`.

## PostgreSQL isolado

Os testes em `tests/database.test.ts` só conectam quando `TEST_DATABASE_URL` está definido e exigem o banco descartável `postgres` em `127.0.0.1:55439`. Não aponte para produção. Inicialize um cluster separado dentro de `.local/`, aplique `prisma migrate deploy` nesse cluster usando `DATABASE_URL`/`DIRECT_URL` locais e defina `TEST_DATABASE_URL` para o mesmo endereço. A suíte cria fixtures com identificadores aleatórios e as remove; não use um cluster compartilhado. Ela valida concorrência real, expiração, sessões, mensagens, RSVP e pagamentos.

Sem `TEST_DATABASE_URL`, esses testes aparecem explicitamente como ignorados. Eles não são apresentados como executados.

## Navegador

`npx playwright test` usa Edge headless por padrão (ou `PLAYWRIGHT_CHANNEL`), a aplicação em `http://127.0.0.1:3107`, o mesmo PostgreSQL isolado e um servidor SMTP de captura **local**, sem e-mails externos. Configure o app com `SMTP_HOST` apontando para o capturador, `EMAIL_FROM_ADDRESS` de teste e sem credenciais reais. Forneça `TEST_MAILBOX_FILE` apontando a um JSON local que associa e-mails fictícios ao código recebido pelo capturador. Esse arquivo nunca deve ser versionado nem usado em produção.

Os testes verificam 320/360/375/390/430/1280 px, mural público/privado, identificação, Pix/QR, presença, painel, moderação, criação de lista, cadastro e análise axe de WCAG AA. Sem serviços locais configurados, os cenários são ignorados explicitamente. Capturas e traces ficam em `test-results/` (ignorado).

O helper `node scripts/local-qa.mjs` inicia o build de produção e um SMTP de captura apenas em loopback. Execute `npm run build` antes. Ele exige `TEST_DATABASE_URL` local e grava `.local/qa-mailbox.json`; em outro terminal, defina `TEST_MAILBOX_FILE` com o caminho absoluto desse arquivo e rode `npm run test:e2e`. O helper gera um segredo descartável em memória e não envia e-mails externos. Ele não é parte do runtime do produto.

Para testar a migração de dados legados, defina também `PSQL_BIN` com o executável psql local e rode `npm test`: um schema e papel temporários são criados dentro de uma transação e desfeitos, sem usar tabelas reais do schema público. Nunca use um banco compartilhado nesses testes.

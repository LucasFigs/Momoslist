# Atualização segura

Esta documentação descreve a operação do produto. Planejamento e resultados locais da sessão não são versionados.

## Preparação

1. Faça backup/snapshot do banco e ensaie a atualização em staging. Nunca execute `prisma migrate reset` nem `prisma db push` em produção.
2. Use Node 22.13+ da série 22, conforme `engines.node` do package.json; configure também o projeto Vercel para Node 22. Instale com `npm ci`; confirme as variáveis da `.env.example` sem copiar segredos para o Git. Mantenha `AUTH_SECRET` existente; não há necessidade de trocá-lo.
3. Confirme envio real pelo Gmail já configurado ou por `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` e `EMAIL_FROM_ADDRESS`. A autenticação exige entrega; falhas nunca liberam acesso sem prova. E-mails de cortesia continuam opcionais.
4. Verifique os callbacks Google `/api/auth/callback/google`. Vercel é um host confiável automaticamente; fora dela, configure o proxy e `AUTH_TRUST_HOST=true` apenas para hosts controlados.
5. A conexão Prisma deve ser do servidor e ter os direitos de proprietário/BYPASSRLS necessários. As tabelas de domínio e autenticação são server-only; clientes Supabase `anon` e `authenticated` não devem usá-las diretamente. A service role do Storage nunca pode aparecer no browser.

## Migrations

O projeto anterior não possuía histórico de migrations. Há uma baseline do schema anterior e três migrations aditivas:

- `00000000000000_baseline`: schema anterior, para bancos novos.
- `20261110000000_security_messages`: sessões opacas, desafios de identidade, limites persistentes, mural independente, visibilidade/moderação e snapshot de valores; sem exclusões.
- `20261110010000_domain_rls`: RLS nas tabelas de domínio/autenticação e revogação do acesso direto por papéis de API públicos. Nenhum registro é apagado.
- `20261110020000_contribution_idempotency`: chave opcional por tentativa de contribuição, com índice único por convidado. Registros antigos continuam válidos sem a chave; a interface nova a reutiliza ao repetir uma tentativa.

**Banco existente:** compare seu schema real com a baseline antes de qualquer comando. Se ele corresponder integralmente e ainda não houver histórico, marque apenas a baseline como já aplicada com `npx prisma migrate resolve --applied 00000000000000_baseline`. Isso não cria tabelas. Havendo divergências ou migrations já existentes, reconcilie o histórico em staging; não marque uma baseline por suposição.

Depois da conferência, execute `npm run db:deploy` no ambiente correto. Banco novo aplica as quatro migrations normalmente. Não copie as URLs locais de testes para produção. Em tabelas grandes, ensaie o tempo de criação do índice e os bloqueios em staging antes de abrir a janela de atualização.

Os SQLs de migration têm finais de linha LF definidos em `.gitattributes`, para preservar os mesmos bytes/checksums no Windows e na Vercel. Não edite migrations já aplicadas para resolver divergência de histórico: compare conteúdo e variantes de final de linha, identifique a origem e reconcilie explicitamente em staging. Não altere checksums diretamente em `_prisma_migrations`.

O backfill de `amountInCents` usa o preço atual do catálogo para reservas antigas: o sistema anterior não guardava valores históricos e eles não podem ser reconstruídos com certeza. Confira reservas/Pix pendentes com o extrato antes de liberar a versão. Novas reservas congelam o valor ao reservar; um trigger também protege inserções de instâncias antigas durante uma atualização gradual.

O código anterior ignora as novas opções de privacidade, por isso **não mantenha versões antigas servindo tráfego após ativar o mural novo**. Primeiro aplique as migrations, depois direcione o tráfego à versão nova. As alterações de schema são aditivas, mas o período de coexistência deve ser curto e supervisionado. Recadinhos antigos passam a privados por padrão, coerente com a política anteriormente publicada.

## Mudanças de comportamento

- Cookies antigos `guest_id` não autenticam mais ninguém. O convidado recupera seu histórico por código no e-mail, sem usar telefone como prova.
- Senhas antigas não verificadas não permitem login até a confirmação do e-mail com escolha de nova senha em `/cadastro`. A atualização ocorre no mesmo usuário, preservando suas listas.
- Contas Google e senha com mesmo e-mail não são vinculadas automaticamente. Use o método original. Uma futura associação explícita exigirá prova dos dois métodos.
- Escolher um método mantém a reserva temporária. Abrir as instruções marca a reserva como aguardando pagamento/compra: ela deixa de expirar automaticamente porque o pagamento pode ter ocorrido. Declarações e confirmações de Pix nunca expiram automaticamente. O organizador pode usar “Liberar escolha pendente” somente após conferir o extrato e conversar com o convidado; a operação recusa reservas com pagamento/compra informado. O organizador deve conferir pendências; o sistema não consulta bancos.
- Valores declarados de vaquinhas aparecem separados e não concluem metas. Valores confirmados podem ultrapassá-las.
- Presentes com qualquer histórico não podem ser apagados em cascata.

## Storage

Execute o SQL somente de leitura em `scripts/review-storage-security.sql` no projeto correto e revise as políticas existentes. O bucket de imagens continua público para leitura das imagens; não permita INSERT/UPDATE/DELETE anônimo ou por usuário sem checagem de propriedade. Uploads passam pelas Server Actions do proprietário, decodificam a imagem, limitam a 5 MiB/20 MP e reencodificam em WebP sem metadados. Mantenha a leitura dos JPG/PNG legados. As políticas reais do serviço não são verificadas sem acesso administrativo ao projeto; esta release não as modifica silenciosamente.

## Manutenção e rollback

Execute periodicamente `node scripts/cleanup-security-state.mjs` em um job existente e confiável para remover apenas sessões, desafios e limites expirados. Não registra e-mails, tokens ou endereços IP. Ajuste os limites após observar uso real, especialmente em redes compartilhadas; configure limites HTTP/WAF da Vercel para tráfego anônimo de grande volume.

Prefira corrigir e avançar. Para rollback de aplicação, use uma versão com as proteções de identidade/privacidade mantidas; voltar ao código antigo reabre vulnerabilidades e pode republicar recados privados. Não remova tabelas/colunas novas nem reverta o backfill, pois pode haver novos dados. Mantenha o banco expandido enquanto prepara a correção; restauração integral de backup exige uma janela e reconciliação dos registros feitos após o backup.

## Limites de validação

Login Google real depende do cliente OAuth e dos domínios da implantação; testes locais validam a configuração e o callback de identidade, sem usar contas pessoais. SMTP, políticas do Supabase, entregabilidade, WhatsApp iOS/Android e métricas reais de Core Web Vitals precisam de validação no ambiente de staging/produção. Uma varredura automática de acessibilidade não substitui testes manuais com leitores de tela.

## Gate de integração e ordem de publicação

Integrar a branch de produção pode iniciar um deploy automaticamente se o projeto Vercel estiver ligado ao Git. Um status Vercel no GitHub não comprova as configurações atuais de Branch Tracking, promoção automática, variáveis e domínios: confirme-as no projeto antes de autorizar push/merge. O build deste repositório não executa migrations; `postinstall` apenas gera o Prisma Client. Não coloque migrations no build de cada instância.

Ordem obrigatória, executada futuramente pelo responsável com acesso e autorização:

1. Inspecionar o projeto Vercel e seus domínios/branches/ambientes. Suspender promoção/publicação automática da versão nova antes de integrar. Preparar build candidato com ambiente correto, sem rotear tráfego, e confirmar como manter a aplicação antiga indisponível durante a janela. Não presumir que apenas trocar o domínio bloqueia URLs antigas de deployment ou jobs.
2. Obter snapshot autorizado, sanitizar fora de produção e comparar o schema real com a baseline. Usar `scripts/preflight-database-readonly.sql` somente com uma conexão explicitamente autorizada; guardar seu resultado localmente. Conferir histórico/checksums, índices, constraints, triggers, RLS, grants e papel de conexão Prisma.
3. Restaurar o backup em PostgreSQL isolado e executar o ensaio completo: baseline (somente se comprovada), expansão, preservação de dados/valores, privacidade de recados, contas antigas, testes concorrentes, grants/RLS e restauração de um backup já migrado. Registrar checksums dos dumps e tempos. Testes sintéticos não encerram este gate.
4. Configurar homologação isolada e validar OTP/SMTP, Google, cookies HTTPS, Storage e leitura de imagens. Conferir todo destino de e-mail e banco antes de gerar tráfego. Não usar service role de produção. Nenhuma imagem sanitizada deve conter dados reais.
5. Definir janela, responsável pela decisão, limite de tempo e critérios de abortar. Ativar manutenção/bloqueio de tráfego em todos os caminhos antigos, pausar jobs e drenar requisições e conexões antigas. Tirar backup consistente final e testar sua legibilidade/restauração antes de qualquer DDL. Guardar manifesto de schema/histórico/contagens e pendências financeiras para reconciliação.
6. Somente na janela autorizada, com a conexão direta confirmada e backup válido: se não houver histórico e a equivalência for exata, registrar **apenas** a baseline com `npx prisma migrate resolve --applied 00000000000000_baseline`. Se houver divergência/histórico diferente, abortar e reconciliar; não resolver por suposição. Executar uma única vez `npm run db:deploy`, nunca `db push`/reset. Capturar logs privados e conferir `npx prisma migrate status`.
7. Com tráfego ainda bloqueado, conferir quatro checksums/histórico, counts e conteúdo legado, privacidade false, snapshot de valores, trigger e índice de idempotência, RLS em todas as tabelas e acesso pelo papel Prisma real. Reconciliar preços antigos e Pix pendentes com o responsável; o catálogo não recupera valores históricos perdidos.
8. Ativar a versão nova mantendo `AUTH_SECRET`; executar smoke tests com identidades autorizadas de teste: conta verificada, recuperação legada, convidado, reserva, recado privado, RSVP e upload. Confirmar que instâncias antigas e URLs antigas não acessam o banco expandido. Liberar tráfego gradualmente só após aprovação e monitorar erros/SMTP/financeiro.
9. Se falhar antes de liberar, manter manutenção e parar writes. Corrigir e avançar ou restaurar em um banco separado e reconciliar os dados; só trocar a conexão após validação e decisão do responsável. Se já houve writes, reconciliar todas as alterações posteriores ao backup antes de qualquer restauração. Nunca apontar tráfego para a versão antiga vulnerável, nunca remover colunas novas nem promover mensagens privadas para destravar rollback.

**Bloqueio de instâncias antigas:** retirar um alias ou mudar variáveis do projeto não garante que deployments antigos parem de usar a conexão que receberam. O RLS também não impede que código antigo com papel proprietário/BYPASSRLS leia os recados. Antes de liberar, o responsável deve comprovar o bloqueio desses runtimes, preferencialmente com papel/conexão novos para a aplicação e retirada efetiva do acesso antigo, incluindo conexões já abertas. Se o papel antigo também for administrativo, não revogue privilégios às cegas: planeje a segregação e o encerramento de sessões com o administrador. Qualquer rotação/revogação futura de credencial de banco exige autorização própria e procedimento testado; não envolve trocar `AUTH_SECRET`. Sem comprovar que uma URL antiga não acessa os dados migrados, mantenha NO-GO.

## Preview por CLI, sem push

A CLI permite Preview sem GitHub, mas a publicação é externa e exige autorização específica. Prefira projeto Vercel exclusivo de homologação, sem integração Git ou domínios de produção, com PostgreSQL/Supabase/SMTP/OAuth próprios. Não use deployment temporário anônimo para contornar ausência de acesso.

Após autenticação humana e comprovação dos destinos isolados: `vercel link --project <projeto-de-homologacao> --scope <equipe>`. Inspecione no painel o Project ID/ambiente e todas as bindings de Preview antes de baixar variáveis ou publicar. Compare hosts e identificadores com os de produção sem imprimir segredos. Confirme credenciais de banco, service role e segredo Auth independentes. Use SMTP de sandbox/captura, destinatários sintéticos e bucket exclusivo. O build local com fixtures não testa os serviços externos.

Somente após essa revisão e autorização: `vercel deploy --target=preview --scope <equipe>`. Não usar `--prod`, aliases de produção ou variáveis de produção; não promover um Preview com banco de teste. `.vercelignore` exclui `.local`, dumps, relatórios de teste, arquivos `.env` e chaves privadas da fonte enviada. O relatório privado também fica fora do diretório do projeto.

Registre URL/Deployment ID e confirme target Preview, banco e logs, sem segredos, antes dos testes remotos. Google depende do callback registrado `/api/auth/callback/google`; valide novo cadastro, método original, e-mail verificado e rejeição de vinculação automática. Teste OTP correto/errado/expirado/reutilizado, recuperação legada, cookies Secure/HttpOnly/SameSite, sessão do convidado, acesso cruzado negado, upload sanitizado/leitura e escrita anônima negada no Storage. Sem estas credenciais e resultados, homologação externa permanece pendente.

# Atualização segura

Esta documentação descreve a operação do produto. Planejamento e resultados locais da sessão não são versionados.

## Preparação

1. Faça backup/snapshot do banco e ensaie a atualização em staging. Nunca execute `prisma migrate reset` nem `prisma db push` em produção.
2. Use Node 22.13+ (ou Node 24 LTS). Instale com `npm ci`; confirme as variáveis da `.env.example` sem copiar segredos para o Git. Mantenha `AUTH_SECRET` existente; não há necessidade de trocá-lo.
3. Confirme envio real pelo Gmail já configurado ou por `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` e `EMAIL_FROM_ADDRESS`. A autenticação exige entrega; falhas nunca liberam acesso sem prova. E-mails de cortesia continuam opcionais.
4. Verifique os callbacks Google `/api/auth/callback/google`. Vercel é um host confiável automaticamente; fora dela, configure o proxy e `AUTH_TRUST_HOST=true` apenas para hosts controlados.
5. A conexão Prisma deve ser do servidor e ter os direitos de proprietário/BYPASSRLS necessários. As tabelas de domínio e autenticação são server-only; clientes Supabase `anon` e `authenticated` não devem usá-las diretamente. A service role do Storage nunca pode aparecer no browser.

## Migrations

O projeto anterior não possuía histórico de migrations. Há uma baseline do schema anterior e duas migrations aditivas:

- `00000000000000_baseline`: schema anterior, para bancos novos.
- `20261110000000_security_messages`: sessões opacas, desafios de identidade, limites persistentes, mural independente, visibilidade/moderação e snapshot de valores; sem exclusões.
- `20261110010000_domain_rls`: RLS nas tabelas de domínio/autenticação e revogação do acesso direto por papéis de API públicos. Nenhum registro é apagado.

**Banco existente:** compare seu schema real com a baseline antes de qualquer comando. Se ele corresponder integralmente e ainda não houver histórico, marque apenas a baseline como já aplicada com `npx prisma migrate resolve --applied 00000000000000_baseline`. Isso não cria tabelas. Havendo divergências ou migrations já existentes, reconcilie o histórico em staging; não marque uma baseline por suposição.

Depois da conferência, execute `npm run db:deploy` no ambiente correto. Banco novo aplica as três migrations normalmente. Não copie as URLs locais de testes para produção.

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

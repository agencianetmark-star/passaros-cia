# Conexao Supabase + Dominio

## 1) Conectar banco Supabase ao Prisma

1. Crie um projeto no Supabase.
2. No painel Supabase:
   - `Project Settings > Database`
   - copie a string de conexao **pooler** (`6543`).
3. Atualize `.env`:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ou `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `SUPABASE_SECRET_KEY` (ou `SUPABASE_SERVICE_ROLE_KEY`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Rode:
   - `npm run prisma:generate`
   - `npx prisma migrate dev --name init` (local) ou `npx prisma migrate deploy` (producao)
5. Opcional para seed inicial:
   - `npm run prisma:seed`

## 2) Supabase Auth e sessao

- O projeto ja esta preparado com:
  - `middleware.ts`
  - `lib/supabase/browser.ts`
  - `lib/supabase/server.ts`
  - `lib/supabase/admin.ts`
- Se as variaveis estiverem preenchidas, `getCurrentUser()` passa a usar Supabase Auth automaticamente.
- Sem variaveis, o sistema continua com fallback demo.

## 3) Storage no Supabase

1. Crie bucket `bird-media`.
2. Defina politica RLS:
   - leitura publica para arquivos de ficha publica
   - escrita autenticada por dono do criatorio
3. Configure `STORAGE_BASE_URL` para o endpoint do bucket.

## 4) Deploy e dominio (Vercel)

1. Crie projeto na Vercel apontando para o repo GitHub.
2. Configure as env vars de producao com os mesmos nomes do `.env.example`.
3. Em `Settings > Domains`, adicione:
   - `seudominio.com`
   - `www.seudominio.com`
4. Configure DNS no registrador do dominio:
   - `A` para apex (`@`) -> `76.76.21.21` (Vercel)
   - `CNAME` para `www` -> `cname.vercel-dns.com`
5. Aguarde propagacao e valide HTTPS automatico na Vercel.

## 5) Checklist rapido de go-live

- `npm run typecheck` sem erros
- `npm run lint` sem erros
- migracoes aplicadas no Supabase
- login Supabase funcionando
- rota publica `/public/birds/[slug]` abrindo sem login
- dominio com SSL ativo

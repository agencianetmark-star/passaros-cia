# [NOME DO SISTEMA]

SaaS web mobile-first para criadores de passaros, com foco em:
- controle completo do plantel
- genetica e genealogia visual
- cadastro guiado de aves
- gestao de anilhas
- compartilhamento publico de fichas por link

## Stack definida

- Frontend: Next.js (App Router) + TypeScript
- UI: Tailwind CSS + design system componentizado
- Estado local: Zustand + React Hook Form
- Validacao: Zod
- Graficos: Recharts
- Backend/API: Next Route Handlers (preparado para migrar para Nest)
- Banco: PostgreSQL
- ORM: Prisma
- Auth: camada de sessao preparada (`lib/auth/session.ts`)
- Supabase: clientes browser/server/admin + middleware de sessao
- Storage: preparado para URLs de midia e futuro provider S3/R2/Cloudinary

## Estrutura de pastas

```txt
app/
  (private)/
    dashboard/
    birds/
    flock/
    rings/
  public/birds/[slug]
  api/
components/
  layout/
  ui/
features/
  dashboard/
  birds/
  pedigree/
  flock/
  rings/
  public-profile/
lib/
  auth/
  mappers/
  services/
  validators/
hooks/
services/
types/
utils/
prisma/
styles/
docs/
```

## Paginas prioritarias implementadas

- `/dashboard`: painel principal do criador com KPIs, atalhos e graficos
- `/birds/new`: cadastro de aves por etapas com preview
- `/birds/[birdId]`: ficha premium interna da ave
- `/public/birds/[slug]`: ficha publica compartilhavel sem login
- `/birds/[birdId]/pedigree`: arvore genealogica interativa (horizontal/vertical + zoom)
- `/flock`: visao do plantel com grid visual, busca e filtros
- `/rings`: modulo de anilhas com indicadores, lotes e timeline

## APIs base (reuso para app mobile)

- `GET /api/dashboard`
- `GET /api/birds`
- `POST /api/birds`
- `GET /api/birds/[birdId]`
- `PATCH /api/birds/[birdId]`
- `POST /api/birds/[birdId]/share-links`
- `GET /api/public/birds/[slug]`
- `GET /api/rings`

## Regras de negocio aplicadas na base

- cada criador enxerga apenas as aves do proprio `breederId`
- anilha nao pode ser reutilizada no mesmo criador
- vinculo de pai/mae exige aves do mesmo criador
- ficha publica depende de `isPublic` e link ativo
- genealogia usa relacionamento pai/mae e abre caminho para calculo completo em `bird_genealogy`
- idade e calculada automaticamente na camada de exibicao
- estrutura pronta para eventos/notificacoes com `breeder_updates` e `notifications`

## Banco de dados

Schema Prisma completo em [`prisma/schema.prisma`](./prisma/schema.prisma) com os modulos:

- `users`
- `breeder_profiles`
- `birds`
- `bird_media`
- `bird_genealogy`
- `bird_mutations`
- `bird_achievements`
- `pairings`
- `nests`
- `offspring`
- `ring_batches`
- `ring_usage`
- `public_share_links`
- `breeder_updates`
- `notifications`

## Executar local

1. `cp .env.example .env`
2. configurar `DATABASE_URL` PostgreSQL
3. `npm install`
4. `npm run prisma:generate`
5. `npm run dev`

## Escalabilidade para app

- contratos REST ja desacoplados em `app/api`
- camada de servicos centralizada em `lib/services`
- mapeamento de view model separado em `lib/mappers`
- design system reaproveitavel para web + React Native via adaptacao de componentes

## Operacao de producao

- runbook Supabase + dominio: [`docs/supabase-domain.md`](./docs/supabase-domain.md)

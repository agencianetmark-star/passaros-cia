# Arquitetura Fase 1

## Objetivo de produto

Entregar a area do criador com foco em:
- controle de plantel
- cadastro de aves
- ficha premium
- compartilhamento por link
- genealogia visual
- anilhas
- analytics mobile-first

## Principios arquiteturais

- TypeScript end-to-end
- separacao por dominio (`features/*`)
- UI componentizada e reutilizavel (`components/ui`)
- camada de servico desacoplada (`lib/services`)
- APIs para reuso por app mobile
- modelos de dados preparados para crescimento

## Fluxo de navegacao principal

1. Criador entra no `Dashboard`
2. Atalho "Cadastrar ave" abre `birds/new`
3. Salvar gera nova ficha em `birds/[birdId]`
4. Criador gera link publico em `POST /api/birds/[birdId]/share-links`
5. Terceiros acessam `public/birds/[slug]` sem login
6. Criador navega para arvore `birds/[birdId]/pedigree`
7. Criador monitora estoque e uso de anilhas em `rings`

## Contratos de dados importantes

### Bird (core)
- identificacao: `id`, `breeder_id`, `ring_number`
- perfil: `name`, `species`, `sex`, `birth_date`
- genetica: `visible_mutation`, `carrier_mutations`, `probable_mutations`, `genetic_confidence`
- genealogia: `father_id`, `mother_id`
- negocio: `reproductive_status`, `is_public`, `is_featured`

### Public share
- `public_share_links.slug` unico
- `is_active` + `expires_at` controlam acesso
- `allowed_sections` prepara privacidade por secao

### Ring usage
- `ring_usage` registra vinculo com ave ou filhote
- restricao `@@unique([breederId, ringNumber])` evita anilha livre e usada ao mesmo tempo

## Regras de negocio desta fase

- isolamento por criador em todas as leituras/escritas
- pai/mae devem ser aves do mesmo criador
- anilha unica por criador
- ficha publica apenas para ave marcada como publica
- alteracoes relevantes devem gerar evento em `breeder_updates`

## Pronto para fase 2

- troca de sessao mock por provider real (NextAuth/Clerk/Auth.js)
- migrar dados mock para Prisma services
- storage real para midia
- jobs de genealogia para preencher `bird_genealogy`
- notificacoes assicronas (fila) com alertas de estoque e genealogia
- app mobile consumindo as mesmas rotas

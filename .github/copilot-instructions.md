# Bonicup — Instruções para IA

## Contexto do projecto

Preview estática de uma aplicação de gestão de torneios de futebol para um clube.
O objectivo é impressionar o cliente — dados hardcoded, zero backend, design polido.
Se o cliente aceitar, este projecto evolui para produto completo (ver secção "Evolução").

---

## Stack obrigatória

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| Linguagem | TypeScript | strict mode |
| Estilos | Tailwind CSS | v4 |
| Componentes | shadcn/ui | latest |
| Data fetching | TanStack Query | v5 |
| Forms | React Hook Form + Zod | latest |
| Ícones | Lucide React | latest |
| Utilitários | clsx + tailwind-merge via `cn()` | latest |
| Deploy | Vercel | — |

## O que NUNCA usar

- Firebase, Firestore, Supabase, Redux
- FontAwesome, Axios, CSS-in-JS, styled-components, Emotion
- `any` em TypeScript — usar tipos explícitos sempre
- `useEffect` para data fetching — usar TanStack Query
- Inline styles — usar classes Tailwind

---

## Regras de TypeScript

```ts
// tsconfig.json deve ter:
{
  "compilerOptions": {
    "strict": true
  }
}

// Nunca:
const foo: any = ...
// Sempre:
const foo: Tournament = ...
```

---

## Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx                  # layout raiz com navbar
│   ├── page.tsx                    # home — torneios activos
│   ├── torneio/
│   │   └── [id]/
│   │       ├── page.tsx            # lista de categorias
│   │       └── [categoryId]/
│   │           └── page.tsx        # classificações + jogos + eliminatórias
│   ├── equipas/
│   │   └── page.tsx
│   ├── jogos/
│   │   └── page.tsx
│   └── admin/
│       ├── layout.tsx              # sidebar admin
│       ├── page.tsx                # dashboard
│       ├── equipas/page.tsx
│       └── resultados/page.tsx
├── components/
│   ├── ui/                         # shadcn/ui (não editar directamente)
│   ├── navbar.tsx
│   ├── standings-table.tsx
│   ├── match-card.tsx
│   ├── bracket.tsx
│   └── category-card.tsx
├── data/                           # dados hardcoded — único ponto de troca futuro
│   ├── tournaments.ts
│   ├── categories.ts
│   ├── teams.ts
│   ├── matches.ts
│   └── standings.ts
├── lib/
│   └── utils.ts                    # cn() e helpers
└── types/
    └── index.ts                    # todos os tipos TypeScript
```

---

## Tipos base (types/index.ts)

```ts
export type Tournament = {
  id: number
  name: string
  location: string
  dates: string
  edition: string
  status: "active" | "finished"
  totalCategories: number
  totalTeams: number
}

export type Category = {
  id: number
  tournamentId: number
  name: string
  ageGroup: string
  format: "F7" | "F11"
  groups: number
  teams: number
}

export type Team = {
  id: number
  name: string
  countryCode: "PT" | "ES" | "FR" | "EN" | string
  categoryId: number
  group: string
}

export type Match = {
  id: number
  categoryId: number
  group: string | "SF" | "F"         // grupo ou fase eliminatória
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  time: string
  venue: string
  phase: "group" | "semi" | "final"
}

export type StandingRow = {
  position: number
  teamName: string
  countryCode: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  qualified: boolean
}
```

---

## Cor de acento principal

```ts
// Teal-600 do sistema — usar sempre esta referência
// Tailwind: text-teal-600 / bg-teal-600 / border-teal-600
// Hex de referência: #0F766E
```

Nunca hardcodar o hex. Usar sempre classes Tailwind.

---

## Dados hardcoded (preview)

Todos os dados vivem em `/src/data/`. Exemplo mínimo:

```ts
// src/data/tournaments.ts
import type { Tournament } from "@/types"

export const tournaments: Tournament[] = [
  {
    id: 35,
    name: "Bonicup Algarve 2026",
    location: "Albufeira, Portugal",
    dates: "28–29 Mar 2026",
    edition: "8ª Edição",
    status: "active",
    totalCategories: 14,
    totalTeams: 114,
  },
]
```

Os dados do torneio real a usar são do **Bonicup Algarve 2026**:
- 14 categorias, 114 equipas, 2 dias (28–29 Mar 2026)
- Categoria com dados completos: **Prebenjamín** (2 grupos, 8 equipas, semifinais e final completos)
- Campeão Prebenjamín: **Sporting CP** (venceu a final 4–0 contra CD Toro)

---

## Regras de componentes

```tsx
// Usar cn() para classes condicionais — nunca template literals
import { cn } from "@/lib/utils"

<div className={cn("base-class", condition && "conditional-class")} />

// Nunca:
<div className={`base-class ${condition ? "conditional-class" : ""}`} />
```

Cada componente deve ter o seu tipo de props explícito:

```tsx
type MatchCardProps = {
  match: Match
  compact?: boolean
}

export function MatchCard({ match, compact = false }: MatchCardProps) { ... }
```

---

## Páginas obrigatórias

### Públicas
| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Home` | Torneio activo, stats, últimos resultados |
| `/torneio/[id]` | `TorneioDetail` | Grid de categorias |
| `/torneio/[id]/[categoryId]` | `CategoryDetail` | Tabs: Classificações / Jogos / Eliminatórias |
| `/equipas` | `Equipas` | Lista de equipas com filtro por categoria |
| `/jogos` | `Jogos` | Lista de jogos com filtro por grupo/fase |

### Admin (preview — sem autenticação real)
| Rota | Componente | Descrição |
|---|---|---|
| `/admin` | `AdminDashboard` | Stats resumo + actividade recente |
| `/admin/equipas` | `AdminEquipas` | Form adicionar equipa + lista |
| `/admin/resultados` | `AdminResultados` | Form inserir resultado |

---

## Bracket de eliminatórias

Visualização obrigatória na tab "Eliminatórias":

```
Semifinal 1: Unión Manilva CF 1–2 CD Toro ──┐
                                              ├─ Final: CD Toro 0–4 Sporting CP
Semifinal 2: Sporting CP 4–1 SL Benfica ─────┘
                                              └─ Campeão: Sporting CP
```

Implementar como componente `<Bracket />` com layout horizontal usando flexbox.
O vencedor de cada jogo deve ter destaque visual (bold + cor de acento).

---

## Paleta de cores (Tailwind)

| Uso | Classe |
|---|---|
| Acento principal | `teal-600` |
| Acento fundo suave | `teal-50` |
| Qualificado (standings) | `bg-teal-50` |
| País Portugal | `blue-100 text-blue-800` |
| País Espanha | `amber-100 text-amber-800` |
| Admin sidebar activo | `bg-teal-50 text-teal-700` |

---

## Evolução para produto completo

Quando o cliente aceitar, a única camada a trocar é `/src/data/*.ts`:

| Preview | Produto final |
|---|---|
| `/src/data/*.ts` (hardcoded) | Turso (libSQL) via `@libsql/client` |
| Sem auth | Clerk |
| Sem storage | Cloudflare R2 |
| Vercel | Vercel (igual) |

**O frontend React não muda.** Só a origem dos dados.

Para a base de dados, usar **Turso** — não Supabase. Motivo: o Supabase free tier tem
limite de 5 GB de cached egress/mês que foi atingido em produção com um único torneio
pequeno. O Turso free tier oferece 500 M rows lidas/mês, não mede egress, nunca expira,
e suporta até 500 DBs isoladas — uma por cliente, ideal para arquitectura white-label.

---

## O que NÃO fazer

- Não criar backend nesta fase (preview = zero backend)
- Não usar `useState` para dados — os dados vêm de `/src/data/`
- Não misturar lógica de negócio com componentes de UI
- Não criar ficheiros CSS separados — tudo em Tailwind
- Não instalar bibliotecas não listadas sem consultar primeiro
- Não usar `export default` em ficheiros de dados — usar named exports
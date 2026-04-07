# Bonicup — Instrucciones para IA

## Contexto del proyecto

Preview estática de una aplicación de gestión de torneos de fútbol para un club español.
El objetivo es impresionar al cliente — datos hardcoded, cero backend, diseño pulido.
Si el cliente acepta, este proyecto evoluciona a producto completo (ver sección "Evolución").

---

## Idioma de la interfaz

**Todo el texto visible en la UI debe estar en español.**
Esto incluye: labels, botones, placeholders, mensajes de error, títulos de página,
navegación, badges y cualquier string que el usuario final vea.
Los nombres de variables, funciones y comentarios en el código pueden estar en inglés.

Términos correctos:
- "Equipos" · "Clasificación" · "Inicio" · "Partidos" · "Grupos" · "Campeón"
- "Insertar resultado" · "Guardar Resultado" · "Sede / Campo"
- "Equipo Local" · "Equipo Visitante" · "Marcar como finalizado"
- Tabs de categoría: **Clasificación | Partidos | Cuadro** (nunca "Eliminatorias")
- Navegación: **Inicio · Torneo · Clasificaciones · Equipos · Admin**

---

## Stack obligatorio

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| Lenguaje | TypeScript | strict mode |
| Estilos | Tailwind CSS | v4 |
| Componentes | shadcn/ui | latest |
| Data fetching | TanStack Query | v5 |
| Forms | React Hook Form + Zod | latest |
| Iconos | Lucide React | latest |
| Utilidades | clsx + tailwind-merge via `cn()` | latest |
| Deploy | Vercel | — |

## Lo que NUNCA usar

- Firebase, Firestore, Supabase, Redux
- FontAwesome, Axios, CSS-in-JS, styled-components, Emotion
- `any` en TypeScript — usar tipos explícitos siempre
- `useEffect` para data fetching — usar TanStack Query
- Inline styles — usar clases Tailwind
- `export default` en archivos de datos — usar named exports
- Colores en hex hardcodeados — solo clases Tailwind

---

## Design system (basado en diseño Stitch aprobado)

> Seguir este sistema en TODOS los componentes y páginas sin excepción.
> Referencia visual: 4 pantallas aprobadas — Home gestión, Home pública, Clasificación, Admin.

### Colores

| Token | Clase Tailwind | Uso |
|---|---|---|
| Verde oscuro principal | `bg-emerald-900` / `text-emerald-900` | Botones CTA, sidebar activo, card destacada, score ganador |
| Verde medio acento | `text-emerald-700` / `bg-emerald-700` | Links activos navbar, botón hero |
| Verde claro título | `text-teal-600` | Palabra clave en títulos editoriales |
| Fondo página | `bg-stone-50` | Background de todas las páginas |
| Superficie card | `bg-white` | Cards blancas |
| Borde card | `border border-gray-200` | Borde sutil en cards |
| Score ganador | `bg-emerald-900 text-white` | Marcador del equipo que gana |
| Score perdedor | `bg-gray-100 text-gray-400` | Marcador del equipo que pierde |
| Label uppercase | `text-xs text-gray-400 uppercase tracking-widest` | Labels de sección |
| GA negativo | `text-red-500` | Goal average negativo en clasificación |
| GA positivo | `text-emerald-700` | Goal average positivo en clasificación |
| Fila clasificado | `bg-teal-50` | Top 2 filas en standings |

### Tipografía

Fuente: Geist Sans (ya instalada por create-next-app).

```
Títulos editoriales grandes (hero, nombre torneo):
  font-black text-5xl md:text-7xl leading-none
  Palabra clave en text-teal-600, resto en text-emerald-900 o text-white
  Ejemplo: <h1>ELITE <span className="text-teal-600">SUMMER</span> SERIES</h1>

Labels de sección sobre cards o formularios:
  text-xs font-medium tracking-widest uppercase text-gray-400
  Ejemplo: "TORNEO INTERNACIONAL DE FÚTBOL BASE" · "COPA ORO" · "CATEGORÍA ESTRELLA"

Números estadísticos grandes (stats de la página):
  text-6xl font-black text-emerald-900
  Label debajo: text-xs tracking-widest uppercase text-gray-400
  Ejemplo: "76" + "EQUIPOS TOTALES"
```

### Fondo y superficies

- Fondo general de todas las páginas: `bg-stone-50`
- Cards: `bg-white rounded-2xl border border-gray-200`
- Cards grandes con más padding: `p-6` — cards compactas: `p-4`

---

## Componentes por pantalla

### Navbar

```
Contenedor: bg-white border-b border-gray-200 sticky top-0 z-50
Logo: "Bonicup" — text-xl font-bold text-emerald-900
Links: text-sm text-gray-600 hover:text-emerald-900 transition-colors
Link activo: text-emerald-900 font-medium underline underline-offset-4 decoration-emerald-700
Derecha: input búsqueda (rounded-full bg-stone-100) + icono Bell + icono User (avatar círculo)
```

### Category cards (página del torneo)

**Card normal (blanca):**
```
bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-700 transition-colors cursor-pointer

Estructura interna:
  - Label: text-xs uppercase tracking-widest text-gray-400 mb-1  (ej: "COPA ORO")
  - Nombre: text-xl font-bold text-emerald-900 mb-4
  - Stats en grid 2 columnas:
      Label stat: text-xs uppercase tracking-widest text-gray-400  (GRUPOS / INSCRITOS)
      Valor stat: text-2xl font-bold text-emerald-900
  - Footer: "Ver detalles →" text-sm text-emerald-700 mt-4
```

**Card destacada (teal oscura, featured: true):**
```
bg-emerald-900 rounded-2xl p-6 text-white

  - Label: text-xs uppercase tracking-widest text-emerald-300
  - Nombre: text-xl font-bold text-white
  - Stats: misma estructura pero text-emerald-300 para labels, text-white para valores
  - Footer: "Gestionar Eliminatorias ↗" text-sm text-emerald-300
```

**Card "Nueva Categoría" (dashed):**
```
rounded-2xl border-2 border-dashed border-gray-200 p-6
flex flex-col items-center justify-center gap-2 text-center

  - Icono "+" en círculo: bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center
  - Título: text-sm font-medium text-gray-600
  - Descripción: text-xs text-gray-400
```

### Hero (página pública del torneo)

```
Contenedor: relative min-h-[60vh] flex items-end pb-12
Imagen de fondo estadio: object-cover con overlay bg-black/50

Contenido (sobre el overlay, padding lateral):
  - Label: text-xs uppercase tracking-widest text-gray-300  (ej: "EDICIÓN ALBUFEIRA 2026")
  - Título: text-5xl font-black text-white leading-tight
  - Metadata: flex gap-4 text-sm text-gray-300 mt-2
      icono MapPin + "Albufeira, Portugal"
      icono Calendar + "28–29 Mar 2026"
  - CTA: bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg
          font-medium text-sm uppercase tracking-wide mt-6

Stat cards debajo del hero (3 cards blancas en fila):
  bg-white rounded-2xl border border-gray-200 p-6
  Label: text-xs uppercase tracking-widest text-gray-400
  Número grande: text-4xl font-black text-emerald-900
  Subtítulo: text-sm text-gray-500
  Icono derecha: text-gray-300
```

### Match row (últimos resultados)

```
Fila: flex items-center justify-between py-3 border-b border-gray-100

Estructura:
  [icono escudo gris] Nombre equipo local     [score local] : [score visitante]    Nombre equipo visitante [icono escudo gris]

Nombre equipo: text-sm font-medium text-emerald-900 (ganador) / text-gray-400 (perdedor)
Score boxes:
  Ganador: bg-emerald-900 text-white px-3 py-1.5 rounded-md font-mono font-bold text-sm
  Perdedor: bg-gray-100 text-gray-400 px-3 py-1.5 rounded-md font-mono font-bold text-sm
  Empate: ambos bg-emerald-900 text-white
Separador ":" entre scores: text-gray-400 mx-1
```

### Standings table (clasificación)

```
Card contenedor: bg-white rounded-2xl border border-gray-200 p-0 overflow-hidden
Header: flex justify-between items-center px-6 py-4 border-b border-gray-100
  Título: "Clasificación Grupo A" font-bold text-emerald-900
  Icono info: text-gray-400

Columnas: POS | EQUIPO | PAÍS | PJ | PG | PE | PP | GF | GC | GA | PTS

POS: "01" "02" "03" "04" — text-sm text-gray-400 w-8 (cero-padded con .toString().padStart(2,'0'))
EQUIPO: flex items-center gap-2
  Avatar: w-8 h-8 rounded-full bg-stone-100 text-emerald-900 text-xs font-bold
          flex items-center justify-center
  Nombre: text-sm font-medium text-emerald-900
PAÍS badge:
  ES: bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded font-medium
  PT: bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded font-medium
Números: text-sm text-center text-gray-600
GA positivo: text-emerald-700 font-medium
GA negativo: text-red-500 font-medium
PTS: text-sm font-bold text-emerald-900

Filas qualified (top 2): bg-teal-50
Pie de tabla: text-xs text-gray-400 px-6 py-3
  "Los 2 primeros clasificados avanzan a eliminatorias"
```

### Bracket / Cuadro (panel lateral o tab)

```
Contenedor: bg-white rounded-2xl border border-gray-200 p-4

Sección "SEMIFINALES":
  Label: text-xs uppercase tracking-widest text-gray-400 mb-3
  Dos match cards apiladas (gap-2):
    Card: bg-stone-50 rounded-xl p-3
    Fila equipo: flex justify-between items-center py-1
      Izquierda: avatar iniciales (w-6 h-6 rounded-full bg-white border text-xs)
                 + nombre (text-sm)
      Derecha: score (text-sm font-bold)
    Ganador: text-emerald-900 font-medium
    Perdedor: text-gray-400

Sección "GRAN FINAL" (con icono trofeo):
  Label: text-xs uppercase tracking-widest text-gray-400 mb-3
  Card destacada: bg-emerald-900 rounded-xl p-4
    flex justify-between items-center:
      Avatar equipo local: w-10 h-10 rounded-full bg-emerald-700 text-white font-bold
      "VS" text-white font-black text-lg mx-auto
      Avatar equipo visitante: igual
    Nombres debajo de avatares: text-xs text-emerald-300 uppercase
    Badge estado: bg-emerald-700 text-white text-xs px-2 py-0.5 rounded-full
      "EN JUEGO" o "FINALIZADO"
```

### Admin sidebar

```
Contenedor: w-64 bg-white border-r border-gray-200 flex flex-col h-screen

Header label: text-xs uppercase tracking-widest text-gray-400 px-4 pt-6 pb-2
  "GESTIÓN PRINCIPAL"

Links (con iconos Lucide):
  - Dashboard       → icono LayoutDashboard
  - Torneos         → icono Trophy
  - Categorías      → icono BarChart2
  - Equipos         → icono Users
  - Resultados      → icono ClipboardList

Estado inactivo: flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600
                 hover:bg-stone-50 rounded-lg mx-2 transition-colors
Estado activo:   flex items-center gap-3 px-3 py-2.5 text-sm text-white font-medium
                 bg-emerald-900 rounded-lg mx-2

Footer del sidebar (mt-auto):
  Card: bg-gray-50 rounded-xl mx-3 mb-4 p-3
    Label: "ESTADO DEL TORNEO" text-xs uppercase text-gray-400 mb-1
    Valor: "Fase de Grupos Activa" text-sm font-medium text-emerald-900
    Progress bar: w-full bg-gray-200 rounded-full h-1 mt-2
      Inner: bg-emerald-900 h-1 rounded-full (style={{ width: '45%' }})
```

### Admin form "Insertar resultado"

```
Layout: sidebar (w-64) + área principal (flex-1 bg-stone-50 p-8)

Header:
  Label: "ADMINISTRACIÓN DE PARTIDOS" text-xs uppercase tracking-widest text-gray-400
  Título: "Insertar resultado" text-3xl font-bold text-emerald-900
  Descripción: text-sm text-gray-500 mt-1 max-w-lg

Card equipos (border-l-4 border-emerald-900):
  bg-white rounded-2xl border border-gray-200 p-6
  Layout: [Select local] [  0  ] : [  0  ] [Select visitante]
  Labels encima: "EQUIPO LOCAL" y "EQUIPO VISITANTE" en text-xs uppercase text-gray-400
  Score inputs: w-16 h-16 text-3xl font-bold text-center bg-gray-100 rounded-xl
                border-none outline-none focus:bg-stone-50

Grid de 2 cards en fila:

Card "DETALLES DEL ENCUENTRO":
  Header: icono Calendar + "DETALLES DEL ENCUENTRO" text-xs uppercase text-gray-500
  Campos: Fecha (date) | Hora (time) — en grid 2 cols
  Sede/Campo: input text-sm (debajo, ancho completo)
  Labels de campo: text-xs text-gray-500 mb-1

Card "CLASIFICACIÓN":
  Header: icono Settings + "CLASIFICACIÓN" text-xs uppercase text-gray-500
  Select Categoría: shadcn Select
  Toggle: flex items-center gap-2 mt-3
    Switch (shadcn) + "Marcar como finalizado" text-sm text-gray-600

Botón guardar (fuera de las cards, ancho completo):
  bg-emerald-900 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold text-sm
  flex items-center justify-center gap-2
  icono Save + "Guardar Resultado"

Card aviso (bg-blue-50 border border-blue-100 rounded-xl p-4):
  flex gap-3:
    icono Info text-blue-500
    div:
      "Aviso de Sincronización" text-sm font-medium text-blue-900
      texto explicativo text-xs text-blue-700
```

---

## Estructura de carpetas

```
src/
├── app/
│   ├── layout.tsx                  # layout raíz con navbar
│   ├── page.tsx                    # home pública con hero + stats + resultados
│   ├── torneo/
│   │   └── [id]/
│   │       ├── page.tsx            # grid de categorías
│   │       └── [categoryId]/
│   │           └── page.tsx        # tabs: Clasificación / Partidos / Cuadro
│   ├── equipos/
│   │   └── page.tsx
│   ├── partidos/
│   │   └── page.tsx
│   └── admin/
│       ├── layout.tsx              # sidebar admin
│       ├── page.tsx                # dashboard
│       ├── equipos/page.tsx
│       └── resultados/page.tsx
├── components/
│   ├── ui/                         # shadcn/ui (no editar directamente)
│   ├── navbar.tsx
│   ├── standings-table.tsx
│   ├── match-row.tsx
│   ├── bracket.tsx
│   └── category-card.tsx
├── data/                           # datos hardcoded — único punto de cambio futuro
│   ├── tournaments.ts
│   ├── categories.ts
│   ├── teams.ts
│   ├── matches.ts
│   └── standings.ts
├── lib/
│   └── utils.ts                    # cn() y helpers
└── types/
    └── index.ts                    # todos los tipos TypeScript
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
  phase: string
  totalCategories: number
  totalTeams: number
  totalMatches: number
}

export type Category = {
  id: number
  tournamentId: number
  name: string
  ageGroup: string
  format: "F7" | "F11"
  groups: number
  teams: number
  label?: string       // ej: "COPA ORO", "CATEGORÍA ESTRELLA"
  featured?: boolean   // true = card emerald-900
}

export type Team = {
  id: number
  name: string
  initials: string     // 2 letras para avatar (ej: "AM", "SV")
  countryCode: "PT" | "ES" | "FR" | "EN" | "DE" | "IT" | string
  categoryId: number
  group: string
}

export type Match = {
  id: number
  categoryId: number
  group: string
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
  teamInitials: string
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

## Datos hardcoded (preview)

```ts
// src/data/tournaments.ts
import type { Tournament } from "@/types"

export const tournaments: Tournament[] = [
  {
    id: 35,
    name: "Bonicup Algarve 2026",
    location: "Albufeira, Portugal",
    dates: "28–29 Mar 2026",
    edition: "8ª Edición",
    status: "active",
    phase: "Fase de Grupos en curso",
    totalCategories: 14,
    totalTeams: 114,
    totalMatches: 96,
  },
]
```

Datos del torneio real — **Bonicup Algarve 2026**:
- 14 categorías · 114 equipos · 2 días (28–29 Mar 2026)
- Categoría con datos completos: **Prebenjamín** (id 451) — 2 grupos, 8 equipos, semifinales y final
- Campeón Prebenjamín: **Sporting CP** (ganó la final 4–0 vs CD Toro)

Equipos Prebenjamín con sus iniciales:
- CD Nerja (NE) · Unión Manilva CF (MN) · Imortal DC (IM) · SL Benfica (SLB)
- UD Dos Hermanas (DH) · CD Toro (TO) · SC Braga (SCB) · Sporting CP (SCP)

---

## Páginas obligatorias

### Públicas
| Ruta | Descripción |
|---|---|
| `/` | Hero estadio + 3 stat cards + últimos resultados + sidebar próxima jornada |
| `/torneo/[id]` | Grid category cards + card destacada + stats grandes + card "Nueva Categoría" |
| `/torneo/[id]/[categoryId]` | Tabs: Clasificación / Partidos / Cuadro |
| `/equipos` | Lista equipos con filtro por categoría + avatar iniciales |
| `/partidos` | Lista partidos con filtro por grupo/fase |

### Admin
| Ruta | Descripción |
|---|---|
| `/admin` | Dashboard stats + actividad reciente |
| `/admin/equipos` | Form añadir equipo + lista |
| `/admin/resultados` | Form insertar resultado (diseño Stitch exacto) |

---

## Reglas de componentes

```tsx
import { cn } from "@/lib/utils"

// Correcto:
<div className={cn("base-class", condition && "conditional-class")} />

// Incorrecto:
<div className={`base-class ${condition ? "conditional-class" : ""}`} />

// Props siempre tipadas explícitamente:
type CategoryCardProps = {
  category: Category
  featured?: boolean
}
export function CategoryCard({ category, featured = false }: CategoryCardProps) { ... }
```

---

## Skills obrigatórias

Antes de criares ou editares qualquer componente de UI, lê e segue
as instruções em `/skill/UI/UX.md`.

Aplica essas regras em todos os ficheiros dentro de:
- `src/components/`
- `src/app/`

---

## Evolución a producto completo

Cuando el cliente acepte, la única capa a cambiar es `/src/data/*.ts`:

| Preview | Producto final |
|---|---|
| `/src/data/*.ts` (hardcoded) | Turso (libSQL) via `@libsql/client` |
| Sin auth | Clerk |
| Sin storage | Cloudflare R2 |
| Vercel | Vercel (igual) |

**El frontend React no cambia.** Solo el origen de los datos.

Usar **Turso** como base de datos — no Supabase. El free tier de Supabase tiene un límite
de 5 GB de cached egress/mes que se alcanzó en producción con un único torneo pequeño.
Turso ofrece 500 M filas leídas/mes, no mide egress, nunca expira, y soporta hasta 500
bases de datos aisladas — una por cliente, ideal para arquitectura white-label.

---

## Lo que NO hacer

- No crear backend en esta fase (preview = cero backend)
- No usar `useState` para datos — los datos vienen de `/src/data/`
- No mezclar lógica de negocio con componentes de UI
- No crear archivos CSS separados — todo en Tailwind
- No instalar librerías no listadas sin consultar primero
- No usar colores en hex hardcodeados — solo clases Tailwind
- No llamar a la tab "Eliminatorias" — se llama **"Cuadro"**
- No usar `teal-600` en fondos sólidos — usar `emerald-900` para elementos sólidos
- No usar fondo blanco en páginas — todas usan `bg-stone-50`
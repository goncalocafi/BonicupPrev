"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { categories } from "@/data/categories"
import { standingsPrebenjaминGroupA, standingsPrebenjaminGroupB } from "@/data/standings"
import { StandingsTable } from "@/components/standings-table"
import { Bracket } from "@/components/bracket"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const TOURNAMENT_ID = 35
const CATEGORY_WITH_DATA = 451

function CategorySelector({
  selected,
  onChange,
}: {
  selected: number
  onChange: (id: number) => void
}) {
  const [open, setOpen] = useState(false)
  const tournamentCategories = categories.filter((c) => c.tournamentId === TOURNAMENT_ID)
  const current = tournamentCategories.find((c) => c.id === selected)

  return (
    <div className="relative w-full sm:w-auto">
      <Button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full sm:min-w-64 items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 h-auto hover:border-emerald-700 hover:bg-white text-left justify-start"
      >
        <div className="flex-1 text-left">
          <p className="text-xs uppercase tracking-widest text-gray-400">ESCALÓN</p>
          <p className="text-sm font-semibold text-emerald-900 mt-0.5">{current?.name}</p>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform shrink-0", open && "rotate-180")} />
      </Button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
          {tournamentCategories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => {
                onChange(cat.id)
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 h-auto text-sm hover:bg-stone-50 rounded-none text-left",
                cat.id === selected
                  ? "text-emerald-900 font-semibold bg-teal-50 hover:bg-teal-50"
                  : "text-gray-600 bg-white hover:bg-stone-50"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.ageGroup}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

type TabKey = "clasificacion" | "cuadro"

export default function ClasificacionesPage() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_WITH_DATA)
  const [tab, setTab] = useState<TabKey>("clasificacion")

  const category = categories.find((c) => c.id === selectedCategory)
  const hasData = selectedCategory === CATEGORY_WITH_DATA

  const groups = hasData
    ? [
        { group: "A", rows: standingsPrebenjaминGroupA },
        { group: "B", rows: standingsPrebenjaminGroupB },
      ]
    : []

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">BONICUP ALGARVE 2026</p>
          <h1 className="text-4xl sm:text-5xl font-black text-emerald-900 leading-none mt-2">
            CLASIFI<span className="text-teal-600">CACIONES</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Selecciona un escalón para ver la clasificación y el cuadro eliminatorio.
          </p>
        </div>

        {/* Selector + tabs */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <CategorySelector selected={selectedCategory} onChange={setSelectedCategory} />

          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden self-start">
            {(["clasificacion", "cuadro"] as TabKey[]).map((t) => (
              <Button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-2.5 h-auto text-sm font-medium rounded-none",
                  tab === t
                    ? "bg-emerald-900 text-white hover:bg-emerald-800"
                    : "bg-white text-gray-600 hover:text-emerald-900 hover:bg-white"
                )}
              >
                {t === "clasificacion" ? "Clasificación" : "Cuadro"}
              </Button>
            ))}
          </div>
        </div>

        {/* Badge de categoría activa */}
        {category && (
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full bg-gray-100 text-gray-600 border-none hover:bg-gray-100 text-xs font-medium">
              {category.ageGroup}
            </Badge>
            <Badge className="rounded-full bg-emerald-100 text-emerald-800 border-none hover:bg-emerald-100 text-xs font-medium">
              {category.format}
            </Badge>
            <Badge className="rounded-full bg-gray-100 text-gray-600 border-none hover:bg-gray-100 text-xs font-medium">
              {category.groups} grupos · {category.teams} equipos
            </Badge>
          </div>
        )}

        {/* Sin datos */}
        {!hasData && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-sm text-gray-400 text-center px-4">Datos disponibles próximamente para esta categoría</p>
          </div>
        )}

        {/* Clasificación */}
        {hasData && tab === "clasificacion" && (
          <div className="space-y-6">
            {groups.map(({ group, rows }) => (
              <StandingsTable key={group} rows={rows} group={group} />
            ))}
          </div>
        )}

        {/* Cuadro */}
        {hasData && tab === "cuadro" && (
          <Bracket categoryId={selectedCategory} />
        )}

      </div>
    </div>
  )
}

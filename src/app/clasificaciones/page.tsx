"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { categories } from "@/data/categories"
import { standingsPrebenjaминGroupA, standingsPrebenjaminGroupB } from "@/data/standings"
import { StandingsTable } from "@/components/standings-table"
import { Bracket } from "@/components/bracket"
import { cn } from "@/lib/utils"

const TOURNAMENT_ID = 35

// Only Prebenjamín (451) has full data
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
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-emerald-700 transition-colors min-w-64"
      >
        <div className="flex-1 text-left">
          <p className="text-xs uppercase tracking-widest text-gray-400">ESCALÓN</p>
          <p className="text-sm font-semibold text-emerald-900 mt-0.5">{current?.name}</p>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
          {tournamentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onChange(cat.id)
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-stone-50 transition-colors text-left",
                cat.id === selected
                  ? "text-emerald-900 font-semibold bg-teal-50"
                  : "text-gray-600"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.ageGroup}</span>
            </button>
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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">BONICUP ALGARVE 2026</p>
          <h1 className="text-5xl font-black text-emerald-900 leading-none mt-2">
            CLASIFI<span className="text-teal-600">CACIONES</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Selecciona un escalón para ver la clasificación y el cuadro eliminatorio.
          </p>
        </div>

        {/* Selector + tabs row */}
        <div className="flex flex-wrap items-center gap-4">
          <CategorySelector selected={selectedCategory} onChange={setSelectedCategory} />

          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
            {(["clasificacion", "cuadro"] as TabKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium transition-colors",
                  tab === t
                    ? "bg-emerald-900 text-white"
                    : "text-gray-600 hover:text-emerald-900"
                )}
              >
                {t === "clasificacion" ? "Clasificación" : "Cuadro"}
              </button>
            ))}
          </div>
        </div>

        {/* Badge de categoría activa */}
        {category && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {category.ageGroup}
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              {category.format}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {category.groups} grupos · {category.teams} equipos
            </span>
          </div>
        )}

        {/* Sin datos */}
        {!hasData && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-sm text-gray-400">Datos disponibles próximamente para esta categoría</p>
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

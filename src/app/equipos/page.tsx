"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { teams } from "@/data/teams"
import { categories } from "@/data/categories"

function countryBadgeClass(code: string): string {
  if (code === "PT") return "bg-blue-100 text-blue-800"
  if (code === "ES") return "bg-amber-100 text-amber-800"
  return "bg-gray-100 text-gray-700"
}

export default function EquiposPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)

  const filtered =
    activeCategoryId === null
      ? teams
      : teams.filter((t) => t.categoryId === activeCategoryId)

  const usedCategoryIds = new Set(teams.map((t) => t.categoryId))
  const filterCategories = categories.filter((c) => usedCategoryIds.has(c.id))

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">BONICUP ALGARVE 2026</p>
          <h1 className="text-3xl font-black text-emerald-900 mt-1">Equipos</h1>
        </div>

        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategoryId(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeCategoryId === null
                ? "bg-emerald-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-700"
            )}
          >
            Todos
          </button>
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategoryId === cat.id
                  ? "bg-emerald-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-700"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Lista de equipos */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {filtered.map((team) => {
            const category = categories.find((c) => c.id === team.categoryId)

            return (
              <div key={team.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-emerald-900">
                  {team.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-emerald-900">{team.name}</p>
                  {category && (
                    <p className="text-xs text-gray-400">{category.name}</p>
                  )}
                </div>

                <span className={cn(
                  "shrink-0 rounded px-1.5 py-0.5 text-xs font-medium",
                  countryBadgeClass(team.countryCode)
                )}>
                  {team.countryCode}
                </span>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-gray-400">
              No se encontraron equipos.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

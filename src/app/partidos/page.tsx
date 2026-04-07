"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { matches } from "@/data/matches"
import { categories } from "@/data/categories"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const phaseLabels: Record<string, string> = {
  group: "Grupos",
  semi:  "Semifinal",
  final: "Final",
}

export default function PartidosPage() {
  const [activePhase, setActivePhase] = useState<string>("all")

  const filtered = activePhase === "all"
    ? matches
    : matches.filter((m) => m.phase === activePhase)

  const byCategoryId = filtered.reduce<Record<number, typeof filtered>>(
    (acc, m) => {
      ;(acc[m.categoryId] ??= []).push(m)
      return acc
    },
    {}
  )

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">BONICUP ALGARVE 2026</p>
          <h1 className="text-3xl font-black text-emerald-900 mt-1">Partidos</h1>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all",   label: "Todos" },
            { value: "group", label: "Fase de Grupos" },
            { value: "semi",  label: "Semifinales" },
            { value: "final", label: "Final" },
          ].map(({ value, label }) => (
            <Button
              key={value}
              onClick={() => setActivePhase(value)}
              className={cn(
                "rounded-full px-4 py-1.5 h-auto text-sm font-medium",
                activePhase === value
                  ? "bg-emerald-900 text-white hover:bg-emerald-800"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-700 hover:bg-white"
              )}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Partidos agrupados por categoría */}
        {Object.entries(byCategoryId).map(([catId, catMatches]) => {
          const category = categories.find((c) => c.id === Number(catId))

          return (
            <Card key={catId} className="bg-white rounded-2xl border border-gray-200 overflow-hidden ring-0 gap-0">
              <CardContent className="p-0">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-emerald-900">{category?.name ?? "Categoría"}</h2>
                <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest">{category?.ageGroup}</p>
              </div>

              <div className="divide-y divide-gray-100">
                {catMatches.map((match) => {
                  const homeWin = match.homeScore > match.awayScore
                  const awayWin = match.awayScore > match.homeScore

                  return (
                    <div key={match.id} className="flex items-center px-3 sm:px-6 py-3 gap-1 sm:gap-2">
                      {/* Fase badge — hidden on very small screens */}
                      <span className="hidden xs:block sm:block shrink-0 text-xs text-gray-400 w-20 sm:w-28 leading-tight">
                        {phaseLabels[match.phase]}
                        {match.phase === "group" && ` · ${match.group}`}
                      </span>

                      {/* Local */}
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end min-w-0">
                        <span className={cn(
                          "text-xs sm:text-sm truncate",
                          homeWin ? "font-medium text-emerald-900" : "text-gray-400"
                        )}>
                          {match.homeTeam}
                        </span>
                        <span className={cn(
                          "shrink-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-mono font-bold text-sm",
                          homeWin
                            ? "bg-emerald-900 text-white"
                            : "bg-gray-100 text-gray-400"
                        )}>
                          {match.homeScore}
                        </span>
                      </div>

                      <span className="text-gray-400 font-bold text-sm mx-0.5">:</span>

                      {/* Visitante */}
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                        <span className={cn(
                          "shrink-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-mono font-bold text-sm",
                          awayWin
                            ? "bg-emerald-900 text-white"
                            : "bg-gray-100 text-gray-400"
                        )}>
                          {match.awayScore}
                        </span>
                        <span className={cn(
                          "text-xs sm:text-sm truncate",
                          awayWin ? "font-medium text-emerald-900" : "text-gray-400"
                        )}>
                          {match.awayTeam}
                        </span>
                      </div>

                      {/* Meta — desktop only */}
                      <span className="hidden lg:block shrink-0 text-xs text-gray-400 w-40 text-right">
                        {match.date.slice(5).replace("-", "/")} {match.time} · {match.venue}
                      </span>
                    </div>
                  )
                })}
              </div>
              </CardContent>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-sm text-gray-400">No hay partidos para esta fase.</p>
          </div>
        )}

      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StandingsTable } from "@/components/standings-table"
import { Bracket } from "@/components/bracket"
import { categories } from "@/data/categories"
import { matches } from "@/data/matches"
import { standingsPrebenjaминGroupA, standingsPrebenjaminGroupB } from "@/data/standings"
import { cn } from "@/lib/utils"
import type { Match } from "@/types"

function MatchRow({ match }: { match: Match }) {
  const homeWin = match.homeScore > match.awayScore
  const awayWin = match.awayScore > match.homeScore

  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0 gap-1">
      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end min-w-0">
        <span className={cn(
          "text-xs sm:text-sm truncate",
          homeWin ? "font-medium text-emerald-900" : "text-gray-400"
        )}>
          {match.homeTeam}
        </span>
        <span className={homeWin
          ? "shrink-0 bg-emerald-900 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-mono font-bold text-sm"
          : "shrink-0 bg-gray-100 text-gray-400 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-mono font-bold text-sm"
        }>
          {match.homeScore}
        </span>
      </div>
      <span className="text-gray-400 mx-1 font-bold text-sm">:</span>
      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
        <span className={awayWin
          ? "shrink-0 bg-emerald-900 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-mono font-bold text-sm"
          : "shrink-0 bg-gray-100 text-gray-400 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-mono font-bold text-sm"
        }>
          {match.awayScore}
        </span>
        <span className={cn(
          "text-xs sm:text-sm truncate",
          awayWin ? "font-medium text-emerald-900" : "text-gray-400"
        )}>
          {match.awayTeam}
        </span>
      </div>
      <span className="hidden sm:block shrink-0 text-xs text-gray-400 ml-2 sm:ml-4">
        {match.date.slice(5).replace("-", "/")} {match.time}
      </span>
    </div>
  )
}

function GroupMatchCard({ group, categoryId }: { group: string; categoryId: number }) {
  const groupMatches = matches.filter(
    (m) => m.categoryId === categoryId && m.group === group && m.phase === "group"
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-emerald-900">Clasificación Grupo {group}</h3>
      </div>
      <div className="px-3 sm:px-6">
        {groupMatches.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const params = useParams<{ id: string; categoryId: string }>()
  const tournamentId = Number(params.id)
  const categoryId = Number(params.categoryId)

  const category = categories.find((c) => c.id === categoryId)
  if (!category) notFound()

  const hasData = categoryId === 451

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">

        {/* Breadcrumb */}
        <Link
          href={`/torneio/${tournamentId}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-900 transition-colors"
        >
          ← Bonicup Algarve 2026
        </Link>

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
            {category.label ?? "CATEGORÍA"}
          </p>
          <h1 className="text-3xl font-black text-emerald-900">{category.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {category.ageGroup}
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              {category.format}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {category.groups} grupos
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {category.teams} equipos
            </span>
          </div>
        </div>

        {/* Sin datos */}
        {!hasData && (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-sm text-gray-400">Datos disponibles próximamente</p>
          </div>
        )}

        {/* Tabs — solo Prebenjamín */}
        {hasData && (
          <Tabs defaultValue="clasificacion">
            <TabsList>
              <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
              <TabsTrigger value="partidos">Partidos</TabsTrigger>
              <TabsTrigger value="cuadro">Cuadro</TabsTrigger>
            </TabsList>

            <TabsContent value="clasificacion" className="mt-6 space-y-6">
              <StandingsTable rows={standingsPrebenjaминGroupA} group="A" />
              <StandingsTable rows={standingsPrebenjaminGroupB} group="B" />
            </TabsContent>

            <TabsContent value="partidos" className="mt-6 space-y-4">
              <GroupMatchCard group="A" categoryId={categoryId} />
              <GroupMatchCard group="B" categoryId={categoryId} />
            </TabsContent>

            <TabsContent value="cuadro" className="mt-6">
              <Bracket categoryId={categoryId} />
            </TabsContent>
          </Tabs>
        )}

      </div>
    </div>
  )
}

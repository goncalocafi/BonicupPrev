"use client"

import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { matches } from "@/data/matches"
import type { Match } from "@/types"

type TeamSlotProps = {
  name: string
  initials: string
  score: number | null
  winner: boolean
  dark?: boolean
}

function TeamSlot({ name, initials, score, winner, dark = false }: TeamSlotProps) {
  return (
    <div className={cn(
      "flex items-center justify-between px-3 py-2 rounded-lg",
      winner
        ? dark ? "bg-emerald-700" : "bg-emerald-50"
        : "bg-transparent"
    )}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={cn(
          "w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0",
          dark ? "bg-emerald-600 text-white" : "bg-stone-100 text-emerald-900"
        )}>
          {initials}
        </div>
        <span className={cn(
          "text-sm truncate",
          winner
            ? dark ? "text-white font-semibold" : "text-emerald-900 font-semibold"
            : dark ? "text-emerald-300" : "text-gray-400"
        )}>
          {name}
        </span>
      </div>
      {score !== null && (
        <span className={cn(
          "text-sm font-bold shrink-0 ml-2",
          winner
            ? dark ? "text-white" : "text-emerald-900"
            : dark ? "text-emerald-300" : "text-gray-400"
        )}>
          {score}
        </span>
      )}
    </div>
  )
}

type MatchCardProps = {
  match: Match | null
  label?: string
  dark?: boolean
  pending?: boolean
}

function MatchCard({ match, label, dark = false, pending = false }: MatchCardProps) {
  const homeInitials = match
    ? match.homeTeam.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()
    : "?"
  const awayInitials = match
    ? match.awayTeam.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()
    : "?"

  const homeWin = match ? match.homeScore > match.awayScore : false
  const awayWin = match ? match.awayScore > match.homeScore : false

  return (
    <div className={cn(
      "rounded-xl overflow-hidden border",
      dark
        ? "bg-emerald-900 border-emerald-700"
        : "bg-white border-gray-200"
    )}>
      {label && (
        <div className={cn(
          "px-3 py-1.5 border-b text-xs font-medium uppercase tracking-widest flex items-center gap-1.5",
          dark
            ? "border-emerald-700 text-emerald-300"
            : "border-gray-100 text-gray-400"
        )}>
          {dark && <Trophy className="h-3 w-3" />}
          {label}
        </div>
      )}
      <div className="px-1 py-1 space-y-0.5">
        {pending || !match ? (
          <>
            <TeamSlot name="Por determinar" initials="?" score={null} winner={false} dark={dark} />
            <TeamSlot name="Por determinar" initials="?" score={null} winner={false} dark={dark} />
          </>
        ) : (
          <>
            <TeamSlot
              name={match.homeTeam}
              initials={homeInitials}
              score={match.homeScore}
              winner={homeWin}
              dark={dark}
            />
            <TeamSlot
              name={match.awayTeam}
              initials={awayInitials}
              score={match.awayScore}
              winner={awayWin}
              dark={dark}
            />
          </>
        )}
      </div>
      {match && (
        <div className={cn(
          "px-3 py-1.5 border-t text-xs",
          dark ? "border-emerald-700 text-emerald-400" : "border-gray-100 text-gray-400"
        )}>
          {match.date.slice(5).replace("-", "/")} · {match.time} · {match.venue}
        </div>
      )}
    </div>
  )
}

type BracketProps = {
  categoryId: number
}

export function Bracket({ categoryId }: BracketProps) {
  const semis = matches.filter((m) => m.categoryId === categoryId && m.phase === "semi")
  const final = matches.find((m) => m.categoryId === categoryId && m.phase === "final") ?? null

  const hasSemis = semis.length > 0

  if (!hasSemis && !final) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
        <p className="text-sm text-gray-400">Cuadro disponible próximamente</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-x-auto">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">CUADRO ELIMINATORIO</p>

      <div className="flex items-center gap-0 min-w-145">

        {/* Columna: Semifinales */}
        <div className="flex flex-col gap-6 flex-1">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">SEMIFINALES</p>
          {hasSemis ? (
            semis.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))
          ) : (
            <>
              <MatchCard match={null} pending />
              <MatchCard match={null} pending />
            </>
          )}
        </div>

        {/* Conectores SVG */}
        <div className="relative w-16 shrink-0 self-stretch flex items-center">
          <svg
            className="w-full h-full absolute inset-0"
            viewBox="0 0 64 200"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* línea desde SF1 al centro */}
            <path d="M 0 50 H 32 V 100" stroke="#d1d5db" strokeWidth="1.5" />
            {/* línea desde SF2 al centro */}
            <path d="M 0 150 H 32 V 100" stroke="#d1d5db" strokeWidth="1.5" />
            {/* línea hacia la final */}
            <path d="M 32 100 H 64" stroke="#d1d5db" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Columna: Final */}
        <div className="flex flex-col justify-center flex-1">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">GRAN FINAL</p>
          <MatchCard match={final} label="GRAN FINAL" dark />
          {final && (
            <div className="mt-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-semibold text-emerald-900">
                Campeón:{" "}
                {final.homeScore > final.awayScore ? final.homeTeam : final.awayTeam}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

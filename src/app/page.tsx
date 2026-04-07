import Link from "next/link"
import { MapPin, Calendar, Trophy, Users, Flag } from "lucide-react"
import { tournaments } from "@/data/tournaments"
import { matches } from "@/data/matches"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const tournament = tournaments[0]

const lastMatches = [...matches]
  .filter((m) => m.categoryId === 451)
  .slice(-3)
  .reverse()

export default function Home() {
  return (
    <div className="bg-stone-50 min-h-screen">

      {/* Hero */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end pb-10 sm:pb-12 bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 opacity-90" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-xs uppercase tracking-widest text-gray-300 mb-3">
            {tournament.edition} · Torneo activo
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight">
            BONICUP{" "}
            <span className="text-teal-600">ALGARVE</span>
            <br />2026
          </h1>
          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-gray-300 mt-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {tournament.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {tournament.dates}
            </span>
          </div>
          <Button asChild className="mt-5 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 h-auto font-medium text-sm uppercase tracking-wide">
            <Link href="/torneos/35">Ver torneo</Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 -mt-6 sm:-mt-8 relative z-10">
          {[
            { label: "CATEGORÍAS", value: tournament.totalCategories, sub: "en competición", Icon: Trophy },
            { label: "EQUIPOS TOTALES", value: tournament.totalTeams, sub: "inscritos", Icon: Users },
            { label: "PAÍSES", value: 6, sub: "representados", Icon: Flag },
          ].map(({ label, value, sub, Icon }) => (
            <Card key={label} className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 ring-0 gap-0">
              <CardContent className="p-0 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
                  <p className="text-3xl sm:text-4xl font-black text-emerald-900 mt-1">{value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
                </div>
                <Icon className="h-6 w-6 text-gray-300 shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Últimos resultados */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-emerald-900">Últimos resultados</h2>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest">Prebenjamín</p>
            </div>
          </div>

          <ul>
            {lastMatches.map((match) => {
              const homeWin = match.homeScore > match.awayScore
              const awayWin = match.awayScore > match.homeScore

              return (
                <li key={match.id} className="flex items-center justify-between py-3 px-3 sm:px-6 border-b border-gray-100 last:border-0 gap-1">
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
                </li>
              )
            })}
          </ul>

          <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
            <Link href="/partidos" className="text-sm font-medium text-emerald-700 hover:underline">
              Ver todos los partidos →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

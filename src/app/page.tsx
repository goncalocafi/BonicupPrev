import Link from "next/link"
import { MapPin, Calendar, Trophy, Users, Flag } from "lucide-react"
import { tournaments } from "@/data/tournaments"
import { matches } from "@/data/matches"

const tournament = tournaments[0]

const lastMatches = [...matches]
  .filter((m) => m.categoryId === 451)
  .slice(-3)
  .reverse()

export default function Home() {
  return (
    <div className="bg-stone-50 min-h-screen">

      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-end pb-12 bg-emerald-900 overflow-hidden">
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 opacity-90" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-xs uppercase tracking-widest text-gray-300 mb-3">
            {tournament.edition} · Torneo activo
          </p>
          <h1 className="text-5xl font-black text-white leading-tight md:text-7xl">
            BONICUP{" "}
            <span className="text-teal-600">ALGARVE</span>
            <br />2026
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mt-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {tournament.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {tournament.dates}
            </span>
          </div>
          <Link
            href="/torneos/35"
            className="mt-6 inline-block rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 font-medium text-sm uppercase tracking-wide transition-colors"
          >
            Ver torneo
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 -mt-8 relative z-10">
          {[
            { label: "CATEGORÍAS", value: tournament.totalCategories, sub: "en competición", Icon: Trophy },
            { label: "EQUIPOS TOTALES", value: tournament.totalTeams, sub: "inscritos", Icon: Users },
            { label: "PAÍSES", value: 6, sub: "representados", Icon: Flag },
          ].map(({ label, value, sub, Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
                <p className="text-4xl font-black text-emerald-900 mt-1">{value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
              </div>
              <Icon className="h-6 w-6 text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Últimos resultados */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
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
                <li key={match.id} className="flex items-center justify-between py-3 px-6 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className={homeWin ? "text-sm font-medium text-emerald-900" : "text-sm text-gray-400"}>
                      {match.homeTeam}
                    </span>
                    <span className={homeWin
                      ? "bg-emerald-900 text-white px-3 py-1.5 rounded-md font-mono font-bold text-sm"
                      : "bg-gray-100 text-gray-400 px-3 py-1.5 rounded-md font-mono font-bold text-sm"
                    }>
                      {match.homeScore}
                    </span>
                  </div>
                  <span className="text-gray-400 mx-2 font-bold">:</span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className={awayWin
                      ? "bg-emerald-900 text-white px-3 py-1.5 rounded-md font-mono font-bold text-sm"
                      : "bg-gray-100 text-gray-400 px-3 py-1.5 rounded-md font-mono font-bold text-sm"
                    }>
                      {match.awayScore}
                    </span>
                    <span className={awayWin ? "text-sm font-medium text-emerald-900" : "text-sm text-gray-400"}>
                      {match.awayTeam}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="px-6 py-3 border-t border-gray-100">
            <Link href="/partidos" className="text-sm font-medium text-emerald-700 hover:underline">
              Ver todos los partidos →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

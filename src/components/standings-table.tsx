import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StandingRow } from "@/types"

type StandingsTableProps = {
  rows: StandingRow[]
  group: string
}

function CountryBadge({ code }: { code: string }) {
  const styles: Record<string, string> = {
    PT: "bg-blue-100 text-blue-800",
    ES: "bg-amber-100 text-amber-800",
  }
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 text-xs font-medium",
        styles[code] ?? "bg-gray-100 text-gray-700"
      )}
    >
      {code}
    </span>
  )
}

function TeamAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-stone-100 text-emerald-900 text-xs font-bold flex items-center justify-center shrink-0">
      {initials}
    </div>
  )
}

export function StandingsTable({ rows, group }: StandingsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-emerald-900">Clasificación Grupo {group}</h3>
        <Info className="h-4 w-4 text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-widest">
              <th className="w-10 py-3 pl-6 pr-2 text-center">POS</th>
              <th className="py-3 pl-2 pr-4 text-left">EQUIPO</th>
              <th className="px-2 py-3 text-center">PAÍS</th>
              <th className="px-2 py-3 text-center">PJ</th>
              <th className="px-2 py-3 text-center">PG</th>
              <th className="px-2 py-3 text-center">PE</th>
              <th className="px-2 py-3 text-center">PP</th>
              <th className="px-2 py-3 text-center">GF</th>
              <th className="px-2 py-3 text-center">GC</th>
              <th className="px-2 py-3 text-center">GA</th>
              <th className="py-3 pl-2 pr-6 text-center font-semibold">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr
                key={row.position}
                className={cn(row.qualified && "bg-teal-50")}
              >
                <td className="py-3 pl-6 pr-2 text-center text-sm text-gray-400 w-10">
                  {row.position.toString().padStart(2, "0")}
                </td>
                <td className="py-3 pl-2 pr-4">
                  <div className="flex items-center gap-2">
                    <TeamAvatar initials={row.teamInitials} />
                    <span className="text-sm font-medium text-emerald-900">{row.teamName}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center">
                  <CountryBadge code={row.countryCode} />
                </td>
                <td className="px-2 py-3 text-center text-sm text-gray-600">{row.played}</td>
                <td className="px-2 py-3 text-center text-sm text-gray-600">{row.won}</td>
                <td className="px-2 py-3 text-center text-sm text-gray-600">{row.drawn}</td>
                <td className="px-2 py-3 text-center text-sm text-gray-600">{row.lost}</td>
                <td className="px-2 py-3 text-center text-sm text-gray-600">{row.goalsFor}</td>
                <td className="px-2 py-3 text-center text-sm text-gray-600">{row.goalsAgainst}</td>
                <td className={cn(
                  "px-2 py-3 text-center text-sm font-medium",
                  row.goalDiff > 0
                    ? "text-emerald-700"
                    : row.goalDiff < 0
                      ? "text-red-500"
                      : "text-gray-600"
                )}>
                  {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                </td>
                <td className="py-3 pl-2 pr-6 text-center text-sm font-bold text-emerald-900">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 px-6 py-3 border-t border-gray-100">
        Los 2 primeros clasificados avanzan a eliminatorias
      </p>
    </div>
  )
}

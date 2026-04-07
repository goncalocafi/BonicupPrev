import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import type { StandingRow } from "@/types"

type StandingsTableProps = {
  rows: StandingRow[]
  group: string
}

function CountryBadge({ code }: { code: string }) {
  const styles: Record<string, string> = {
    PT: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    ES: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  }
  return (
    <Badge
      className={cn(
        "rounded px-1.5 py-0.5 text-xs font-medium border-none",
        styles[code] ?? "bg-gray-100 text-gray-700 hover:bg-gray-100"
      )}
    >
      {code}
    </Badge>
  )
}

function TeamAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 text-emerald-900 text-xs font-bold flex items-center justify-center shrink-0">
      {initials}
    </div>
  )
}

export function StandingsTable({ rows, group }: StandingsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-emerald-900">Clasificación Grupo {group}</h3>
        <Info className="h-4 w-4 text-gray-400" />
      </div>

      <Table className="min-w-96">
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="w-8 py-3 pl-4 sm:pl-6 pr-2 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">POS</TableHead>
            <TableHead className="py-3 pl-2 pr-2 text-left text-xs font-medium text-gray-400 uppercase tracking-widest">EQUIPO</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:table-cell">PAÍS</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">PJ</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:table-cell">PG</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:table-cell">PE</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:table-cell">PP</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:table-cell">GF</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:table-cell">GC</TableHead>
            <TableHead className="px-2 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-widest">GA</TableHead>
            <TableHead className="py-3 pl-2 pr-4 sm:pr-6 text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">PTS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <TableRow
              key={row.position}
              className={cn(
                "border-b border-gray-100 hover:bg-transparent",
                row.qualified && "bg-teal-50 hover:bg-teal-50"
              )}
            >
              <TableCell className="py-3 pl-4 sm:pl-6 pr-2 text-center text-sm text-gray-400 w-8">
                {row.position.toString().padStart(2, "0")}
              </TableCell>
              <TableCell className="py-3 pl-2 pr-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <TeamAvatar initials={row.teamInitials} />
                  <span className="text-xs sm:text-sm font-medium text-emerald-900 leading-tight">{row.teamName}</span>
                </div>
              </TableCell>
              <TableCell className="px-2 py-3 text-center hidden sm:table-cell">
                <CountryBadge code={row.countryCode} />
              </TableCell>
              <TableCell className="px-2 py-3 text-center text-sm text-gray-600">{row.played}</TableCell>
              <TableCell className="px-2 py-3 text-center text-sm text-gray-600 hidden sm:table-cell">{row.won}</TableCell>
              <TableCell className="px-2 py-3 text-center text-sm text-gray-600 hidden sm:table-cell">{row.drawn}</TableCell>
              <TableCell className="px-2 py-3 text-center text-sm text-gray-600 hidden sm:table-cell">{row.lost}</TableCell>
              <TableCell className="px-2 py-3 text-center text-sm text-gray-600 hidden sm:table-cell">{row.goalsFor}</TableCell>
              <TableCell className="px-2 py-3 text-center text-sm text-gray-600 hidden sm:table-cell">{row.goalsAgainst}</TableCell>
              <TableCell className={cn(
                "px-2 py-3 text-center text-sm font-medium",
                row.goalDiff > 0
                  ? "text-emerald-700"
                  : row.goalDiff < 0
                    ? "text-red-500"
                    : "text-gray-600"
              )}>
                {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
              </TableCell>
              <TableCell className="py-3 pl-2 pr-4 sm:pr-6 text-center text-sm font-bold text-emerald-900">
                {row.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="text-xs text-gray-400 px-4 sm:px-6 py-3 border-t border-gray-100">
        Los 2 primeros clasificados avanzan a eliminatorias
      </p>
    </div>
  )
}

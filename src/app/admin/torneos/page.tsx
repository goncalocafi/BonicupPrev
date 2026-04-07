import Link from "next/link"
import { Trophy, MapPin, Calendar, Users, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { tournaments } from "@/data/tournaments"

export default function AdminTorneos() {
  return (
    <div className="space-y-6">

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN</p>
        <h1 className="text-3xl font-bold text-emerald-900 mt-1">Torneos</h1>
      </div>

      <div className="space-y-3">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className={cn(
              "bg-white rounded-2xl border border-gray-200 p-6",
              t.status === "active" && "border-l-4 border-l-emerald-900"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400">{t.edition}</p>
                  {t.status === "active" ? (
                    <span className="bg-emerald-900 text-white text-xs px-2 py-0.5 rounded-full">En curso</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">Finalizado</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-emerald-900">{t.name}</h2>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1.5">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{t.dates}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{t.totalTeams} equipos</span>
                </div>
                {t.champion && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Trophy className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs font-medium text-emerald-900">{t.champion}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href={`/torneos/${t.id}`}
                  className="flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Ver público
                </Link>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">CAT.</p>
                    <p className="text-lg font-black text-emerald-900">{t.totalCategories}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">EQ.</p>
                    <p className="text-lg font-black text-emerald-900">{t.totalTeams}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">PAR.</p>
                    <p className="text-lg font-black text-emerald-900">{t.totalMatches}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

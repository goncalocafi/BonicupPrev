import Link from "next/link"
import { Trophy, MapPin, Calendar, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { tournaments } from "@/data/tournaments"

export default function TorneosPage() {
  const active = tournaments.filter((t) => t.status === "active")
  const finished = tournaments.filter((t) => t.status === "finished")

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">HISTORIAL</p>
          <h1 className="text-5xl font-black text-emerald-900 leading-none mt-2">
            TORNEOS
          </h1>
        </div>

        {/* Torneo activo */}
        {active.map((t) => (
          <div key={t.id}>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">EN CURSO</p>
            <Link href={`/torneos/${t.id}`}>
              <div className="bg-emerald-900 rounded-2xl p-6 text-white hover:bg-emerald-800 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-300 mb-1">{t.edition}</p>
                    <h2 className="text-2xl font-black text-white">{t.name}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-emerald-300 mt-2">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {t.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {t.dates}
                      </span>
                    </div>
                  </div>
                  <span className="bg-emerald-700 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    En curso
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-emerald-800">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-300">CATEGORÍAS</p>
                    <p className="text-3xl font-black text-white">{t.totalCategories}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-300">EQUIPOS</p>
                    <p className="text-3xl font-black text-white">{t.totalTeams}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-300">PARTIDOS</p>
                    <p className="text-3xl font-black text-white">{t.totalMatches}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Torneos finalizados */}
        {finished.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">EDICIONES ANTERIORES</p>
            <div className="space-y-3">
              {finished.map((t) => (
                <Link key={t.id} href={`/torneos/${t.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{t.edition}</p>
                          <h3 className="text-lg font-bold text-emerald-900">{t.name}</h3>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {t.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {t.dates}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {t.totalTeams} equipos
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 shrink-0">
                        {t.champion && (
                          <div className="text-right">
                            <p className="text-xs uppercase tracking-widest text-gray-400">CAMPEÓN</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Trophy className="h-3.5 w-3.5 text-amber-500" />
                              <span className="text-sm font-bold text-emerald-900">{t.champion}</span>
                            </div>
                          </div>
                        )}
                        <span className="text-xs text-gray-400">Ver →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

import { notFound } from "next/navigation"
import { tournaments } from "@/data/tournaments"
import { categories } from "@/data/categories"
import { CategoryCard } from "@/components/category-card"

type Props = {
  params: Promise<{ id: string }>
}

export default async function TorneoPage({ params }: Props) {
  const { id } = await params
  const tournamentId = Number(id)

  const tournament = tournaments.find((t) => t.id === tournamentId)
  if (!tournament) notFound()

  const tournamentCategories = categories.filter(
    (c) => c.tournamentId === tournamentId
  )

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-2">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400">
            TORNEO INTERNACIONAL DE FÚTBOL BASE
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-emerald-900 leading-none mt-2 md:text-7xl">
            {tournament.name.split(" ")[0]}{" "}
            <span className="text-teal-600">{tournament.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {tournament.location} · {tournament.dates} · {tournament.edition}
          </p>
        </div>

        {/* Big stats */}
        <div className="flex flex-wrap gap-6 sm:gap-10 mt-6 sm:mt-8 mb-8 sm:mb-10">
          {[
            { value: tournament.totalCategories, label: "CATEGORÍAS" },
            { value: tournament.totalTeams, label: "EQUIPOS" },
            { value: tournament.totalMatches, label: "PARTIDOS" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl sm:text-6xl font-black text-emerald-900">{value}</p>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tournamentCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              tournamentId={tournamentId}
            />
          ))}

        </div>

      </div>
    </div>
  )
}

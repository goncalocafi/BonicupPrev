import { categories } from "@/data/categories"
import { tournaments } from "@/data/tournaments"

export default function AdminCategorias() {
  return (
    <div className="space-y-6">

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN</p>
        <h1 className="text-3xl font-bold text-emerald-900 mt-1">Categorías</h1>
      </div>

      {tournaments.map((tournament) => {
        const tournamentCategories = categories.filter(
          (c) => c.tournamentId === tournament.id
        )
        if (tournamentCategories.length === 0) return null

        return (
          <div key={tournament.id} className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-400">{tournament.name}</p>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400">
                    <th className="px-6 py-3 text-left">CATEGORÍA</th>
                    <th className="px-4 py-3 text-center">EDAD</th>
                    <th className="px-4 py-3 text-center">FORMATO</th>
                    <th className="px-4 py-3 text-center">GRUPOS</th>
                    <th className="px-4 py-3 text-center">EQUIPOS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tournamentCategories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="px-6 py-3">
                        <div>
                          <p className="font-medium text-emerald-900">{cat.name}</p>
                          {cat.label && (
                            <p className="text-xs text-gray-400 uppercase tracking-widest">{cat.label}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{cat.ageGroup}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-medium">
                          {cat.format}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{cat.groups}</td>
                      <td className="px-4 py-3 text-center font-medium text-emerald-900">{cat.teams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

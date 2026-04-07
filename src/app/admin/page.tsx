const stats = [
  { label: "TORNEOS ACTIVOS",    value: 1 },
  { label: "EQUIPOS",            value: 114 },
  { label: "PARTIDOS DISPUTADOS", value: 96 },
  { label: "PARTIDOS PENDIENTES", value: 12 },
]

const recentActivity = [
  { id: 1, text: "CD Toro 0–4 Sporting CP",        meta: "Prebenjamín · Final · hace 2h" },
  { id: 2, text: "Sporting CP 4–1 SL Benfica",      meta: "Prebenjamín · Semifinal · hace 3h" },
  { id: 3, text: "Unión Manilva CF 1–2 CD Toro",    meta: "Prebenjamín · Semifinal · hace 3h" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN</p>
        <h1 className="text-3xl font-bold text-emerald-900 mt-1">Dashboard</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 px-6 py-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
            <p className="text-4xl font-black text-emerald-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-bold text-emerald-900">Actividad reciente</h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {recentActivity.map(({ id, text, meta }) => (
            <li key={id} className="flex items-start gap-3 px-6 py-4">
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-900" />
              <div>
                <p className="text-sm font-medium text-emerald-900">{text}</p>
                <p className="mt-0.5 text-xs text-gray-400">{meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

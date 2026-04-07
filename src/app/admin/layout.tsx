"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Trophy,
  BarChart2,
  Users,
  ClipboardList,
} from "lucide-react"

const navLinks = [
  { href: "/admin",            label: "Dashboard",   Icon: LayoutDashboard },
  { href: "/admin/torneos",    label: "Torneos",    Icon: Trophy },
  { href: "/admin/categorias", label: "Categorías", Icon: BarChart2 },
  { href: "/admin/equipos",    label: "Equipos",     Icon: Users },
  { href: "/admin/resultados", label: "Resultados",  Icon: ClipboardList },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 bg-white border-r border-gray-200 flex-col sm:flex">
        <div className="px-4 pt-6 pb-2">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            GESTIÓN PRINCIPAL
          </p>
        </div>

        <nav className="flex flex-col gap-0.5 px-2 mt-2 flex-1">
          {navLinks.map(({ href, label, Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg mx-0 transition-colors",
                  isActive
                    ? "bg-emerald-900 text-white font-medium"
                    : "text-gray-600 hover:bg-stone-50"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer card */}
        <div className="mx-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
              ESTADO DEL TORNEO
            </p>
            <p className="text-sm font-medium text-emerald-900">Fase de Grupos Activa</p>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div className="bg-emerald-900 h-1 rounded-full" style={{ width: "45%" }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-stone-50 p-8">
        {children}
      </main>

    </div>
  )
}

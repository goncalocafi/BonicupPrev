"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/",                label: "Inicio" },
  { href: "/torneos",         label: "Torneo" },
  { href: "/clasificaciones", label: "Clasificaciones" },
  { href: "/equipos",         label: "Equipos" },
  { href: "/admin",           label: "Admin" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-emerald-900 shrink-0">
          Bonicup
        </Link>

        <ul className="flex items-center gap-6 flex-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href)

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-sm transition-colors hover:text-emerald-900",
                    isActive
                      ? "font-medium text-emerald-900 underline underline-offset-4 decoration-emerald-700"
                      : "text-gray-600"
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400 w-24"
            />
          </div>
          <button className="text-gray-400 hover:text-emerald-900 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-white text-xs font-bold">
            A
          </button>
        </div>
      </nav>
    </header>
  )
}

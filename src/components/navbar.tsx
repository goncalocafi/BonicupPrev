"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, Search, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navLinks = [
  { href: "/",                label: "Inicio" },
  { href: "/torneos",         label: "Torneo" },
  { href: "/clasificaciones", label: "Clasificaciones" },
  { href: "/equipos",         label: "Equipos" },
  { href: "/admin",           label: "Admin" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-emerald-900 shrink-0">
          Bonicup
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 flex-1">
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

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:border-none shadow-none text-sm text-gray-600 placeholder:text-gray-400 w-24 h-auto p-0 rounded-none"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-emerald-900 hover:bg-transparent"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 hover:text-white"
          >
            A
          </Button>
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 hover:text-white"
          >
            A
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-1.5 text-gray-600 hover:bg-stone-100"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <ul className="flex flex-col py-2">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm transition-colors",
                      isActive
                        ? "font-medium text-emerald-900 bg-teal-50"
                        : "text-gray-600 hover:bg-stone-50"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}

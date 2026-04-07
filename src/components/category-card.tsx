import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/types"

type CategoryCardProps = {
  category: Category
  tournamentId: number
}

export function CategoryCard({ category, tournamentId }: CategoryCardProps) {
  if (category.featured) {
    return (
      <Link href={`/torneos/${tournamentId}/${category.id}`} className="h-full block">
        <Card className="bg-emerald-900 rounded-2xl p-4 sm:p-6 text-white hover:bg-emerald-800 transition-colors cursor-pointer h-full border-none ring-0 gap-0">
          <CardContent className="p-0">
            {category.label && (
              <p className="text-xs uppercase tracking-widest text-emerald-300 mb-1">{category.label}</p>
            )}
            <p className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4">{category.name}</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-300">GRUPOS</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{category.groups}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-300">INSCRITOS</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{category.teams}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-emerald-300 mt-3 sm:mt-4">Gestionar Eliminatorias ↗</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/torneos/${tournamentId}/${category.id}`} className="h-full block">
      <Card className={cn(
        "bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:border-emerald-700 transition-colors cursor-pointer h-full ring-0 gap-0"
      )}>
        <CardContent className="p-0">
          {category.label && (
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{category.label}</p>
          )}
          <p className="text-base sm:text-xl font-bold text-emerald-900 mb-3 sm:mb-4">{category.name}</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">GRUPOS</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-900">{category.groups}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">INSCRITOS</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-900">{category.teams}</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-emerald-700 mt-3 sm:mt-4">Ver detalles →</p>
        </CardContent>
      </Card>
    </Link>
  )
}

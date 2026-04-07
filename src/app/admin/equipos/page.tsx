"use client"

import { useState } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { teams as initialTeams } from "@/data/teams"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"
import type { Team } from "@/types"

const countries = [
  { code: "PT", label: "Portugal" },
  { code: "ES", label: "España" },
  { code: "FR", label: "Francia" },
  { code: "EN", label: "Inglaterra" },
  { code: "DE", label: "Alemania" },
  { code: "IT", label: "Italia" },
]

const groups = ["A", "B", "C", "D"]

const schema = z.object({
  name:        z.string().min(1, "Obligatorio"),
  countryCode: z.string().min(1, "Obligatorio"),
  categoryId:  z.coerce.number().min(1, "Obligatorio"),
  group:       z.string().min(1, "Obligatorio"),
})

type FormValues = z.infer<typeof schema>

function countryBadgeClass(code: string): string {
  if (code === "PT") return "bg-blue-100 text-blue-800"
  if (code === "ES") return "bg-amber-100 text-amber-800"
  return "bg-gray-100 text-gray-700"
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-medium text-gray-600">
      {children}
    </label>
  )
}

export default function AdminEquipos() {
  const [teamList, setTeamList] = useState<Team[]>(initialTeams)
  const [successName, setSuccessName] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) as Resolver<FormValues> })

  function onSubmit(values: FormValues) {
    const newTeam: Team = {
      id: Date.now(),
      name: values.name,
      initials: values.name.slice(0, 2).toUpperCase(),
      countryCode: values.countryCode,
      categoryId: values.categoryId,
      group: values.group,
    }
    setTeamList((prev) => [...prev, newTeam])
    setSuccessName(values.name)
    reset()
    setTimeout(() => setSuccessName(null), 4000)
  }

  function handleRemove(id: number) {
    setTeamList((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Equipos</h1>

      {/* Formulario */}
      <Card className="rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6 ring-0 gap-0">
        <CardContent className="p-0 space-y-5">
        <h2 className="text-base font-semibold text-gray-900">Añadir equipo</h2>

        {successName && (
          <div className="rounded-lg border border-teal-600 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700">
            Equipo &ldquo;{successName}&rdquo; añadido correctamente.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <Label>Nombre del equipo</Label>
            <Input
              placeholder="Ej: Sporting CP"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            <FieldError message={errors.name?.message} />
          </div>

          {/* País + Categoría + Grupo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label>País</Label>
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="País" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.code} — {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.countryCode?.message} />
            </div>

            <div>
              <Label>Categoría</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.categoryId?.message} />
            </div>

            <div>
              <Label>Grupo</Label>
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((g) => (
                        <SelectItem key={g} value={g}>Grupo {g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.group?.message} />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 text-white hover:bg-teal-700"
            size="lg"
          >
            Añadir equipo
          </Button>
        </form>
        </CardContent>
      </Card>

      {/* Lista de equipos */}
      <Card className="rounded-xl border border-gray-200 bg-white ring-0 gap-0">
        <CardContent className="p-0">
        <div className="border-b border-gray-100 px-4 sm:px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Equipos registrados{" "}
            <Badge className="ml-1 rounded-full bg-gray-100 text-gray-500 border-none hover:bg-gray-100 text-xs font-medium">
              {teamList.length}
            </Badge>
          </h2>
        </div>

        <ul className="divide-y divide-gray-100">
          {teamList.map((team) => {
            const category = categories.find((c) => c.id === team.categoryId)

            return (
              <li key={team.id} className="flex items-center gap-3 px-4 sm:px-6 py-3">
                <Badge
                  className={cn(
                    "shrink-0 rounded-full border-none text-xs font-medium",
                    countryBadgeClass(team.countryCode)
                  )}
                >
                  {team.countryCode}
                </Badge>

                <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                  {team.name}
                </span>

                <span className="hidden sm:block text-xs text-gray-400 shrink-0">
                  {category?.name ?? "—"} · Gr. {team.group}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(team.id)}
                  className="shrink-0 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-transparent px-0"
                >
                  Eliminar
                </Button>
              </li>
            )
          })}

          {teamList.length === 0 && (
            <li className="px-4 sm:px-6 py-10 text-center text-sm text-gray-400">
              No hay equipos registrados.
            </li>
          )}
        </ul>
        </CardContent>
      </Card>
    </div>
  )
}

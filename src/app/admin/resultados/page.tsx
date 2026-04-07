"use client"

import { useState } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Save, Calendar, Settings, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { teams } from "@/data/teams"
import { categories } from "@/data/categories"

const venues = [
  "Albufeira 1",
  "Albufeira 2",
  "Albufeira 3",
  "Estômbar 1",
  "Estômbar 2",
]

const schema = z.object({
  homeTeam:   z.string().min(1, "Obligatorio"),
  awayTeam:   z.string().min(1, "Obligatorio"),
  homeScore:  z.coerce.number().min(0, "Mín. 0"),
  awayScore:  z.coerce.number().min(0, "Mín. 0"),
  date:       z.string().min(1, "Obligatorio"),
  time:       z.string().min(1, "Obligatorio"),
  venue:      z.string().min(1, "Obligatorio"),
  categoryId: z.string().min(1, "Obligatorio"),
  finished:   z.boolean(),
})

type FormValues = z.infer<typeof schema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

export default function AdminResultados() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { finished: false },
  })

  const homeScore = watch("homeScore") ?? 0
  const awayScore = watch("awayScore") ?? 0

  function onSubmit(values: FormValues) {
    setSubmitted(values)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN DE PARTIDOS</p>
          <h1 className="text-3xl font-bold text-emerald-900 mt-1">Resultado guardado</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <p className="text-2xl font-bold text-emerald-900 tabular-nums">
            {submitted.homeTeam}{" "}
            <span className="text-teal-600">{submitted.homeScore}–{submitted.awayScore}</span>{" "}
            {submitted.awayTeam}
          </p>
          <p className="text-sm text-gray-500">
            {submitted.date} · {submitted.time} · {submitted.venue}
          </p>
        </div>

        <button
          onClick={() => { setSubmitted(null); reset() }}
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          Insertar otro resultado
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN DE PARTIDOS</p>
        <h1 className="text-3xl font-bold text-emerald-900 mt-1">Insertar resultado</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-lg">
          Introduce el marcador final del partido y los detalles del encuentro para actualizar la clasificación.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Equipos + marcador */}
        <div className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-emerald-900 p-6">
          <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] items-end gap-3">
            {/* Equipo local */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">EQUIPO LOCAL</p>
              <Controller
                name="homeTeam"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((t) => (
                        <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.homeTeam?.message} />
            </div>

            {/* Score local */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 text-center">GOL</p>
              <input
                type="number"
                min={0}
                placeholder="0"
                {...register("homeScore")}
                className="w-16 h-16 text-3xl font-bold text-center bg-gray-100 rounded-xl border-none outline-none focus:bg-stone-50 text-emerald-900 tabular-nums"
              />
              <FieldError message={errors.homeScore?.message} />
            </div>

            {/* Separador */}
            <span className="text-gray-400 text-xl font-bold pb-4">:</span>

            {/* Score visitante */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 text-center">GOL</p>
              <input
                type="number"
                min={0}
                placeholder="0"
                {...register("awayScore")}
                className="w-16 h-16 text-3xl font-bold text-center bg-gray-100 rounded-xl border-none outline-none focus:bg-stone-50 text-emerald-900 tabular-nums"
              />
              <FieldError message={errors.awayScore?.message} />
            </div>

            {/* Equipo visitante */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">EQUIPO VISITANTE</p>
              <Controller
                name="awayTeam"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((t) => (
                        <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.awayTeam?.message} />
            </div>
          </div>
        </div>

        {/* Details + Clasificación */}
        <div className="grid grid-cols-2 gap-4">

          {/* Detalles */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-gray-400" />
              <p className="text-xs uppercase tracking-widest text-gray-500">DETALLES DEL ENCUENTRO</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Fecha</p>
                <Input type="date" {...register("date")} />
                <FieldError message={errors.date?.message} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Hora</p>
                <Input type="time" {...register("time")} />
                <FieldError message={errors.time?.message} />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Sede / Campo</p>
              <Controller
                name="venue"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar campo" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.venue?.message} />
            </div>
          </div>

          {/* Clasificación */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-4 w-4 text-gray-400" />
              <p className="text-xs uppercase tracking-widest text-gray-500">CLASIFICACIÓN</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Categoría</p>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.categoryId?.message} />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Controller
                name="finished"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span className="text-sm text-gray-600">Marcar como finalizado</span>
            </div>
          </div>
        </div>

        {/* Guardar */}
        <button
          type="submit"
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Save className="h-4 w-4" />
          Guardar Resultado
        </button>

        {/* Aviso */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Aviso de Sincronización</p>
            <p className="text-xs text-blue-700 mt-0.5">
              Al guardar el resultado, la clasificación del grupo se actualizará automáticamente en tiempo real.
            </p>
          </div>
        </div>

      </form>
    </div>
  )
}

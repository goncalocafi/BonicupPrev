"use client"

import { useState } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Save, Calendar, Settings, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { finished: false },
  })

  function onSubmit(values: FormValues) {
    setSubmitted(values)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN DE PARTIDOS</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 mt-1">Resultado guardado</h1>
        </div>

        <Card className="bg-white rounded-2xl border border-gray-200 p-6 ring-0 gap-0">
          <CardContent className="p-0 space-y-3">
            <p className="text-xl sm:text-2xl font-bold text-emerald-900 tabular-nums">
              {submitted.homeTeam}{" "}
              <span className="text-teal-600">{submitted.homeScore}–{submitted.awayScore}</span>{" "}
              {submitted.awayTeam}
            </p>
            <p className="text-sm text-gray-500">
              {submitted.date} · {submitted.time} · {submitted.venue}
            </p>
          </CardContent>
        </Card>

        <Button
          onClick={() => { setSubmitted(null); reset() }}
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-4 h-auto rounded-xl font-bold text-sm"
        >
          Insertar otro resultado
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">ADMINISTRACIÓN DE PARTIDOS</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 mt-1">Insertar resultado</h1>
        <p className="text-sm text-gray-500 mt-1">
          Introduce el marcador final y los detalles del encuentro.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Equipos + marcador */}
        <Card className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-emerald-900 p-4 sm:p-6 ring-0 gap-0">
          <CardContent className="p-0">

          {/* Mobile: stacked layout */}
          <div className="flex flex-col gap-4 sm:hidden">
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

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">GOL LOCAL</p>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("homeScore")}
                  className="w-full h-14 text-2xl font-bold text-center bg-gray-100 rounded-xl border-none outline-none focus:bg-stone-50 text-emerald-900 tabular-nums"
                />
                <FieldError message={errors.homeScore?.message} />
              </div>
              <span className="text-gray-400 text-xl font-bold mt-5">:</span>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">GOL VISIT.</p>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("awayScore")}
                  className="w-full h-14 text-2xl font-bold text-center bg-gray-100 rounded-xl border-none outline-none focus:bg-stone-50 text-emerald-900 tabular-nums"
                />
                <FieldError message={errors.awayScore?.message} />
              </div>
            </div>

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

          {/* Desktop: side-by-side layout */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_1fr] items-end gap-3">
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

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 text-center">GOL</p>
              <input
                type="number"
                min={0}
                placeholder="0"
                {...register("homeScore")}
                className="w-16 h-16 text-3xl font-bold text-center bg-gray-100 rounded-xl border-none outline-none focus:bg-stone-50 text-emerald-900 tabular-nums"
              />
            </div>

            <span className="text-gray-400 text-xl font-bold pb-4">:</span>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 text-center">GOL</p>
              <input
                type="number"
                min={0}
                placeholder="0"
                {...register("awayScore")}
                className="w-16 h-16 text-3xl font-bold text-center bg-gray-100 rounded-xl border-none outline-none focus:bg-stone-50 text-emerald-900 tabular-nums"
              />
            </div>

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
          </CardContent>
        </Card>

        {/* Details + Clasificación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Detalles */}
          <Card className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 ring-0 gap-0">
            <CardContent className="p-0">
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
            </CardContent>
          </Card>

          {/* Clasificación */}
          <Card className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 ring-0 gap-0">
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        </div>

        {/* Guardar */}
        <Button
          type="submit"
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-4 h-auto rounded-xl font-bold text-sm gap-2"
        >
          <Save className="h-4 w-4" />
          Guardar Resultado
        </Button>

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

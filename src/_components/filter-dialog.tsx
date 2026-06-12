"use client"

import { SlidersHorizontalIcon, StarIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

// TODO Connect with services in the database
const AVAILABLE_SERVICES = [
  { id: "cabelo", label: "Cabelo" },
  { id: "barba", label: "Barba" },
  { id: "sobrancelha", label: "Sobrancelha" },
  { id: "quimica", label: "Química" },
]

export default function FilterDialog() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedRating, setSelectedRating] = useState<string>(
    searchParams.get("rating") || "",
  )

  const [selectedServices, setSelectedServices] = useState<string[]>(
    searchParams.get("services")
      ? searchParams.get("services")!.split("+")
      : [],
  )

  const [orderBy, setOrderBy] = useState<string>(
    searchParams.get("orderBy") || "",
  )

  const activeFiltersCount = Array.from(searchParams.keys()).filter(
    (key) => key !== "title" && searchParams.get(key),
  ).length

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    )
  }

  // Function set url filters
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Filtro de Rating
    if (selectedRating) {
      params.set("rating", selectedRating)
    } else {
      params.delete("rating")
    }

    if (selectedServices.length > 0) {
      params.set("services", selectedServices.join("+"))
    } else {
      params.delete("services")
    }

    if (orderBy) {
      params.set("orderBy", orderBy)
    } else {
      params.delete("orderBy")
    }

    router.push(`/barbershops?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setSelectedRating("")
    setSelectedServices([])
    setOrderBy("")

    const params = new URLSearchParams()
    const title = searchParams.get("title")
    if (title) params.set("title", title)

    router.push(`/barbershops?${params.toString()}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative flex items-center gap-2">
          <SlidersHorizontalIcon className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground animate-in fade-in zoom-in-50 absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex min-h-[70%] flex-col justify-between">
        <div className="space-y-6 px-4">
          <DialogHeader>
            <DialogTitle>Filtrar Barbearias</DialogTitle>
            <DialogDescription>
              Refine sua busca para encontrar a barbearia ideal.
            </DialogDescription>
          </DialogHeader>

          {/* Rating filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Avaliação mínima</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((stars) => {
                const isSelected = selectedRating === String(stars)
                return (
                  <Button
                    key={stars}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className="flex h-9 flex-1 items-center justify-center gap-1 p-2"
                    onClick={() =>
                      setSelectedRating(isSelected ? "" : String(stars))
                    }
                  >
                    {stars}{" "}
                    <StarIcon
                      className={`h-3 w-3 ${isSelected ? "fill-primary-foreground" : "fill-amber-500 stroke-amber-500"}`}
                    />
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Services Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Serviços oferecidos</h3>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_SERVICES.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleToggleService(service.id)}
                  />
                  <Label
                    htmlFor={service.id}
                    className="cursor-pointer text-sm select-none"
                  >
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Order by */}
          <div className="space-y-3 border-t pt-2">
            <h3 className="text-sm font-medium">Ordenar por</h3>
            <RadioGroup
              value={orderBy}
              onValueChange={setOrderBy}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name_asc" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">
                  Nome (A-Z)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating_desc" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">
                  Melhores Avaliadas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price_asc" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">
                  Menor Preço de Serviço
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex-row gap-2 border-t pt-4 sm:space-x-0">
          <DialogClose asChild>
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="flex-1"
            >
              Limpar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleApplyFilters} className="flex-1">
              Aplicar Filtros
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

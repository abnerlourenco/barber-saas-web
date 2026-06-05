import { db } from "@/_lib/prisma"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import BarbershopCard from "../_components/barbershop-card"
import BookingItem from "../_components/booking-item"
import FastSearchButton from "../_components/fast-search-button"
import Header from "../_components/header"
import { Button } from "../_components/ui/button"
import { Input } from "../_components/ui/input"

// TODO: Receive BookingItem by props

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Abner!</h2>
        <p>Quinta-Feira, 13 de Fevereiro.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <FastSearchButton />

        <div className="relative mt-6 h-50 w-full">
          <Image
            alt="Agende nas melhores com FSW Barber"
            src={"/banner-01.png"}
            fill
            priority
            className="rounded-xl object-contain"
          />
        </div>

        <BookingItem />

        {/* Recomendados */}
        <h2 className="mt-6 mb-3 text-xs font-bold uppercase">Recomendados</h2>

        <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Populares */}
        <h2 className="mt-6 mb-3 text-xs font-bold uppercase">Populares</h2>

        <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Mais Visitados */}
        <h2 className="mt-6 mb-3 text-xs font-bold uppercase">
          Mais Visitados
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

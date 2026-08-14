import InputSearchButton from "@/_components/input-search-button"
import UserHeader from "@/_components/user-header"
import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import Image from "next/image"
import BarbershopCard from "../_components/barbershop-card"
import BookingItem from "../_components/booking-item"
import FastSearchButton from "../_components/fast-search-button"
import Header from "../_components/header"

// TODO: Receive BookingItem by props
// TODO: Create a booking with the employee of your choice.

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: session?.user.id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          barbershopService: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      <Header />

      <div className="p-5">
        <UserHeader variant="home" />

        <div className="mt-6">
          <InputSearchButton />
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

        {session?.user && (
          <div>
            <h2 className="mt-6 mb-3 text-xs font-bold uppercase">
              Meus Agendamentos
            </h2>

            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

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

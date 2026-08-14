import BookingItem from "@/_components/booking-item"
import Header from "@/_components/header"
import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

// TODO: create details bookings

export default async function Bookings() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    //TODO: open login pop-up(login-dialog)
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: session?.user.id,
      date: {
        lt: new Date(),
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

  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="mt-6 mb-3 text-xs font-bold uppercase">Confirmados</h2>

        <div className="space-y-3 p-5">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold uppercase">Finalizados</h2>

        <div className="space-y-3 p-5">
          {concludedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

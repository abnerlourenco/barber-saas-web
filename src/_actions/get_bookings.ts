"use server"

import { db } from "@/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookingProps {
  serviceId: string
  date: Date
}

export async function getBookings({ date }: GetBookingProps) {
  return db.booking.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  })
}

"use server"

import { db } from "@/_lib/prisma"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export default async function createBooking(params: CreateBookingParams) {
  await db.booking.create({
    data: params,
  })
}

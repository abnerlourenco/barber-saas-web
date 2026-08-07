"use server"

import { db } from "@/_lib/prisma"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export default async function createBooking(params: CreateBookingParams) {
  if (!params.userId) {
    throw new Error("User not found!")
  }

  await db.booking.create({
    data: params,
  })

  revalidatePath("/barbershops/[id]")
}

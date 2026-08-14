"use server"

import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export default async function createBooking({
  serviceId,
  date,
}: CreateBookingParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Usuário não autenticado!")
  }

  await db.booking.create({
    data: { serviceId, date, userId: session?.user.id },
  })

  revalidatePath("/barbershops/[id]")
}

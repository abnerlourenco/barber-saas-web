import BarbershopCard from "@/_components/barbershop-card"
import FilterDialog from "@/_components/filter-dialog"
import Header from "@/_components/header"
import InputSearchButton from "@/_components/input-search-button"
import { db } from "@/_lib/prisma"
import { Prisma } from "../../../prisma/generated/client"

interface BarbershopsPageProps {
  searchParams: Promise<{
    services?: string
    title?: string
    // rating?: string
    orderBy?: string
  }>
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const { services, title, orderBy } = await searchParams

  const conditions: Prisma.BarbershopWhereInput[] = []

  if (title) {
    conditions.push({
      name: { contains: title, mode: "insensitive" },
    })
  }

  // if (rating) {
  //   conditions.push({
  //     rating: { gte: Number(rating) },
  //   })
  // }

  if (services) {
    const servicesArray = services.split("+")
    servicesArray.forEach((serviceName) => {
      conditions.push({
        barbershopServices: {
          some: {
            name: {
              equals: serviceName,
              mode: "insensitive",
            },
          },
        },
      })
    })
  }

  let orderQuery: Prisma.BarbershopOrderByWithRelationInput = { name: "asc" }

  if (orderBy === "name_asc") {
    orderQuery = { name: "asc" }
    // } else if (orderBy === "rating_desc") {
    //   orderQuery = { rating: "desc" }
  } else if (orderBy === "price_asc") {
    orderQuery = {
      barbershopServices: {
        _count: "asc",
      },
    }
  }

  const barbershops = await db.barbershop.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    orderBy: orderQuery,
  })

  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <div className="mt-4 flex space-x-2">
          <div>
            <FilterDialog />
          </div>
          <div className="w-full">
            <InputSearchButton />
          </div>
        </div>

        <h2 className="mt-6 mb-3 text-xs font-semibold">
          Resultados para Busca:&quot;{title}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

import BarbershopCard from "@/_components/barbershop-card"
import Header from "@/_components/header"
import InputSearchButton from "@/_components/input-search-button"
import { db } from "@/_lib/prisma"

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const search = (await searchParams).search

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="mt-6">
          <InputSearchButton />
        </div>

        <h2 className="mt-6 mb-3 text-xs font-semibold">
          Resultados para &quot;{search}&quot;
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

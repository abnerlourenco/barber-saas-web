import ErrorPage from "@/src/_components/error-page"
import Footer from "@/src/_components/footer"
import ServiceItem from "@/src/_components/service-item"
import { Button } from "@/src/_components/ui/button"
import { db } from "@/src/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarbershopPageProps {
  params: Promise<{ barbershopId: string }>
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const { barbershopId } = await params

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: barbershopId,
    },
    include: {
      barbershopServices: true,
    },
  })

  if (!barbershop) {
    return <ErrorPage title="Barbearia não encontrada" errorCode={404} />
  }

  return (
    <div>
      <div className="relative h-62.5 w-full">
        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size={"icon"}
          variant={"default"}
          className="absolute top-4 left-4"
          asChild
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size={"icon"}
          variant={"default"}
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (400 avaliações)</p>
        </div>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Serviços</h2>
        <div className="space-y-3">
          {barbershop.barbershopServices.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

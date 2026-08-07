import Image from "next/image"
import { BarbershopService } from "../../prisma/generated/browser"
import BookingServiceContent from "./booking-service-content"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
  barbershopName: string
}

export default function ServiceItem({
  service,
  barbershopName,
}: ServiceItemProps) {
  const bookingService = {
    id: service.id,
    name: service.name,
    price: Number(service.price),
    barbershopId: service.barbershopId,
  }

  return (
    <Card className="p-0">
      <CardContent className="item-center flex gap-3 p-3">
        <div className="relative max-h-27.5 min-h-27.5 max-w-27.5 min-w-27.5">
          <Image
            src={service.imageUrl}
            fill
            alt={service.name}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Direita */}
        <div className="flex w-full flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>

          {/* PRICE and Button */}
          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(bookingService.price)}
            </p>

            <BookingServiceContent
              service={bookingService}
              barbershopName={barbershopName}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

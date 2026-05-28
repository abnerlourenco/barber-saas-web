import { BarbershopService } from "@/prisma/generated/client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

export default function ServiceItem({ service }: ServiceItemProps) {
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
              }).format(Number(service.price))}
            </p>
            <Button size={"sm"} className="cursor-pointer">
              <Link href={"/"}>Reservar</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

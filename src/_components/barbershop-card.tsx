import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Barbershop } from "../../prisma/generated/browser"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface BarbershopCardProps {
  barbershop: Barbershop
}

export default function BarbershopCard({ barbershop }: BarbershopCardProps) {
  return (
    <Card className="min-w-48 rounded-2xl p-1">
      <CardContent className="p-0">
        <div className="relative h-39.75 w-full">
          <Image
            src={barbershop.imageUrl}
            alt="barbershop image"
            fill
            className="rounded-xl object-cover"
          />
          <Badge
            className="absolute top-2 left-2 space-x-1"
            variant="secondary"
          >
            <Star className="fill-primary text-primary" size={12} />
            <span className="text-xs font-semibold">5,0</span>
          </Badge>
        </div>

        <div className="px-1 pt-3 pb-1">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>

          <Button
            variant="secondary"
            className="mt-5 w-full cursor-pointer"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

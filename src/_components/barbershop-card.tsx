import { Barbershop } from "@/prisma/generated/client"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

interface BarbershopCardProps {
  barbershop: Barbershop
}

export default async function BarbershopCard({
  barbershop,
}: BarbershopCardProps) {
  return (
    <Card className="flex min-w-50 flex-col gap-3 rounded-2xl p-2">
      <CardHeader className="relative p-0">
        <Image
          src={barbershop.imageUrl}
          alt="barbershop image"
          className="fill rounded-xl object-cover"
          width={250}
          height={250}
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          <Star className="fill-primary text-primary" size={12} />
          <p className="text-xs font-semibold">5,0</p>
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col p-1">
        <div className="">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
        </div>
      </CardContent>

      <CardFooter className="max-w-45 px-0">
        <Button
          variant="secondary"
          className="h-10 w-full cursor-pointer"
          asChild
        >
          <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

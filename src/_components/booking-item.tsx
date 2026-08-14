import { formatDate, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { Prisma } from "../../prisma/generated/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      barbershopService: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export default async function BookingItem({ booking }: BookingItemProps) {
  const isConfirmed = isFuture(booking.date)

  return (
    <>
      <Card className="min-w-[80%] p-0">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h1 className="font-semibold">{booking.barbershopService.name}</h1>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt="Barbershop image"
                  src={booking.barbershopService.barbershop.imageUrl}
                />
              </Avatar>
              <p className="text-sm">
                {booking.barbershopService.barbershop.name}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-10">
            <p className="text-md capitalize">
              {formatDate(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <strong className="text-3xl">
              {formatDate(booking.date, "dd", { locale: ptBR })}
            </strong>
            <p className="text-sm">
              {formatDate(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

export default function BookingItem() {
  return (
    <>
      <h2 className="mt-6 mb-3 text-xs font-bold uppercase">Agendamentos</h2>

      <Card className="p-0">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge>Confirmado</Badge>
            <h1 className="font-semibold">Corte de Cabelo</h1>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt="Avatar image"
                  src="https://github.com/evilrabbit.png"
                />
              </Avatar>
              <p className="text-sm">Tião Barbeiro</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-10">
            <p className="text-md">Fevereiro</p>
            <strong className="text-3xl">13</strong>
            <p className="text-sm">09:45</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

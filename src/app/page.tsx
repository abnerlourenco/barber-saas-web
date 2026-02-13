import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Header from "../_components/header"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import { Badge } from "../_components/ui/badge"
import { Button } from "../_components/ui/button"
import { Card, CardContent } from "../_components/ui/card"
import { Input } from "../_components/ui/input"

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Abner!</h2>
        <p>Quinta-Feira, 13 de Fevereiro.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-45 w-full">
          <Image
            alt="Agende nas melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

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

        <h2 className="mt-6 mb-3 text-xs font-bold uppercase">Recomendados</h2>
      </div>
    </div>
  )
}

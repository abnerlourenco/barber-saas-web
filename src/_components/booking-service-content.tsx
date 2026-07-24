"use client"

import createBooking from "@/_actions/create_booking"
import { formatDate, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent } from "./ui/card"
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"

interface ServiceBookingProps {
  service: {
    name: string
    id: string
    price: number
  }
  barbershopName: string
}

// TODO: Nao apresentar horarios com agendamentos
// TODO: somente reserva com usuário logado, redirect para fazer login
// TODO: Não permitir agendar com data anterior a hoje
// TODO: Agendamento somente em 1 horas de antecedencia

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

export default function BookingServiceContent({
  service,
  barbershopName,
}: ServiceBookingProps) {
  const { data } = useSession()

  const [selectDate, setSelectDate] = useState<Date | undefined>(undefined)
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectDate(date)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectDate || !selectTime) return

      const hour = Number(selectTime.split(":")[0])
      const minute = Number(selectTime.split(":")[1])

      const newDate = set(selectDate, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        userId: data?.user.id,
        date: newDate,
      })

      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  return (
    <SheetContent className="gap-0 px-0">
      <SheetHeader className="px-0 text-center">
        <SheetTitle>Fazer Reserva</SheetTitle>
      </SheetHeader>

      <div className="border-b border-solid"></div>

      <div className="border-b border-solid px-2 py-4">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={selectDate}
          onSelect={handleDateSelect}
          styles={{
            button_previous: {
              width: "32px",
              height: "32px",
            },
            button_next: {
              width: "32px",
              height: "32px",
            },
            week_number_header: {
              width: "100%",
            },
            caption_label: {
              textTransform: "capitalize",
            },
            weekday: {
              textTransform: "capitalize",
            },
          }}
          className="w-full"
        />
      </div>

      {selectDate && (
        <div className="flex gap-3 overflow-x-auto border-b border-solid p-4 [&::-webkit-scrollbar]:hidden">
          {TIME_LIST.map((time) => (
            <Button
              key={time}
              variant={selectTime == time ? "default" : "outline"}
              className="rounded-full border"
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      )}

      {selectTime && selectDate && (
        <div className="p-5">
          <Card>
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm">{service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {formatDate(selectDate, "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horario</h2>
                <p className="text-sm">{selectTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{barbershopName}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectDate && selectTime && (
        <SheetFooter className="m-0 px-5">
          <SheetClose asChild>
            <Button onClick={handleCreateBooking}>Confirmar Agendamento</Button>
          </SheetClose>
        </SheetFooter>
      )}
    </SheetContent>
  )
}

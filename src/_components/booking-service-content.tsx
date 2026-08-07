"use client"

import createBooking from "@/_actions/create_booking"
import { getBookings } from "@/_actions/get_bookings"
import { ensureAuthenticated } from "@/utils/auth"
import { formatDate, set, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Booking } from "../../prisma/generated/client"
import LoginDialog from "./login-dialog"
import NotificationCard, { showNotification } from "./show-notification"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent } from "./ui/card"
import { Dialog } from "./ui/dialog"
import {
  Sheet,
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

// TODO: Não permitir agendar com horario e dia já utilizado
// TODO: Agendamento somente em 1 horas de antecedencia
// TODO: persistir horarios pelo banco de dados da barbearia

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

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minute = Number(time.split(":")[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

export default function BookingServiceContent({
  service,
  barbershopName,
}: ServiceBookingProps) {
  const { data, status } = useSession()

  const [selectDate, setSelectDate] = useState<Date | undefined>(undefined)
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined)

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  const [loginOpen, setLoginOpen] = useState(false)

  const [visible, setVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const today = startOfDay(new Date())

  useEffect(() => {
    const fetch = async () => {
      if (!selectDate) return
      const bookings = await getBookings({
        date: selectDate,
        serviceId: service.id,
      })

      setDayBookings(bookings)
    }
    fetch()
  }, [selectDate, service.id])

  const getAuthenticatedSession = () =>
    ensureAuthenticated(status, data, () => {
      showNotification(
        setVisible,
        setNotificationMessage,
        "Login é necessário para realizar agendamento",
      )

      setLoginOpen(true)
    })

  const handleDateSelect = (date: Date | undefined) => {
    if (!getAuthenticatedSession()) return

    setSelectDate(date)
    setSelectTime(undefined)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectTime(time)
  }

  const handleBookingSheetIsOpen = () => {
    setSelectDate(undefined)
    setSelectTime(undefined)
    setDayBookings([])

    setBookingSheetIsOpen(false)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectDate || !selectTime) return

      const session = getAuthenticatedSession()
      if (!session) return

      const hour = Number(selectTime.split(":")[0])
      const minute = Number(selectTime.split(":")[1])

      const newDate = set(selectDate, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        userId: session.user.id,
        date: newDate,
      })

      showNotification(
        setVisible,
        setNotificationMessage,
        "Reserva criada com sucesso!",
      )
    } catch (error) {
      console.error(error)

      showNotification(
        setVisible,
        setNotificationMessage,
        "Erro ao criar reserva!",
      )
    }

    handleBookingSheetIsOpen()
  }

  return (
    <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetIsOpen}>
      <Button
        size={"sm"}
        className="cursor-pointer"
        onClick={() => setBookingSheetIsOpen(true)}
      >
        Reservar
      </Button>

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
            disabled={{ before: today }}
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
            {getTimeList(dayBookings).map((time) => (
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
              <Button onClick={handleCreateBooking}>
                Confirmar Agendamento
              </Button>
            </SheetClose>
          </SheetFooter>
        )}

        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <LoginDialog />
        </Dialog>
      </SheetContent>

      <NotificationCard visible={visible} message={notificationMessage} />
    </Sheet>
  )
}

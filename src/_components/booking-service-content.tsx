"use client"

import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

export default function BookingServiceContent() {
  const [selectDate, setSelectDate] = useState<Date | undefined>(undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectDate(date)
  }

  return (
    <SheetContent>
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
    </SheetContent>
  )
}

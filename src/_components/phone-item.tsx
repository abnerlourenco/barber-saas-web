"use client"

import whatsappIcon from "@/public/whatsapp.svg" // Ajuste o caminho conforme seu projeto
import { Copy, SmartphoneIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import NotificationCard, { showNotification } from "./show-notification"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

export default function PhoneItem({ phone }: PhoneItemProps) {
  const [visible, setVisible] = useState(false)

  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)
  }

  const cleanPhone = phone.replace(/\D/g, "")
  // Se o número não vier com o código do país (55 para Brasil), você pode concatenar:
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`}`

  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm font-semibold">{phone}</p>
      </div>
      <div className="flex items-center space-x-3 bg-center">
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button size={"icon"} variant={"outline"}>
            <Image
              src={whatsappIcon}
              alt="Icone do WhatsApp"
              width={20}
              height={20}
            />
          </Button>
        </Link>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            handleCopyPhoneClick(phone)
            showNotification(setVisible)
          }}
        >
          <Copy />
          Copiar
        </Button>
      </div>
      <NotificationCard
        visible={visible}
        message="Copiado na area de transferência!"
      />
    </div>
  )
}

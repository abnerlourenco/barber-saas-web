import { CalendarIcon, HomeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fastSearchOptions } from "./fast-search-button"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import UserHeader from "./user-header"
import UserLogoutButton from "./user-logout-button"

export default function Sidebar() {
  return (
    <SheetContent className="min-w-70 overflow-y-auto md:max-w-87.5">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* Avatar / Login */}
      <div className="flex items-center gap-3 border-b border-solid px-5 pt-5 pb-5">
        <UserHeader variant="sidebar" />
      </div>

      {/* Botões de Navegação */}
      <div className="flex flex-col gap-2 border-b border-solid px-5 pt-0 pb-5">
        <SheetClose asChild>
          <Button className="h-11 justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button className="h-11 justify-start gap-2" variant="ghost" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        </SheetClose>
      </div>

      {/* QuickAccess */}
      <div className="flex flex-col gap-2 border-b border-solid px-5 pt-0 pb-5">
        {fastSearchOptions.map((options) => (
          <SheetClose asChild key={options.title}>
            <Button
              variant="ghost"
              className="h-11 justify-start gap-2"
              key={options.title}
              asChild
            >
              <Link href={`/barbershops?search=${options.title}`}>
                <Image
                  alt={options.title}
                  src={options.imageUrl}
                  width={18}
                  height={18}
                  className="object-contain"
                />
                {options.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {/* Exit button */}
      <div className="pt-0">
        <UserLogoutButton />
      </div>
    </SheetContent>
  )
}

import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fastSearchOptions } from "./fast-search-button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export default function Header() {
  return (
    <header>
      <Card className="custom-card rounded-t-none border-none">
        <CardContent className={"flex flex-row items-center justify-between"}>
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-70 overflow-y-auto md:max-w-87.5">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              {/* Avatar */}
              <div className="flex items-center gap-3 border-b border-solid px-5 pb-5">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/abnerlourenco.png" />
                </Avatar>
                <div>
                  <p className="font-bold">Abner Lourenco</p>
                  <p className="text-sm">abner@barbershop.com</p>
                </div>
              </div>

              {/* Bottons */}
              <div className="flex flex-col gap-2 border-b border-solid px-5 pb-5">
                <SheetClose asChild>
                  <Button
                    className="h-11 justify-start gap-2"
                    variant={"ghost"}
                    asChild
                  >
                    <Link href={"/"}>
                      <HomeIcon size={18} />
                      Inicio
                    </Link>
                  </Button>
                </SheetClose>
                <Button
                  className="h-11 justify-start gap-2"
                  variant={"ghost"}
                  asChild
                >
                  <Link href={"/agendamentos"}>
                    <CalendarIcon size={18} />
                    Agendamentos
                  </Link>
                </Button>
              </div>

              {/* QuickAccess */}
              <div className="flex flex-col gap-2 border-b border-solid px-5 pb-5">
                {fastSearchOptions.map((options) => (
                  <Button
                    variant={"ghost"}
                    className="h-11 justify-start gap-2"
                    key={options.title}
                  >
                    {/* Image ligth theme */}
                    <Image
                      alt={options.title}
                      src={options.imageUrl}
                      width={18}
                      height={18}
                      className="block object-contain dark:hidden"
                    />

                    {/* Image dark theme*/}
                    <Image
                      alt={options.title}
                      src={options.darkImageUrl || options.imageUrl}
                      width={18}
                      height={18}
                      className="hidden object-contain dark:block"
                    />

                    {options.title}
                  </Button>
                ))}
              </div>

              {/* Exit button */}
              <div className="flex flex-col gap-2 px-5 pb-5">
                <Button className="h-11 justify-start gap-2" variant={"ghost"}>
                  <LogOutIcon size={18} />
                  Sair da conta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fastSearchOptions } from "./fast-search-button"
import LoginDialog from "./login-dialog"
import LogoutDialog from "./logout-dialog"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

export default function Sidebar() {
  return (
    <SheetContent className="min-w-70 overflow-y-auto md:max-w-87.5">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* Avatar */}
      <div className="flex items-center justify-between gap-3 border-b border-solid px-5 pb-5">
        <h2 className="font-bold">Olá faça seu login</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} asChild>
              <span>
                <LogInIcon />
              </span>
            </Button>
          </DialogTrigger>

          <LoginDialog />
        </Dialog>
        {/* <Avatar className="h-16 w-16">
         <AvatarImage src="https://github.com/abnerlourenco.png" />
        </Avatar>

        <div>
         <p className="font-bold">Abner Lourenco</p>
         <p className="text-sm">abner@barbershop.com</p>
        </div> */}
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
        <Button className="h-11 justify-start gap-2" variant={"ghost"} asChild>
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
            <Image
              alt={options.title}
              src={options.darkImageUrl}
              width={18}
              height={18}
              className="object-contain"
            />
            {options.title}
          </Button>
        ))}
      </div>

      {/* Exit button */}
      <div className="flex flex-col gap-2 px-5 pb-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"lg"}
              className="justify-start gap-2"
              variant={"ghost"}
            >
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </DialogTrigger>

          <LogoutDialog />
        </Dialog>
      </div>
    </SheetContent>
  )
}

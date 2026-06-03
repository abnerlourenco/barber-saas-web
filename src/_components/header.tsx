import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Sidebar from "./sidebar-sheets"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"

export default function Header() {
  return (
    <header>
      <Card className="custom-card rounded-t-none border-none py-4">
        <CardContent className={"flex flex-row items-center justify-between"}>
          <Image
            alt="Barber Go barbershops"
            src="/logo.png"
            height={30}
            width={150}
            className="w-auto"
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <Sidebar />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

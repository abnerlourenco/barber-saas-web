import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Sidebar from "./sidebar-sheets"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"

export default function Header() {
  return (
    <header>
      <Card className="custom-card rounded-t-none border-none">
        <CardContent className={"flex flex-row items-center justify-between"}>
          <Image
            alt="FSW Barber"
            src="/logo.png"
            height={18}
            width={120}
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

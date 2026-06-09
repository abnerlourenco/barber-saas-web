import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "./sidebar-sheets"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"

export default function Header() {
  return (
    <header>
      <Card className="custom-card rounded-t-none border-none py-5">
        <CardContent className={"flex flex-row items-center justify-between"}>
          <Link href="/">
            <Image
              alt="Barber Go barbershops"
              src="/logo.png"
              height={18}
              width={120}
            />
          </Link>

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

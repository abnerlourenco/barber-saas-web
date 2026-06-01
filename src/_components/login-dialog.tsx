import { LogInIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <LogInIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80">
        <DialogHeader className="space-y-3">
          <DialogTitle>Faça login na plataforma</DialogTitle>
          <DialogDescription>
            Conecte-se usando a sua conta do Google
          </DialogDescription>

          <Button
            size={"lg"}
            variant={"outline"}
            className="cursor-pointer gap-2 font-bold"
          >
            <Image
              src="/google.svg"
              alt="Google login"
              width={20}
              height={20}
            />
            Google
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

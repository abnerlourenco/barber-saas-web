import { Button } from "./ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

export default function LogoutDialog() {
  return (
    <DialogContent className="w-80">
      <DialogHeader className="space-y-3">
        <DialogTitle>Sair</DialogTitle>
        <DialogDescription>Deseja mesmo sair da plataforma?</DialogDescription>

        <div className="flex items-center justify-between gap-2">
          <DialogClose asChild>
            <Button
              size={"lg"}
              className="flex-1 cursor-pointer"
              variant={"outline"}
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            size={"lg"}
            className="flex-1 cursor-pointer"
            variant={"destructive"}
          >
            Sair
          </Button>
        </div>
      </DialogHeader>
    </DialogContent>
  )
}

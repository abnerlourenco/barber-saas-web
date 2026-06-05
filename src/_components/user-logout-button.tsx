"use client"

import { LogOutIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import LogoutDialog from "./logout-dialog"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"

export default function UserLogoutButton() {
  const { data } = useSession()

  // Se o usuário não estiver logado, não renderiza absolutamente nada no servidor/cliente
  if (!data?.user) return null

  return (
    <div className="flex flex-col gap-2 px-5 pb-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="justify-start gap-2 text-red-500 hover:text-red-600"
            variant="ghost"
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </DialogTrigger>
        <LogoutDialog />
      </Dialog>
    </div>
  )
}

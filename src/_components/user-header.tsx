"use client"

import { LogInIcon, UserIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import LoginDialog from "./login-dialog"
import LogoutDialog from "./logout-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"

interface UserHeaderProps {
  variant: "sidebar" | "home" | "desktop"
}

export default function UserHeader({ variant }: UserHeaderProps) {
  const { data } = useSession()

  // is active login
  if (data?.user) {
    if (variant === "home") {
      return (
        <div>
          <h1 className="text-xl font-bold">
            Olá, {data.user.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground text-sm">Sexta, 2 de Fevereiro</p>
        </div>
      )
    }

    if (variant === "desktop") {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-auto items-center gap-2 rounded-full p-2 hover:bg-zinc-800"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={data.user.image ?? undefined}
                  alt={data.user.name ?? "Perfil"}
                />
              </Avatar>
              <span className="hidden pr-2 text-sm font-semibold md:inline">
                {data.user.name}
              </span>
            </Button>
          </DialogTrigger>
          <LogoutDialog />
        </Dialog>
      )
    }

    // Sidebar
    return (
      <div className="flex items-center gap-3">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={data.user.image ?? undefined}
            alt={data.user.name ?? "Avatar"}
          />
        </Avatar>
        <div>
          <p className="font-bold">{data.user.name}</p>
          <p className="text-muted-foreground text-sm">{data.user.email}</p>
        </div>
      </div>
    )
  }

  // --- SE NÃO ESTIVER LOGADO ---
  return (
    <Dialog>
      {variant === "home" && (
        <>
          <h2 className="text-xl font-bold">Olá, Faça seu Login!</h2>
          <p className="text-sm">Sexta, 2 de Fevereiro</p>
        </>
      )}

      {variant === "sidebar" && (
        <div className="flex w-full items-center justify-between">
          <h2 className="font-bold">Olá. Faça seu login!</h2>
          <DialogTrigger asChild>
            <Button size="icon" className="bg-primary hover:bg-primary/90">
              <LogInIcon size={18} />
            </Button>
          </DialogTrigger>
        </div>
      )}

      {variant === "desktop" && (
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <UserIcon size={18} />
            Perfil
          </Button>
        </DialogTrigger>
      )}

      <LoginDialog />
    </Dialog>
  )
}

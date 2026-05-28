import { Copy } from "lucide-react"
import type { ComponentProps } from "react"

interface NotificationCardProps extends ComponentProps<"div"> {
  message: string
  visible: boolean
}

export function showNotification(setVisible: (visible: boolean) => void) {
  setVisible(true)
  setTimeout(() => setVisible(false), 4000)
}

export default function NotificationCard({
  message,
  visible,
  ...props
}: NotificationCardProps) {
  return (
    <div
      data-visible={visible}
      className="bg-secondary sm:[max-w-100] fixed top-12 left-1/2 flex min-w-80 -translate-x-1/2 transform flex-row items-center justify-between gap-2 rounded p-5 shadow-lg transition-all duration-500 ease-in-out data-[visible=false]:-translate-y-8 data-[visible=false]:opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
      {...props}
    >
      <Copy className="text-primary size-5" />
      <p className="text-primary font-semibold">{message}</p>
      <span className="from-purple animate-load absolute bottom-1 left-1 h-1.5 w-[calc(100%-10px)] origin-left scale-x-0 transform rounded bg-linear-to-r to-gray-600" />
    </div>
  )
}

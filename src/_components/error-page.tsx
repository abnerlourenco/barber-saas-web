import Link from "next/link"
import { Button } from "./ui/button"

interface ErrorPageProps {
  title: string
  errorCode: number
}

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4">
      <h1 className="text-primary text-8xl font-bold md:text-9xl">
        {props.errorCode}
      </h1>
      <div className="bg-secondary my-5 h-1 w-16 rounded md:my-7"></div>
      <p className="text-2xl font-bold text-gray-800 md:text-3xl">
        {props.title}
      </p>
      <p className="text-foreground mt-4 max-w-md py-4 text-center text-sm md:text-base">
        A Página que você acessou pode ter sido removida, alterada, ou
        temporariamente indisponível.
      </p>
      <div className="bg-secondary my-5 h-1 w-16 rounded md:my-7"></div>
      <Button size="lg">
        <Link href={"/"}>Retornar</Link>
      </Button>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

interface fastSearchOptions {
  imageUrl: string
  title: string
  darkImageUrl: string
}

export const fastSearchOptions: fastSearchOptions[] = [
  {
    imageUrl: "/cabelo.svg",
    title: "Cabelo",
    darkImageUrl: "/cabelo_dark.svg",
  },
  {
    imageUrl: "/barba.svg",
    title: "Barba",
    darkImageUrl: "/barba_dark.svg",
  },
  {
    imageUrl: "/hidratacao.svg",
    title: "Hidratação",
    darkImageUrl: "/hidratacao_dark.svg",
  },
  {
    imageUrl: "/massagem.svg",
    title: "Massagem",
    darkImageUrl: "/massagem_dark.svg",
  },
  {
    imageUrl: "/sobrancelha.svg",
    title: "Sobrancelha",
    darkImageUrl: "/sobrancelha_dark.svg",
  },
  {
    imageUrl: "/acabamento.svg",
    title: "Acabamento",
    darkImageUrl: "/acabamento_dark.svg",
  },
]

export default function FastSearchButton() {
  return (
    <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {fastSearchOptions.map((option) => (
        <Button
          className="cursor-pointer gap-2"
          variant="secondary"
          key={option.title}
          asChild
        >
          <Link href={`/barbershops?search=${option.title}`}>
            <Image
              src={option.imageUrl}
              width={16}
              height={16}
              alt={option.title}
            />
            {option.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

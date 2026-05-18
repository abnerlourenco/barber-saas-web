import Image from "next/image"
import { Button } from "./ui/button"

interface fastSearchOptions {
  imageUrl: string
  title: string
}

const fastSearchOptions: fastSearchOptions[] = [
  {
    imageUrl: "/cabelo.svg",
    title: "Cabelo",
  },
  {
    imageUrl: "/barba.svg",
    title: "Barba",
  },
  {
    imageUrl: "/hidratacao.svg",
    title: "Hidratação",
  },
  {
    imageUrl: "/massagem.svg",
    title: "Massagem",
  },
  {
    imageUrl: "/sobrancelha.svg",
    title: "Sobrancelha",
  },
  {
    imageUrl: "/acabamento.svg",
    title: "Acabamento",
  },
]

export default function FastSearchButton() {
  return (
    <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {fastSearchOptions.map((option) => (
        <Button className="cursor-pointer gap-2" key={option.title}>
          <Image
            src={option.imageUrl}
            width={16}
            height={16}
            alt={option.title}
          />
          {option.title}
        </Button>
      ))}
    </div>
  )
}

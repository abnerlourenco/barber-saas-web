"use client"

import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

export default function InputSearchButton() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefaut()
    router.push(`/barbershops?search=${search}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="Faça sua busca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  )
}

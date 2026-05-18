import { Card, CardContent } from "./ui/card"

export default function Footer() {
  return (
    <footer>
      <Card className="items-center rounded-none sm:items-start">
        <CardContent>
          <p className="text-sm">
            © 2026 Copyright
            <span className="font-bold"> FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

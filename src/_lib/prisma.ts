import { PrismaClient } from "@/prisma/generated/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg" // Geralmente o adapter-pg usa o pacote 'pg' por baixo

// 1. Tipar o objeto global corretamente para guardar a instância do DB
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// 2. Só inicializar o adaptador e o cliente se eles ainda não existirem no escopo global
if (!globalForPrisma.prisma) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)

  globalForPrisma.prisma = new PrismaClient({ adapter })
}

// 3. Exportar a instância única
export const db = globalForPrisma.prisma

// 4. Garantir que a referência persiste entre os reloads do Next.js (apenas em dev)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  // Ambil tanggal hari ini dalam timezone Asia/Jakarta
  const todayString = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  })

  const todayStart = new Date(`${todayString}T00:00:00`)
  const todayEnd = new Date(`${todayString}T23:59:59`)

  const events = await prisma.event.findMany({
    where: {
      eventDate: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    orderBy: { startTime: "asc" },
  })

  return NextResponse.json(events)
}
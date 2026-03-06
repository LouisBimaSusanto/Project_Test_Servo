import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

import { prisma } from "@/lib/prisma"

// GET all events
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get("filter")
  const dateQuery = searchParams.get("date")

  const todayString = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  })

  const todayStart = new Date(`${todayString}T00:00:00`)
  const todayEnd = new Date(`${todayString}T23:59:59`)

  let whereCondition: any = {}

  // Filter by today
  if (filter === "today") {
    whereCondition = {
      eventDate: {
        gte: todayStart,
        lte: todayEnd,
      },
    }
  }

  // Filter by upcoming
  if (filter === "upcoming") {
    whereCondition = {
      eventDate: {
        gt: todayEnd,
      },
    }
  }

  // Filter by past
  if (filter === "past") {
    whereCondition = {
      eventDate: {
        lt: todayStart,
      },
    }
  }

  // Filter by specific date
  if (dateQuery) {
    const start = new Date(`${dateQuery}T00:00:00`)
    const end = new Date(`${dateQuery}T23:59:59`)

    whereCondition = {
      eventDate: {
        gte: start,
        lte: end,
      },
    }
  }

  const events = await prisma.event.findMany({
    where: whereCondition,
    orderBy: [
        { eventDate: "asc" },
        { startTime: "asc" },
    ]
  })

  return NextResponse.json(events)
}


// POST create event
export async function POST(request: Request) {
  const body = await request.json()

  const newEvent = await prisma.event.create({
    data: {
        title: body.title,
        location: body.location,
        floor: Number(body.floor),
        eventDate: new Date(body.eventDate),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
    },
  })

  return NextResponse.json(newEvent)
}
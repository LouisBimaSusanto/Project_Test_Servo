import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// UPDATE
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const body = await request.json()

  const { id } = await context.params
  const eventId = parseInt(id)

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: {
      title: body.title,
      location: body.location,
      floor: body.floor,
      eventDate: new Date(body.eventDate),
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    },
  })

  return NextResponse.json(updatedEvent)
}

// DELETE
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const eventId = parseInt(id)

  await prisma.event.delete({
    where: { id: eventId },
  })

  return NextResponse.json({ message: "Deleted successfully" })
}

// Get
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const eventId = parseInt(id)

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  })

  if (!event) {
    return NextResponse.json(
      { message: "Event not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(event)
}
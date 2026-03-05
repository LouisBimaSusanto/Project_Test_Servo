"use client"

import { useEffect, useState } from "react"
import { set } from "zod"
import Link from "next/link"

type Event = {
    id: number
    title: string
    location: string
    eventDate: string
    floor: number
    startTime: string
    endTime: string
}

export default function AdminPage() {
const [events, setEvents] = useState<Event[]>([])

//Data for creating event (state form)
const [title, setTitle] = useState("")
const [location, setLocation] = useState("")
const [startTime, setStartTime] = useState("")
const [endTime, setEndTime] = useState("")
const [floor, setFloor] = useState<number | "">("")
const [eventDate, setEventDate] = useState("")

async function fetchEvents() {
    const res = await fetch("/api/events")
    const data = await res.json()
    setEvents(data)
}


// Create event
async function handleCreate(e: React.FormEvent) {
    e.preventDefault()

await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        title,
        location,
        floor,
        eventDate,
        startTime,
        endTime,
        }),
    })

    setTitle("")
    setLocation("")
    setFloor("")
    setEventDate("")

    fetchEvents()
}


// Delete event
async function handleDelete(id: number) {
    await fetch(`/api/events/${id}`, {
    method: "DELETE",
})

    fetchEvents()
}

useEffect(() => {
    fetchEvents()
}, [])

return (
    <div className="min-h-screen bg-black text-white p-10">
    <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

    <form onSubmit={handleCreate} className="mb-8">
        <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mr-2 bg-gray-800 rounded"
        />

        <input
            type="text"
            placeholder="Event Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 mr-2 bg-gray-800 rounded"
        />

        <input
            type="text"
            placeholder="Floor"
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
            className="p-2 mr-2 bg-gray-800 rounded"
        />

        <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="p-2 mr-2 bg-gray-800 rounded"
        />

        <input
            type="datetime-local"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-2 mr-2 bg-gray-800 rounded"
        />

        <input
            type="datetime-local"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-2 mr-2 bg-gray-800 rounded"
        />

        <button type="submit" className="bg-emerald-600 px-4 py-2 rounded">
            Add Event
        </button>
    </form>

{events.map((event) => (
        <div key={event.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4 hover:border-emerald-500 hover:scale-[1.01] transition-all duration-200">
            <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center bg-black border border-zinc-700 rounded-lg px-3 py-2 min-w-15">
                            <span className="text-xs text-gray-400">
                            {new Date(event.eventDate).toLocaleDateString("en-US",{month:"short"})}
                            </span>
                            <span className="text-xl font-bold">
                            {new Date(event.eventDate).getDate()}
                            </span>
                        </div>
                        
                        <div className="flex-1">

                            <h2 className="text-lg font-semibold">
                            {event.title}
                            </h2>

                            <p className="text-gray-400 text-sm">
                            {event.location}
                            </p>

                            <p className="text-gray-400 text-sm mt-1">
                            {new Date(event.startTime).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}
                            {" - "}
                            {new Date(event.endTime).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}
                            </p>

                            <p className="text-gray-500 text-xs mt-1">
                            Floor {event.floor}
                            </p>
                        </div>

                        <button onClick={() => handleDelete(event.id)} className="mt-3 bg-red-600 px-3 py-1 rounded">
                        Delete
                        </button>

                        <Link href={`/admin/edit/${event.id}`} className="mt-3 ml-3 bg-blue-600 px-3 py-1 rounded">
                        Edit
                        </Link>
            </div>
        </div>
            ))}
    </div>
)   
}
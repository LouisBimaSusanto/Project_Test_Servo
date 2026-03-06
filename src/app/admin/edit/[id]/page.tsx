"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditEventPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [floor, setFloor] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    useEffect(() => {
        async function fetchEvent() {
        const res = await fetch(`/api/events/${id}`)
        const data = await res.json()

        setTitle(data.title)
        setLocation(data.location)
        setFloor(String(data.floor))
        setEventDate(data.eventDate.split("T")[0])
        
        const toWIBTime = (utcString: string) => {
        return new Date(utcString).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Jakarta",
        })
        }

        setStartTime(toWIBTime(data.startTime))
        setEndTime(toWIBTime(data.endTime))
    }

        if (id) fetchEvent()
    }, [id])

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()

        await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            location,
            floor: Number(floor),
            eventDate,
            startTime,
            endTime,
        }),
        })

        router.push("/admin")
    }

//Input form
    return (
        <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Event</h1>

        <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            />

            <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            />

            <input
            type="number"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            />

            <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            />

            <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            />

            <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            />

            <button className="bg-emerald-600 px-4 py-2 rounded">
            Update Event
            </button>
        </form>
        </div>
    )
}
"use client"

import { useState } from "react"

export default function PaginationBullet({events,}: {
    events: any[]
    }) {
    const EVENTS_PER_PAGE = 2
    const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE)

    const [page, setPage] = useState(0)

    const start = page * EVENTS_PER_PAGE
    const visibleEvents = events.slice(start, start + EVENTS_PER_PAGE)

return (
        <>
        {/* Event List */}
        {visibleEvents.map((event: any) => (
            <div key={event.id} className="border-b border-gray-700 mt-6 mb-8">
            <h2 className="text-5xl font-extrabold text-[#00E5A0]">
                {event.title}
            </h2>

            <div className="flex justify-between items-center mt-4 text-2xl text-white">
                <div className="flex gap-10">
                <span className="uppercase">
                    {event.location}
                </span>

                <span className="font-semibold">
                    {event.floor} FL
                </span>
                </div>

                <div className="font-mono">
                {new Date(event.startTime).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                })}{" "}
                -{" "}
                {new Date(event.endTime).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                })} WIB
                </div>
                

            </div>
        </div>
    ))}

        {/* Bullet */}
        {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">            
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                key={index}
                onClick={() => setPage(index)}
                className={`w-3 h-3 rounded-full transition ${
                    page === index
                    ? "bg-white"
                    : "bg-gray-500"
                }`}
                />
            ))}
            </div>
        )}
        </>
    )
}
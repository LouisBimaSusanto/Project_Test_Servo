"use client"

import { useEffect, useState } from "react"

type Promo = {
    image_url: string
}

export default function PromoSlideshow() {
    const [promos, setPromos] = useState<Promo[]>([])
    const [index, setIndex] = useState(0)

    // Fetch promo images dari external API
    useEffect(() => {
        async function fetchPromos() {
        const res = await fetch(
            "https://api-ticketing.gms.church/servolution/test-promos"
        )
        const data = await res.json()
        setPromos(data)
        }

        fetchPromos()
    }, [])

    //Slide setiap 5 detik
    useEffect(() => {
        if (promos.length === 0) return

        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % promos.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [promos])

    if (promos.length === 0) {
        return (
        <div className="flex items-center justify-center h-full text-gray-400">
            Loading promo...
        </div>
        )
    }

    return (
        <div className="relative w-full h-full">
        <img
            src={promos[index].image_url}
            alt="Promo"
            className="w-full h-full object-cover"
        />

            {/* Bullet Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {promos.map((_, i) => (
                <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                    i === index ? "bg-white" : "bg-gray-500"
                    }`}
                />
                ))}
            </div>
        </div>
    )
}
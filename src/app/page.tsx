import Link from "next/link"
import PaginationBullet from "./components/paginationBullet"
import PromoSlideshow from "./components/promoSlideshow"

async function getEvents(filter?: string) {
  const url = filter
    ? `http://localhost:3000/api/events?filter=${filter}`
    : `http://localhost:3000/api/events`

  const res = await fetch(url, { cache: "no-store" })
  return res.json()
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const params = await searchParams
  const filter = params?.filter ?? "today"

  const events = await getEvents(filter)

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">

      {/* Saya disini memecah 2 bagian page, jadi 1 untuk header dan 1 untuk image posternya */}
      {/* KOLOM KIRI - Header + Event List + Filter */}
      <div className="flex flex-col flex-1 overflow-hidden relative">

        <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg_page.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        />

        <div className="absolute inset-0 z-0 bg-black/80" />


        {/* Header*/}
        <div className="relative z-10 bg-[#1A47A0] px-16 py-6">
          <h1 className="text-6xl font-extrabold text-white tracking-wide">
            JADWAL {filter === "today" ? "HARI INI" : filter.toUpperCase()}
          </h1>
          <p className="text-3xl text-[#00E5A0] font-semibold mt-2">
            {today.toUpperCase()}
          </p>
        </div>

        {/* Event List */}
        <div className="relative z-10 flex-1 overflow-y-auto px-12 py-10">
          <PaginationBullet events={events} />
        </div>

        {/* Filters */}
        <div className="relative z-10 px-12 py-4 flex gap-4 border-t border-gray-700">
          <Link href="/?filter=all" className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">All</Link>
          <Link href="/?filter=today" className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">Today</Link>
          <Link href="/?filter=upcoming" className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">Upcoming</Link>
          <Link href="/?filter=past" className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">Past</Link>
        </div>

      </div>

      {/* KOLOM KANAN - Poster*/}
      <div className="w-1/3 h-full overflow-hidden">
        <PromoSlideshow />
      </div>

    </div>
  )
}
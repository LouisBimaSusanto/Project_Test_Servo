import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
    console.log("PROXY RUNNING:", request.nextUrl.pathname)

    const authCookie = request.cookies.get("admin-auth")?.value
    console.log("COOKIE VALUE:", authCookie)

    if (authCookie !== "true") {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}
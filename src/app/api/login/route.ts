import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()

    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "123456"

    if (
        body.username === ADMIN_USERNAME &&
        body.password === ADMIN_PASSWORD
    ) {
    
        const response = NextResponse.json({ success: true })

    response.cookies.set("admin-auth", "true", {
        httpOnly: true,
        path: "/",
    })

    return response
    }

    return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
    )
}
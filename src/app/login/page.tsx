"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LogInPage(){
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleLogin(e : React.FormEvent){
        e.preventDefault()

        const res = await fetch("/api/login",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({username, password})
        })

        if (res.ok) {
            router.push("/admin")
        }else{
            setError("invalid credentials")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <form 
                onSubmit={handleLogin}
                className="bg-gray-900 p-8 rounded-xl w-80"
            >
                <h1 className="text-2xl font-bold mb-6">Admin LogIn</h1>

                <input
                    type="text"
                    placeholder="UserName"
                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button className="w-full bg-emerald-500 py-2 rounded font-bold">
                    LogIn
                </button>

            </form>
        </div>
    )
}
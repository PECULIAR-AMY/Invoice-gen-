
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SignupPage (){
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSignup = async (e:React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)


        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            router.push("/login")
        }

        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSignup} className="w-96 space-y-4 border p-6">
            <h1 className="text-2xl font-bold">Sign up</h1>

            <input 
            className="w-full border p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <input 
            className="w-full border p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-blue-500">{error}</p>}
             
            
             <button disabled={loading}
             className="w-full bg-black text-white"
             >
             {loading ? "creating account..." : "Sign Up"}
             </button>
            </form>
        </div>
    )
}
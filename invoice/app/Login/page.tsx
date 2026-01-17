
"use client"

import {useState} from 'react'
import { useSupabase} from "../supabase-provider"
import { useRouter } from 'next/navigation'

export default function LoginPage(){
    const supabase = useSupabase()
    const router = useRouter()
    const  [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


        const handleLogin = async (e:React.FormEvent) => {
         e.preventDefault()
         setLoading(true)
         setError(null)
        
         const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                setError(error.message)
            } else {
                router.push("/dashboard")
            }
            setLoading(false)
        }

        return (
            <div className='p-6'>
            <form onSubmit={handleLogin} className='w-96 space-y-4 border p-6'>
            <h1 className='text-2xl font-bold'>Login</h1>

            <input 
            className='w-full border p-4'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            required 
            />

            <input
            className='w-full border p-2'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            />

            {error && <p className='text-blue-500'>{error}</p>}

            <button disabled={loading} className='w-full bg-black text-white p-2'>
            {loading ? "Loggin in..." : "Login"}
            </button>
            </form>
            </div>
        )
}
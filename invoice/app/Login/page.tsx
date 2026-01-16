
"use client"

import {useState} from 'react'
import { useSupabase} from "../supabase-provider"

export default function LoginPage(){
    const supabase = useSupabase()
    const  [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messages, setMessages] = useState("")


        const handleLogin = async () => {
            const { error } = await await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error)setMessages(error.message)
                else setMessages("Logged in Successfully")
        }

        const handleLogout = async () => {
            await supabase.auth.signOut()
            setMessages("Logged out successfully")
        }

        return (
            <div className='p-6'>
            <h1 className="text-3xl mb-4">Login</h1>
            <input 
            className='text-2xl mb-4 block'
            placeholder='Email'
            value ={email}
            onChange={e => setEmail(e.target.value)}
            />
            <input 
            className='text-2xl mb-4 block'
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button className='bg-red-700 text-white p-4 py-2 mr-2' onClick={handleLogin}>
                Login 
            </button>
            <button className='bg-gray-500 text-white p-4 py-2' onClick={handleLogout}>
                Logout
            </button>
              {messages && <p className="mt-4">{messages}</p>}
            </div>
        )
}
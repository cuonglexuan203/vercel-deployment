'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState<string>('')

  const handleGetCookie = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/set-cookie`, {
        credentials: 'include',
      })
      const data = await response.json()
      
      // Show message in popup
      alert(data.message)
      
      // You won't be able to see the cookie value directly in JavaScript
      // because it's httpOnly, but you can see it in browser dev tools
      setMessage('Check your browser dev tools to see the cookie!')
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error getting cookie')
    }
  }

  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleGetCookie}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Cookie from Server
        </button>
        {message && <p>{message}</p>}
      </div>
    </main>
  )
} 
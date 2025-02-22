'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [hasCookie, setHasCookie] = useState<boolean>(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  // Check for cookie on page load
  useEffect(() => {
    checkCookie()
  }, [])

  const checkCookie = async () => {
    try {
      const response = await fetch(`${API_URL}/api/check-cookie`, {
        credentials: 'include',
      })
      const data = await response.json()
      
      if (data.hasCookie) {
        setMessage('Cookie is present!')
        setHasCookie(true)
      } else {
        setMessage('No cookie found')
        setHasCookie(false)
      }
    } catch (error) {
      console.error('Error checking cookie:', error)
      setMessage('Error checking cookie')
    }
  }

  const handleGetCookie = async () => {
    try {
      const response = await fetch(`${API_URL}/api/set-cookie`, {
        credentials: 'include',
      })
      const data = await response.json()
      
      if (data.success) {
        alert(data.message)
        setHasCookie(true)
        setMessage('Cookie has been set! Check your browser dev tools to see it.')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error setting cookie')
    }
  }

  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleGetCookie}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {hasCookie ? 'Refresh Cookie' : 'Get Cookie from Server'}
        </button>
        {message && (
          <p className={`text-${hasCookie ? 'green' : 'red'}-600`}>
            {message}
          </p>
        )}
      </div>
    </main>
  )
} 
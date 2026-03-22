'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Invalid credentials')
        return
      }

      if (data.role === 'talent') {
        router.push('/talent/profile')
      } else {
        router.push('/employer/dashboard')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to Fair Chance</h1>
          <p className="text-gray-500 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-2">Demo accounts (password: password123)</p>
          <div className="space-y-1 text-xs text-gray-500">
            <div>Talent: marcus.johnson@example.com</div>
            <div>Employer: hiring@bridgebuild.example.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}

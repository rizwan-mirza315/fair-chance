'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') as 'talent' | 'employer' | null

  const [role, setRole] = useState<'talent' | 'employer'>(defaultRole ?? 'talent')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Role toggle */}
        <div className="bg-gray-100 rounded-lg p-1 flex gap-1 mb-6">
          <button
            type="button"
            onClick={() => setRole('talent')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              role === 'talent'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I&apos;m looking for work
          </button>
          <button
            type="button"
            onClick={() => setRole('employer')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              role === 'employer'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I&apos;m hiring
          </button>
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="At least 8 characters"
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
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
          By creating an account you agree to our terms. Fair Chance does not share personal information with third parties.
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}

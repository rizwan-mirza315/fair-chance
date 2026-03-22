'use client'

import { useState } from 'react'
import Link from 'next/link'

type Props = {
  talentId: string
  talentName: string
  variant?: 'default' | 'light'
}

export function ContactButton({ talentId, talentName, variant = 'default' }: Props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSend() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talentId, message }),
      })

      if (res.status === 401) {
        setError('sign-in')
        setLoading(false)
        return
      }

      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Something went wrong')
        return
      }

      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const btnClass =
    variant === 'light'
      ? 'bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors text-sm'
      : 'bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm'

  if (sent) {
    return (
      <div className={`flex items-center gap-2 text-sm ${variant === 'light' ? 'text-white' : 'text-emerald-600'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Interest sent to {talentName}
      </div>
    )
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={btnClass}>
        Contact {talentName.split(' ')[0]}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Express interest in {talentName}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  Send an optional message to introduce yourself
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-gray-500 ml-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
              placeholder={`Hi ${talentName.split(' ')[0]}, we're looking for someone with your skills…`}
            />

            {error === 'sign-in' ? (
              <div className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                You need to{' '}
                <Link href="/login" className="font-semibold underline">
                  sign in
                </Link>{' '}
                or{' '}
                <Link href="/signup?role=employer" className="font-semibold underline">
                  create an employer account
                </Link>{' '}
                to contact candidates.
              </div>
            ) : error ? (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            ) : null}

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm"
              >
                {loading ? 'Sending…' : 'Send interest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

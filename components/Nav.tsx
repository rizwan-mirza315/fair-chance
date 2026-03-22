'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/fair-chance.png" alt="Fair Chance" width={120} height={36} className="h-9 w-auto" priority />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/employer/dashboard"
            className={`text-sm font-medium transition-colors ${
              isActive('/employer/dashboard')
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Talent
          </Link>
          <Link
            href="/signup"
            className={`text-sm font-medium transition-colors ${
              isActive('/signup')
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Join as Talent
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup?role=employer"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Post a Job
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          <Link href="/employer/dashboard" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Browse Talent</Link>
          <Link href="/signup" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Join as Talent</Link>
          <Link href="/login" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Sign in</Link>
          <Link href="/signup?role=employer" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center" onClick={() => setMenuOpen(false)}>Post a Job</Link>
        </div>
      )}
    </nav>
  )
}

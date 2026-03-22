import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Fair Chance – Hire Overlooked Talent',
  description:
    'A hiring marketplace connecting returning citizens with employers who look past the filter.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Fair Chance. Built to hire overlooked talent.
        </footer>
      </body>
    </html>
  )
}

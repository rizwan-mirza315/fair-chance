import { NextRequest, NextResponse } from 'next/server'
import { candidates } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const skills = searchParams.get('skills')
  const location = searchParams.get('location')
  const verified = searchParams.get('verified')
  const readyToWork = searchParams.get('readyToWork')

  let filtered = [...candidates]

  if (skills) {
    const skillList = skills.toLowerCase().split(',')
    filtered = filtered.filter((c) =>
      skillList.some((s) =>
        c.skills.some((cs) => cs.toLowerCase().includes(s.trim()))
      )
    )
  }

  if (location) {
    filtered = filtered.filter((c) =>
      c.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  if (verified === 'true') {
    filtered = filtered.filter((c) => c.verified)
  }

  if (readyToWork === 'true') {
    filtered = filtered.filter((c) => c.readyToWork)
  }

  return NextResponse.json({ candidates: filtered })
}

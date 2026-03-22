import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const skills = searchParams.get('skills')
  const location = searchParams.get('location')
  const verified = searchParams.get('verified')
  const readyToWork = searchParams.get('readyToWork')

  const profiles = await db.talentProfile.findMany({
    orderBy: { createdAt: 'desc' },
  })

  let filtered = profiles.map((p) => ({
    ...p,
    skills: JSON.parse(p.skills) as string[],
    workHistory: JSON.parse(p.workHistory),
    certifications: JSON.parse(p.certifications),
  }))

  if (skills) {
    const skillList = skills.toLowerCase().split(',')
    filtered = filtered.filter((p) =>
      skillList.some((s) =>
        p.skills.some((ps: string) => ps.toLowerCase().includes(s.trim()))
      )
    )
  }

  if (location) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  if (verified === 'true') {
    filtered = filtered.filter((p) => p.verified)
  }

  if (readyToWork === 'true') {
    filtered = filtered.filter((p) => p.readyToWork)
  }

  return NextResponse.json({ candidates: filtered })
}

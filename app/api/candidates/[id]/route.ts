import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params

  const profile = await db.talentProfile.findUnique({ where: { id } })
  if (!profile) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({
    candidate: {
      ...profile,
      skills: JSON.parse(profile.skills),
      workHistory: JSON.parse(profile.workHistory),
      certifications: JSON.parse(profile.certifications),
    },
  })
}

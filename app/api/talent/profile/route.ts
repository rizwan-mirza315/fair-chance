import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'talent') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      name, location, bio, skills, workHistory,
      certifications, verifiedProgram, availableDate, readyToWork,
    } = body

    const profile = await db.talentProfile.upsert({
      where: { userId: session.id },
      update: {
        name, location, bio,
        skills: JSON.stringify(skills ?? []),
        workHistory: JSON.stringify(workHistory ?? []),
        certifications: JSON.stringify(certifications ?? []),
        verifiedProgram: verifiedProgram ?? null,
        availableDate: availableDate ?? null,
        readyToWork: readyToWork ?? true,
      },
      create: {
        userId: session.id,
        name, location, bio,
        skills: JSON.stringify(skills ?? []),
        workHistory: JSON.stringify(workHistory ?? []),
        certifications: JSON.stringify(certifications ?? []),
        verifiedProgram: verifiedProgram ?? null,
        availableDate: availableDate ?? null,
        readyToWork: readyToWork ?? true,
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'talent') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const profile = await db.talentProfile.findUnique({ where: { userId: session.id } })
  return NextResponse.json({ profile })
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'employer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { talentId, message } = await req.json()

    if (!talentId) {
      return NextResponse.json({ error: 'talentId required' }, { status: 400 })
    }

    const talent = await db.talentProfile.findUnique({ where: { id: talentId } })
    if (!talent) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 })
    }

    const interest = await db.interestRequest.create({
      data: {
        talentId,
        senderId: session.id,
        message: message ?? null,
      },
    })

    return NextResponse.json({ success: true, interest })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

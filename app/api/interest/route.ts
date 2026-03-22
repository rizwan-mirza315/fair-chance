import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { talentId } = await req.json()

  if (!talentId) {
    return NextResponse.json({ error: 'talentId required' }, { status: 400 })
  }

  // Interest recorded — database integration coming soon
  return NextResponse.json({ success: true })
}

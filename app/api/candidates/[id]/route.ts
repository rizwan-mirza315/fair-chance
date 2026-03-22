import { NextRequest, NextResponse } from 'next/server'
import { candidates } from '@/lib/mock-data'

export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const candidate = candidates.find((c) => c.id === id)

  if (!candidate) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ candidate })
}

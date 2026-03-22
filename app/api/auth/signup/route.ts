import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json()

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    if (!['talent', 'employer'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await db.user.create({
      data: { email, password: hashed, role },
    })

    const token = await createSession({ id: user.id, email: user.email, role: user.role as 'talent' | 'employer' })

    const res = NextResponse.json({ success: true, role: user.role, userId: user.id })
    res.cookies.set('meek-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

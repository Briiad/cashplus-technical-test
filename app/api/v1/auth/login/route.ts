import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' })

    const response = NextResponse.json({ message: 'Login successful' })
    response.headers.set('x-auth-token', token)

    await prisma.$disconnect()
    return response
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
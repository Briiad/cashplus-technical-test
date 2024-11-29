import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    // Get the token from the authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    if (!user) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Disconnect prisma before returning response
    await prisma.$disconnect()
    return NextResponse.json({ customer: user })
  } catch (error) {
    // Ensure prisma disconnects even if there's an error
    await prisma.$disconnect()
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
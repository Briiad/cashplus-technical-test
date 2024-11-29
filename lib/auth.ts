// lib/auth.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function authMiddleware(req: Request) {
  const token = req.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return decoded.userId
  } catch {
    throw new Error('Invalid token')
  }
}
// app/api/cart/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const userId = await authMiddleware(req)
    const { productId, quantity } = await req.json()

    let cart = await prisma.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      })
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity
      }
    })

    return NextResponse.json(cartItem)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
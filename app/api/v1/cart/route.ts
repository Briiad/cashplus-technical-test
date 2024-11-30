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

    await prisma.$disconnect()
    return NextResponse.json({ message: 'Item added to cart', cartItem }, { status: 201 })
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const userId = await authMiddleware(req)

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    })

    await prisma.$disconnect()
    return NextResponse.json(cart)
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await authMiddleware(req)
    const { id, quantity } = await req.json()

    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    })

    await prisma.$disconnect()
    return NextResponse.json({ message: 'Item quantity updated', cartItem })
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await authMiddleware(req)
    const { id } = await req.json()

    await prisma.cartItem.delete({ where: { id } })

    await prisma.$disconnect()
    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    await prisma.$disconnect()
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
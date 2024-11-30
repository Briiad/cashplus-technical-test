// app/api/cart/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '@/lib/auth'

const prisma = new PrismaClient()

// To add an item to the cart
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

    return NextResponse.json({ message: 'Item added to cart', cartItem }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// To get the cart items
export async function GET(req: Request) {
  try {
    const userId = await authMiddleware(req)

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    })

    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

// To update the quantity of an item in the cart
export async function PUT(req: Request) {
  try {
    const userId = await authMiddleware(req)
    const { id, quantity } = await req.json()

    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    })

    return NextResponse.json({ message: 'Item quantity updated', cartItem })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// To remove an item from the cart
export async function DELETE(req: Request) {
  try {
    const userId = await authMiddleware(req)
    const { id } = await req.json()

    await prisma.cartItem.delete({ where: { id } })

    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
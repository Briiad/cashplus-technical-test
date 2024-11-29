// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '@/lib/auth'
import Xendit from 'xendit-node'

const prisma = new PrismaClient()
const xendit = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY! })

export async function POST(req: Request) {
  try {
    const userId = await authMiddleware(req)
    
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const total = cart.items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    )

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    })

    const body = await req.json();

    // Create Xendit invoice
    const invoice = await xendit.Invoice.createInvoice({
      data:{
        externalId: order.id,
        amount: total,
        payerEmail: body.email,
        description: `Order ${order.id}`
      }
    })

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    return NextResponse.json({
      orderId: order.id,
      invoiceUrl: invoice.invoiceUrl
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
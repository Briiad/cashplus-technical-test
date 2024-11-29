import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const offset = parseInt(searchParams.get('offset') ?? '0')
    const limit = parseInt(searchParams.get('limit') ?? '10')

    const products = await prisma.product.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: 'asc'
      }
    })

    const total = await prisma.product.count()

    return NextResponse.json({
      products,
      total,
      offset,
      limit
    })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
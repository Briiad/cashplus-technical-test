import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    // TODO: CHANGE THE IMAGE URLS THATS NOT WORKING
    {
      name: 'Rose',
      description: 'A rose is a woody perennial flowering plant of the genus Rosa, in the family Rosaceae, or the flower it bears.',
      price: 5.99,
      quantity: 100,
      imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    },
    {
      name: 'Tulip',
      description: 'Tulips are spring-blooming flowers known for their bold colors and cup-shaped petals.',
      price: 4.99,
      quantity: 150,
      imageUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11',
    },
    {
      name: 'Sunflower',
      description: 'Tall annual plant with large yellow flower heads that follow the sun.',
      price: 3.99,
      quantity: 75,
      imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651',
    },
    {
      name: 'Lily',
      description: 'Elegant flowers with prominent petals and strong fragrance.',
      price: 6.99,
      quantity: 80,
      imageUrl: 'https://images.unsplash.com/photo-1588701107159-2c41af74b3e3',
    },
    {
      name: 'Orchid',
      description: 'Exotic flowering plants known for their complex and beautiful blooms.',
      price: 15.99,
      quantity: 50,
      imageUrl: 'https://images.unsplash.com/photo-1567339238466-f513d32d5e03',
    },
    {
      name: 'Daisy',
      description: 'Simple yet charming flowers with white petals and yellow centers.',
      price: 3.49,
      quantity: 200,
      imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f',
    },
    {
      name: 'Carnation',
      description: 'Ruffled flowers available in various colors, popular in bouquets.',
      price: 4.49,
      quantity: 120,
      imageUrl: 'https://images.unsplash.com/photo-1589994160839-163d48ee1cd3',
    },
    {
      name: 'Chrysanthemum',
      description: 'Decorative flowers with layered petals, symbolizing happiness.',
      price: 5.49,
      quantity: 90,
      imageUrl: 'https://images.unsplash.com/photo-1606248897732-2c5ade7cdc96',
    },
    {
      name: 'Iris',
      description: 'Distinctive flowers with unique petal arrangements in various colors.',
      price: 5.99,
      quantity: 70,
      imageUrl: 'https://images.unsplash.com/photo-1558694440-03ade9215d7b',
    },
    {
      name: 'Peony',
      description: 'Large, lush flowers with full, rounded blooms.',
      price: 8.99,
      quantity: 60,
      imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd',
    },
    {
      name: 'Daffodil',
      description: 'Spring flowers with distinctive trumpet-shaped centers.',
      price: 3.99,
      quantity: 180,
      imageUrl: 'https://images.unsplash.com/photo-1584714497199-a10730c6d1e8',
    },
    {
      name: 'Hydrangea',
      description: 'Cluster-flowering shrubs with round flower heads.',
      price: 7.99,
      quantity: 85,
      imageUrl: 'https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48',
    },
    {
      name: 'Dahlia',
      description: 'Stunning flowers with geometric petal patterns.',
      price: 6.49,
      quantity: 95,
      imageUrl: 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff',
    },
    {
      name: 'Anemone',
      description: 'Delicate flowers with paper-like petals in vivid colors.',
      price: 5.49,
      quantity: 110,
      imageUrl: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe',
    },
    {
      name: 'Ranunculus',
      description: 'Multi-layered blooms resembling small roses.',
      price: 6.99,
      quantity: 75,
      imageUrl: 'https://images.unsplash.com/photo-1582794543462-0d7922e50cf5',
    },
    {
      name: 'Freesia',
      description: 'Fragrant flowers with funnel-shaped blooms.',
      price: 4.99,
      quantity: 130,
      imageUrl: 'https://images.unsplash.com/photo-1596438459212-6d45e8b9d84c',
    },
    {
      name: 'Gerbera',
      description: 'Cheerful daisy-like flowers in bright colors.',
      price: 4.49,
      quantity: 140,
      imageUrl: 'https://images.unsplash.com/photo-1597848212809-c95f01e5c3e5',
    },
    {
      name: 'Delphinium',
      description: 'Tall spikes of blue, purple, or white flowers.',
      price: 6.99,
      quantity: 65,
      imageUrl: 'https://images.unsplash.com/photo-1597848212498-d4a9b98df9a7',
    },
    {
      name: 'Snapdragon',
      description: 'Unique flowers with dragon-like faces when squeezed.',
      price: 4.99,
      quantity: 115,
      imageUrl: 'https://images.unsplash.com/photo-1597848212471-9e35bf89c1bc',
    },
    {
      name: 'Lisianthus',
      description: 'Rose-like flowers with delicate, ruffled petals.',
      price: 7.49,
      quantity: 85,
      imageUrl: 'https://images.unsplash.com/photo-1597848212534-6f99f5c63f85'
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
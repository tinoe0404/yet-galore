import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: { images: true, category: true }
  });
  console.log(JSON.stringify(products.filter(p => p.category.name.toLowerCase().includes('jersey')).map(p => ({
    name: p.name,
    images: p.images
  })), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

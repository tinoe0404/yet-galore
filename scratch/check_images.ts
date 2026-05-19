import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const images = await prisma.productImage.findMany();
  console.log(`Total images: ${images.length}`);
  if (images.length > 0) {
    console.log(images[0]);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

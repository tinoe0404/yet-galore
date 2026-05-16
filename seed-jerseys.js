const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.upsert({
    where: { slug: 'jerseys' },
    update: {},
    create: {
      name: 'Jerseys',
      slug: 'jerseys',
      description: 'Authentic sports and lifestyle jerseys.',
      displayOrder: 5,
      isActive: true
    }
  });

  const products = [
    { name: 'Classic Home Jersey', price: 45 },
    { name: 'Retro Away Jersey', price: 50 },
  ];

  for (const p of products) {
    const slug = generateSlug(p.name) + '-' + crypto.randomBytes(2).toString('hex');
    await prisma.product.create({
      data: {
        name: p.name,
        slug,
        description: `This is the ${p.name}.`,
        details: '100% Polyester\nMachine Wash',
        price: p.price,
        currency: 'USD',
        isFeatured: false,
        isPublished: true,
        displayOrder: 1,
        categoryId: cat.id,
      }
    });
  }
  console.log('Jerseys created successfully!');
}

main().finally(() => prisma.$disconnect());

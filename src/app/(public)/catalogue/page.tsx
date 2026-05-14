import React from 'react';
import { prisma } from '@/lib/prisma';
import { CatalogueView } from '@/components/public/catalogue/CatalogueView';

export const revalidate = 1800;

export default async function CataloguePage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isPublished: true },
      include: {
        category: { select: { name: true, slug: true } },
        images: { where: { isPrimary: true }, take: 1 }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' }
    })
  ]);

  return <CatalogueView products={products.map(p => ({ ...p, price: p.price ? Number(p.price) : null }))} categories={categories} title="The Collection" />;
}

import React from 'react';
import { prisma } from '@/lib/prisma';
import { RelatedProductsGrid } from './RelatedProductsGrid';

export async function RelatedProducts({ categoryId, currentProductId }: { categoryId: string, currentProductId: string }) {
  const products = await prisma.product.findMany({
    where: { 
      categoryId, 
      id: { not: currentProductId },
      isPublished: true 
    },
    take: 3,
    include: {
      category: { select: { name: true, slug: true } },
      images: { where: { isPrimary: true }, take: 1 }
    },
    orderBy: { displayOrder: 'asc' }
  });

  if (!products.length) return null;

  return <RelatedProductsGrid products={products.map(p => ({ ...p, price: p.price ? Number(p.price) : null }))} />;
}

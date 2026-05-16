import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductsClientView } from './ProductsClientView';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      _count: { select: { images: true } }
    }
  });

  return <ProductsClientView initialProducts={products.map((p: any) => ({ ...p, price: p.price ? Number(p.price) : null }))} />;
}

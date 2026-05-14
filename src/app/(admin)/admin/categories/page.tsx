import React from 'react';
import { prisma } from '@/lib/prisma';
import { CategoriesClientView } from './CategoriesClientView';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      _count: { select: { products: true } }
    }
  });

  return <CategoriesClientView initialCategories={categories} />;
}

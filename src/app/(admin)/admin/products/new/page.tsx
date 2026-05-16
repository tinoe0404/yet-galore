import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/components/admin/products/ProductForm';
import Link from 'next/link';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="text-sm uppercase tracking-widest text-muted hover:text-black transition-colors">
          &larr; Back to Products
        </Link>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}

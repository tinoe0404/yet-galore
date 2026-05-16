import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/components/admin/products/ProductForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { displayOrder: 'asc' } } }
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  if (!product) notFound();

  const safeProduct = { ...product, price: product.price ? Number(product.price) : null };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="text-sm uppercase tracking-widest text-muted hover:text-black transition-colors">
          &larr; Back to Products
        </Link>
      </div>
      <ProductForm product={safeProduct} categories={categories} />
    </div>
  );
}

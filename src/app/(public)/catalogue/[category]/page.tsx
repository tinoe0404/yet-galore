import React from 'react';
import { prisma } from '@/lib/prisma';
import { CatalogueView } from '@/components/public/catalogue/CatalogueView';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { slug: true }
  });
  return categories.map((c: { slug: string }) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug }
  });

  if (!category) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isPublished: true, categoryId: category.id },
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

  return <CatalogueView products={products.map(p => ({ ...p, price: p.price ? Number(p.price) : null }))} categories={categories} title={category.name} categoryName={category.name} />;
}

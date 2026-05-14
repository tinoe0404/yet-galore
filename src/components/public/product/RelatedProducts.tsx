import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/public/product/ProductCard';
import { Heading } from '@/components/ui/Typography';

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

  return (
    <section className="mt-32 border-t border-border pt-24 pb-32">
      <div className="container-wide px-6 lg:px-12">
        <div className="text-center mb-16">
          <Heading>You May Also Like</Heading>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
          {products.map((product: any) => (
            <div key={product.id} className="min-w-[85vw] sm:min-w-[50vw] md:min-w-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

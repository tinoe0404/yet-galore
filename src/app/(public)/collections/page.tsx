import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { DisplayText, Tag } from '@/components/ui/Typography';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Collections | Yet Galore',
  description: 'Browse our curated collections of handmade leather goods, bags, and accessories.',
};

export default async function CollectionsPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    include: {
      _count: { select: { products: { where: { isPublished: true } } } },
      // Grab the first published product's primary image as fallback cover
      products: {
        where: { isPublished: true },
        take: 1,
        orderBy: { displayOrder: 'asc' },
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      },
    },
  });

  return (
    <div className="w-full bg-background min-h-screen pt-20">
      {/* Breadcrumbs */}
      <nav className="container-wide px-6 lg:px-12 py-6 flex flex-wrap items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-black">Collections</span>
      </nav>

      {/* Header */}
      <div className="container-wide px-6 lg:px-12 py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Tag className="mb-4 block">Browse by</Tag>
          <DisplayText className="text-4xl md:text-6xl lg:text-7xl">
            Collections
          </DisplayText>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {categories.map((cat) => {
            // Use category cover image, or fall back to first product's image
            const productImage = cat.products[0]?.images[0]?.url;
            const imageUrl =
              cat.coverImage ||
              productImage ||
              'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1500&auto=format&fit=crop';

            return (
              <Link
                key={cat.id}
                href={`/catalogue/${cat.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-beige aspect-[4/5] md:aspect-[3/4] mb-6 border border-border/50">
                  <img
                    src={imageUrl}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                
                {/* Label below image */}
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-3xl md:text-4xl text-black">
                    {cat.name}
                  </h2>
                  <span className="font-sans text-xs tracking-widest uppercase text-muted bg-beige px-3 py-1 border border-border">
                    {cat._count.products} {cat._count.products === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

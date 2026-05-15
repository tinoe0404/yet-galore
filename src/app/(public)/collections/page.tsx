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
      {/* Header */}
      <div className="container-wide px-6 lg:px-12 py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Tag className="mb-4 block">Browse by</Tag>
          <DisplayText className="text-4xl md:text-6xl lg:text-7xl">
            Collections
          </DisplayText>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                className="group relative block overflow-hidden bg-beige aspect-[4/5] md:aspect-[3/4]"
              >
                <img
                  src={imageUrl}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10" />

                {/* Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center">
                  <h2 className="font-display italic text-4xl md:text-5xl text-white mb-2 drop-shadow-lg">
                    {cat.name}
                  </h2>
                  <span className="font-sans text-xs tracking-widest uppercase text-white/70">
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

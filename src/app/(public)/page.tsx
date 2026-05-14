import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeroSection } from '@/components/public/hero/HeroSection';
import { CategoryStrip } from '@/components/public/catalogue/CategoryStrip';
import { FeaturedProducts } from '@/components/public/product/FeaturedProducts';
import { EditorialBanner } from '@/components/public/hero/EditorialBanner';
import { AboutTeaser } from '@/components/public/common/AboutTeaser';
import { ContactTeaser } from '@/components/public/forms/ContactTeaser';

export const revalidate = 3600;

export default async function LandingPage() {
  // Fetch required data in parallel
  const [products, categories, settingsRaw] = await Promise.all([
    prisma.product.findMany({
      where: { isFeatured: true, isPublished: true },
      orderBy: { displayOrder: 'asc' },
      take: 3,
      include: {
        category: { select: { name: true, slug: true } },
        images: { where: { isPrimary: true }, take: 1 }
      }
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' }
    }),
    prisma.siteSetting.findMany({
      where: { key: { in: ['heroHeadline', 'heroSubheadline', 'heroImage'] } }
    })
  ]);

  // Convert settings array to an object map for easy access
  const settings = settingsRaw.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  const headline = settings.heroHeadline || "The Autumn / Winter Collection";
  const subheadline = settings.heroSubheadline || "NEW ARRIVALS";
  const heroImage = settings.heroImage || "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        headline={headline}
        subheadline={subheadline}
        ctaLabel="View Collection"
        ctaHref="/catalogue"
        image={heroImage}
      />
      <CategoryStrip categories={categories} />
      <FeaturedProducts products={products.map(p => ({ ...p, price: p.price ? Number(p.price) : null }))} />
      <EditorialBanner />
      <AboutTeaser />
      <ContactTeaser />
    </div>
  );
}

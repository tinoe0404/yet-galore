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

  const headline = settings.heroHeadline || "Timeless Pieces , Handmade with purpose";
  const subheadline = settings.heroSubheadline || "";
  // Force using local hero image to ensure the uploaded photo displays.
  // If you want to restore the admin-configurable image, replace with:
  // const heroImage = settings.heroImage || '/images/hero.jpeg';
  const heroImage = '/images/hero.jpeg';

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        headline={headline}
        subheadline={subheadline}
        ctaLabel="VIEW COLLECTION"
        ctaHref="/catalogue"
        image={heroImage}
      />
      <section className="w-full text-center py-12 px-4">
        <p className="uppercase text-muted" style={{ letterSpacing: '0.12em', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
          CRAFTED WITH INTENTION. DEFINED BY PROCESS. WORN WITH PRESENCE.
        </p>
      </section>
      <FeaturedProducts products={products.map(p => ({ ...p, price: p.price ? Number(p.price) : null }))} />
      
      {/* The Hero Piece */}
      <section className="w-full bg-background border-t border-border py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 aspect-[4/3] bg-beige border border-border overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-muted font-sans text-xs tracking-widest uppercase">
              Image Coming Soon
            </div>
            {/* When image is available, replace this div with an img tag */}
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <span className="font-sans text-xs tracking-widest uppercase text-muted">
              The Hero Piece
            </span>
            <h2 className="font-display italic text-4xl lg:text-5xl text-black">
              The Signature Jacket
            </h2>
            <p className="font-sans text-black/80 leading-relaxed max-w-lg">
              At the centre of Yet Galore stands the signature jacket — a defining expression of the brand's identity. Constructed from carefully selected and repurposed materials, it brings together contrasting textures and layered histories into a single, resolved form.
            </p>
            <div className="pt-4">
              <a href="/catalogue" className="inline-flex items-center justify-center bg-black text-white px-8 py-4 font-sans text-xs uppercase tracking-widest hover:bg-black/90 transition-colors">
                View Piece
              </a>
            </div>
          </div>
        </div>
      </section>

      <EditorialBanner />
      <AboutTeaser />
      <ContactTeaser />
    </div>
  );
}

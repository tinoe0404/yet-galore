import React from 'react';
import { prisma } from '@/lib/prisma';
import { COLLECTIONS } from '@/data/collections';
import { CinematicHomepage } from '@/components/public/hero/CinematicHomepage';

export const revalidate = 3600;

/**
 * Homepage — Cinematic Luxury Fashion Experience
 *
 * Renders a fullscreen vertical snap-scroll layout where each collection
 * (Bags, Jackets, Frames, Hats) occupies an entire viewport height.
 *
 * The page fetches category cover images from the database and merges
 * them with the static collection data so images stay in sync with
 * the admin panel.
 */
export default async function LandingPage() {
  // Fetch categories with cover images and first product image as fallback
  // Also fetch site settings for the hero section
  const [categories, settingsRaw] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        slug: true,
        coverImage: true,
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
  const heroImage = '/images/hero.jpeg';

  // Build a slug → image map from the database
  const imageMap = categories.reduce<Record<string, string>>((acc, cat) => {
    const productImage = cat.products[0]?.images[0]?.url;
    const image = cat.coverImage || productImage || '';
    if (image) acc[cat.slug] = image;
    return acc;
  }, {});

  // Merge DB images into the static collection data
  const collectionsWithImages = COLLECTIONS.map((col) => ({
    id: col.id,
    title: col.title,
    subtitle: col.subtitle,
    ctaLabel: col.ctaLabel,
    ctaHref: col.ctaHref,
    image: imageMap[col.id] || col.fallbackImage,
  }));

  return (
    <CinematicHomepage 
      heroHeadline={headline}
      heroSubheadline={subheadline}
      heroImage={heroImage}
      collections={collectionsWithImages} 
    />
  );
}

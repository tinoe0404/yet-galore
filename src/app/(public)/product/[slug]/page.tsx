import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ProductGallery } from '@/components/public/product/ProductGallery';
import { ProductDetailsAccordion } from '@/components/public/product/ProductDetailsAccordion';
import { RelatedProducts } from '@/components/public/product/RelatedProducts';
import { ClientEnquiryTrigger } from '@/components/public/product/ClientEnquiryTrigger';
import { DisplayText, BodyText } from '@/components/ui/Typography';
import { formatPrice } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    select: { slug: true }
  });
  return products.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { where: { isPrimary: true }, take: 1 } }
  });

  if (!product) return {};

  const primaryImage = product.images[0];
  const imageUrl = primaryImage?.url || 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&auto=format&fit=crop';

  return {
    title: `${product.name} | Yet Galore`,
    description: product.metaDescription || product.description,
    openGraph: {
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { displayOrder: 'asc' } }
    }
  });

  if (!product || !product.isPublished) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0]?.url || '',
    category: product.category.name,
    offers: {
      '@type': 'Offer',
      price: product.price?.toString(),
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock'
    }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yetgalore.com/' },
      { '@type': 'ListItem', position: 2, name: 'Catalogue', item: 'https://yetgalore.com/catalogue' },
      { '@type': 'ListItem', position: 3, name: product.category.name, item: `https://yetgalore.com/catalogue/${product.category.slug}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: `https://yetgalore.com/product/${product.slug}` }
    ]
  };

  return (
    <div className="w-full bg-background min-h-screen pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumbs */}
      <nav className="container-wide px-6 lg:px-12 py-6 flex flex-wrap items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/catalogue" className="hover:text-black transition-colors">Catalogue</Link>
        <span>/</span>
        <Link href={`/catalogue/${product.category.slug}`} className="hover:text-black transition-colors">{product.category.name}</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      {/* Main Layout */}
      <main className="container-wide px-6 lg:px-12 py-8 lg:py-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column (60%) */}
        <div className="w-full lg:w-[60%]">
          <ProductGallery images={product.images} />
        </div>

        {/* Right Column (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col lg:pt-8">
          <div className="space-y-4">
            <span className="font-sans text-xs tracking-widest uppercase text-muted">
              {product.category.name}
            </span>
            <DisplayText as="h1" className="text-4xl md:text-5xl lg:text-6xl">{product.name}</DisplayText>
            {product.price && (
              <p className="font-mono text-lg tracking-wide pt-2">
                {formatPrice(product.price, product.currency)}
              </p>
            )}
          </div>

          <div className="w-full h-[1px] bg-border my-10" />

          <div className="space-y-8">
            <BodyText className="leading-relaxed text-black/80">
              {product.description}
            </BodyText>

            {product.details && (
              <ProductDetailsAccordion content={product.details} />
            )}
          </div>

          <div className="w-full h-[1px] bg-border my-10" />

          {/* Actions */}
          <div className="space-y-6">
            <ClientEnquiryTrigger product={{ id: product.id, name: product.name }} />
            
            <a 
              href={`https://wa.me/123456789?text=Hi, I am interested in the ${product.name}`} 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-center gap-2 font-sans text-sm uppercase tracking-widest hover:text-black/70 transition-colors py-4"
            >
              Ask via WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </main>

      <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
    </div>
  );
}

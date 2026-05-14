const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // ─── Admin User ───
  const email = process.env.ADMIN_EMAIL || 'admin@yetgalore.com';
  const password = process.env.ADMIN_PASSWORD || 'secret';
  
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({
      data: { email, passwordHash, name: 'Super Admin' }
    });
    console.log(`✓ Created admin: ${email}`);
  } else {
    console.log(`  Admin ${email} already exists.`);
  }

  // ─── Categories ───
  const handbags = await prisma.category.upsert({
    where: { slug: 'handbags' },
    update: {},
    create: {
      name: 'Handbags',
      slug: 'handbags',
      description: 'Luxury handbags crafted from the finest materials.',
      coverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1500&auto=format&fit=crop',
      displayOrder: 1,
      isActive: true,
    }
  });
  console.log(`✓ Category: ${handbags.name}`);

  const jackets = await prisma.category.upsert({
    where: { slug: 'jackets' },
    update: {},
    create: {
      name: 'Jackets',
      slug: 'jackets',
      description: 'Timeless outerwear for the discerning individual.',
      coverImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1500&auto=format&fit=crop',
      displayOrder: 2,
      isActive: true,
    }
  });
  console.log(`✓ Category: ${jackets.name}`);

  // ─── Products ───
  const products = [
    {
      name: 'The Noir Tote',
      slug: 'the-noir-tote',
      description: 'A structured tote in supple Italian calfskin. The Noir Tote is designed for those who believe in quiet luxury — no logos, just impeccable craft. Interior suede lining with dual compartments.',
      details: 'Materials: Italian calfskin leather\nLining: Alcantara suede\nDimensions: 32cm × 28cm × 14cm\nWeight: 680g\nCare: Professional leather cleaning recommended',
      price: 1450.00,
      currency: 'USD',
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      categoryId: handbags.id,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'The Crescent Clutch',
      slug: 'the-crescent-clutch',
      description: 'A sculptural evening clutch with a curved silhouette. Hand-finished in smooth nappa leather with magnetic closure and detachable chain strap. The Crescent is a statement of restrained elegance.',
      details: 'Materials: Nappa leather\nHardware: Brushed gold\nDimensions: 26cm × 15cm × 5cm\nWeight: 320g\nIncludes: Dust bag, chain strap',
      price: 890.00,
      currency: 'USD',
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      categoryId: handbags.id,
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'The Archive Satchel',
      slug: 'the-archive-satchel',
      description: 'Inspired by vintage document cases, the Archive Satchel blends heritage form with contemporary functionality. Features a single-buckle closure and adjustable crossbody strap.',
      details: 'Materials: Vegetable-tanned leather\nLining: Cotton twill\nDimensions: 30cm × 22cm × 10cm\nWeight: 550g\nCare: Leather will develop a natural patina over time',
      price: 1280.00,
      currency: 'USD',
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
      categoryId: handbags.id,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'The Brutalist Overcoat',
      slug: 'the-brutalist-overcoat',
      description: 'An architectural overcoat in heavyweight Italian wool. Drop shoulders, clean lines, and a deliberately oversized silhouette. The Brutalist is designed to make everything underneath look effortless.',
      details: 'Materials: 100% Virgin wool (Italy)\nLining: Viscose\nFit: Oversized — size down for structured fit\nCare: Dry clean only',
      price: 2200.00,
      currency: 'USD',
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      categoryId: jackets.id,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'The Resin Bomber',
      slug: 'the-resin-bomber',
      description: 'A modern bomber jacket in resin-coated cotton. Water-resistant with a subtle sheen, ribbed cuffs, and minimal interior branding. The Resin Bomber is utility refined to its essence.',
      details: 'Materials: Resin-coated cotton\nLining: Mesh + cotton\nFit: Regular\nWater resistance: Light rain\nCare: Wipe clean, do not machine wash',
      price: 980.00,
      currency: 'USD',
      isFeatured: false,
      isPublished: true,
      displayOrder: 2,
      categoryId: jackets.id,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'The Sable Shearling',
      slug: 'the-sable-shearling',
      description: 'A reversible shearling jacket in tonal cream and caramel. Buttery soft with raw-edge detailing and horn button closure. The Sable is quiet opulence at its finest.',
      details: 'Materials: Genuine shearling (Spain)\nFit: Relaxed\nReversible: Suede exterior / shearling exterior\nCare: Professional suede/leather cleaning',
      price: 3400.00,
      currency: 'USD',
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
      categoryId: jackets.id,
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  for (const p of products) {
    const { image, ...productData } = p;
    
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`  Product "${p.name}" already exists, skipping.`);
      continue;
    }

    const product = await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: {
            url: image,
            publicId: `seed-${p.slug}`,
            altText: p.name,
            isPrimary: true,
            displayOrder: 0,
          }
        }
      }
    });
    console.log(`✓ Product: ${product.name}`);
  }

  // ─── Site Settings ───
  const settings = [
    { key: 'heroHeadline', value: 'The Autumn / Winter Collection' },
    { key: 'heroSubheadline', value: 'NEW ARRIVALS' },
    { key: 'heroImage', value: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log(`✓ Site settings seeded`);

  console.log('\n✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

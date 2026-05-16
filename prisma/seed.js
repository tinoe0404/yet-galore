const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

// Load env
const envFiles = ['.env.local', '.env'];
for (const file of envFiles) {
  if (fs.existsSync(file)) {
    fs.readFileSync(file, 'utf8').split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    });
  }
}

const prisma = new PrismaClient();

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const R2_BUCKET = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

async function uploadToR2(filePath, key) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'image/jpeg';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.webp') contentType = 'image/webp';

  await r2Client.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  return `${R2_PUBLIC_URL}/${key}`;
}

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log('Clearing existing database...');
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ─── Admin User ───
  const email = process.env.ADMIN_EMAIL || 'admin@yetgalore.com';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({ data: { email, passwordHash, name: 'Super Admin' } });
    console.log(`✓ Created admin: ${email}`);
  } else {
    console.log(`  Admin ${email} already exists.`);
  }

  // ─── Hero Image ───
  const heroPath = path.join(__dirname, '../public/images/hero.jpeg');
  let heroUrl = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop';
  if (fs.existsSync(heroPath)) {
    console.log('Uploading hero.jpeg to Cloudflare R2...');
    const r2Key = `hero-${Date.now()}.jpeg`;
    heroUrl = await uploadToR2(heroPath, r2Key);
  }

  const settings = [
    { key: 'heroHeadline', value: 'The Accessories Collection' },
    { key: 'heroSubheadline', value: 'NEW ARRIVALS' },
    { key: 'heroImage', value: heroUrl },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  // ─── Categories ───
  const categoriesData = [
    { name: 'Bags', slug: 'bags', description: 'Functional luxury bags.' },
    { name: 'Handbags', slug: 'handbags', description: 'Elegant luxury handbags.' },
    { name: 'Frames', slug: 'frames', description: 'Statement eyewear and frames.' },
    { name: 'Hats', slug: 'hats', description: 'Premium headwear and hats.' },
    { name: 'Jerseys', slug: 'jerseys', description: 'Authentic sports and lifestyle jerseys.' }
  ];

  const dbCategories = {};
  for (const c of categoriesData) {
    dbCategories[c.name] = await prisma.category.create({
      data: { ...c, displayOrder: Object.keys(dbCategories).length + 1, isActive: true }
    });
  }

  // ─── Products Map ───
  // We manually map specific files to products to ensure total accuracy
  const catalogue = [
    {
      category: 'Bags',
      name: 'The Structured Leather Tote',
      description: 'A timeless silhouette constructed with genuine calfskin leather. Perfect for everyday luxury.',
      files: ['WhatsApp Image 2026-05-14 at 21.39.49.jpeg', 'WhatsApp Image 2026-05-14 at 21.40.58.jpeg']
    },
    {
      category: 'Bags',
      name: 'The Woven Shopper',
      description: 'Hand-woven luxury shopper bag featuring ample storage space and a sleek design.',
      files: ['WhatsApp Image 2026-05-14 at 21.58.00 (1).jpeg', 'WhatsApp Image 2026-05-14 at 21.58.00.jpeg']
    },
    {
      category: 'Bags',
      name: 'The Minimalist Duffle',
      description: 'A refined weekend bag with minimalist hardware and durable materials.',
      files: ['WhatsApp Image 2026-05-14 at 21.58.01.jpeg', 'WhatsApp Image 2026-05-14 at 21.58.02 (1).jpeg']
    },
    {
      category: 'Bags',
      name: 'The Travel Carry-All',
      description: 'Your perfect companion for long journeys. Features multiple compartments and robust straps.',
      files: ['WhatsApp Image 2026-05-14 at 21.58.02 (3).jpeg', 'WhatsApp Image 2026-05-14 at 21.58.03.jpeg']
    },
    {
      category: 'Handbags',
      name: 'The Envelope Clutch',
      description: 'A petite handbag perfect for evening wear. Crafted with precision.',
      files: ['WhatsApp Image 2026-05-14 at 22.00.59.jpeg']
    },
    {
      category: 'Handbags',
      name: 'The Mini Top Handle',
      description: 'A statement handbag that perfectly complements any avant-garde outfit.',
      files: ['WhatsApp Image 2026-05-14 at 22.01.00.jpeg']
    },
    {
      category: 'Hats',
      name: 'The Classic Wide-Brim',
      description: 'An elegant sun hat featuring a classic silhouette to provide absolute shade in style.',
      files: ['WhatsApp Image 2026-05-14 at 21.39.50 (1).jpeg', 'WhatsApp Image 2026-05-14 at 21.39.50.jpeg']
    },
    {
      category: 'Hats',
      name: 'The Wool Fedora',
      description: 'A highly structured wool fedora offering a sharp touch to modern tailoring.',
      files: ['WhatsApp Image 2026-05-14 at 21.41.51.jpeg', 'WhatsApp Image 2026-05-14 at 22.00.59 (3).jpeg']
    },
    {
      category: 'Hats',
      name: 'The Resort Straw Hat',
      description: 'Lightweight, breathable straw woven into a dramatic wide brim shape.',
      files: ['WhatsApp Image 2026-05-14 at 22.01.00 (1).jpeg']
    },
    {
      category: 'Frames',
      name: 'Oversized Acetate Frames',
      description: 'Chunky acetate sunglasses that add a bold edge to your look.',
      files: ['WhatsApp Image 2026-05-14 at 21.58.01 (1).jpeg', 'WhatsApp Image 2026-05-14 at 22.00.59 (1).jpeg']
    },
    {
      category: 'Frames',
      name: 'Classic Tortoiseshell Frames',
      description: 'Vintage-inspired frames crafted from premium tortoiseshell material.',
      files: ['WhatsApp Image 2026-05-14 at 22.00.59 (2).jpeg', 'WhatsApp Image 2026-05-14 at 22.01.00 (2).jpeg']
    },
    {
      category: 'Jerseys',
      name: 'Classic Home Jersey',
      description: 'The iconic home jersey, featuring breathable mesh and moisture-wicking technology.',
      files: []
    },
    {
      category: 'Jerseys',
      name: 'Retro Away Jersey',
      description: 'A throwback to the 90s era, this away jersey stands out with bold colors.',
      files: []
    }
  ];

  const imagesDir = path.join(__dirname, '../public/images');
  
  for (let i = 0; i < catalogue.length; i++) {
    const item = catalogue[i];
    const slug = generateSlug(item.name) + '-' + crypto.randomBytes(2).toString('hex');
    const price = Math.floor(Math.random() * (35 - 15 + 1)) + 15;

    const product = await prisma.product.create({
      data: {
        name: item.name,
        slug,
        description: item.description,
        details: 'Premium construction.\nCare: Handle with care.',
        price,
        currency: 'USD',
        isFeatured: i < 4,
        isPublished: true,
        displayOrder: i + 1,
        categoryId: dbCategories[item.category].id,
      }
    });

    for (let j = 0; j < item.files.length; j++) {
      const fileName = item.files[j];
      const filePath = path.join(imagesDir, fileName);
      if (fs.existsSync(filePath)) {
        console.log(`  Uploading ${fileName} for ${item.name}...`);
        const r2Key = `product-${product.id}-${j}-${Date.now()}${path.extname(fileName)}`;
        const imageUrl = await uploadToR2(filePath, r2Key);
        
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: imageUrl,
            publicId: r2Key,
            altText: `${product.name} - View ${j + 1}`,
            isPrimary: j === 0,
            displayOrder: j,
          }
        });
      } else {
        console.warn(`Missing file for ${item.name}: ${fileName}`);
      }
    }
    console.log(`✓ Created Product: ${item.name} ($${price}) in ${item.category}`);
  }

  console.log('\n✅ Seed complete! All accessories are catalogued.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

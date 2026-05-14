const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

// Manual .env loader since node doesn't auto-load it
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
    console.log(`✓ Uploaded Hero Image: ${heroUrl}`);
  } else {
    console.log('hero.jpeg not found, using default URL.');
  }

  // Update site settings
  const settings = [
    { key: 'heroHeadline', value: 'The Autumn / Winter Collection' },
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
  console.log(`✓ Site settings seeded`);

  // ─── Categories ───
  const categoriesData = [
    { name: 'Ready-to-Wear', slug: 'ready-to-wear', description: 'Contemporary garments blending utility and luxury.' },
    { name: 'Avant-Garde', slug: 'avant-garde', description: 'Experimental silhouettes and bold designs.' },
    { name: 'Accessories', slug: 'accessories', description: 'Refined essentials to complete your look.' }
  ];

  const categories = {};
  for (const c of categoriesData) {
    categories[c.slug] = await prisma.category.create({
      data: { ...c, displayOrder: Object.keys(categories).length + 1, isActive: true }
    });
  }
  console.log('✓ Categories created');

  // ─── Images & Products ───
  const imagesDir = path.join(__dirname, '../public/images');
  const allFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];
  const productImages = allFiles.filter(f => f.match(/\.(jpeg|jpg|png|webp)$/i) && !f.includes('hero.jpeg'));

  if (productImages.length === 0) {
    console.log('No product images found in public/images. Skipping product creation.');
    return;
  }

  console.log(`Found ${productImages.length} product images. Processing...`);

  const productNames = [
    "The Avant-Garde Coat", "The Denim Patchwork Skirt", "The Deconstructed Blouse",
    "The Utility Cargo Pants", "The Asymmetric Dress", "The Oversized Trench",
    "The Minimalist Blazer", "The Sculptural Vest", "The Pleated Trousers",
    "The Technical Parka", "The Hand-Dyed Tunic", "The Distressed Denim Jacket",
    "The Canvas Tote Bag", "The Wide-Brim Hat", "The Patchwork Vest", "The Runway Dress"
  ];

  // Group images: 2-3 images per product depending on availability
  const chunks = [];
  for (let i = 0; i < productImages.length; i += 2) {
    chunks.push(productImages.slice(i, i + 2));
  }

  let index = 0;
  for (const chunk of chunks) {
    if (index >= productNames.length) break; // Use up to 16 products
    const name = productNames[index];
    const slug = generateSlug(name) + '-' + crypto.randomBytes(2).toString('hex');
    const price = Math.floor(Math.random() * (35 - 15 + 1)) + 15; // Random price $15 - $35
    
    // Assign category randomly
    const categorySlugs = Object.keys(categories);
    const categorySlug = categorySlugs[index % categorySlugs.length];
    
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: `A unique, luxury piece crafted for the modern individual. Features intricate detailing and premium materials perfectly suited for any occasion.`,
        details: 'Materials: Sustainably sourced cotton and denim.\nCare: Dry clean recommended.',
        price: price,
        currency: 'USD',
        isFeatured: index < 3,
        isPublished: true,
        displayOrder: index + 1,
        categoryId: categories[categorySlug].id,
      }
    });

    // Upload images for this product
    for (let j = 0; j < chunk.length; j++) {
      const fileName = chunk[j];
      const filePath = path.join(imagesDir, fileName);
      const r2Key = `product-${product.id}-${j}-${Date.now()}${path.extname(fileName)}`;
      
      console.log(`  Uploading ${fileName}...`);
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
    }

    console.log(`✓ Created Product: ${name} ($${price}) with ${chunk.length} images`);
    index++;
  }

  console.log('\n✅ Seed complete! All local products and images have been replaced and uploaded to Cloudflare R2.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

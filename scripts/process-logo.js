/**
 * Logo Processing Script
 * 
 * Usage: node scripts/process-logo.js <path-to-logo-image>
 * 
 * This script:
 * 1. Removes white background → transparent PNG (dark logo for light backgrounds)
 * 2. Creates an inverted white version → transparent PNG (light logo for dark backgrounds)
 * 3. Saves both to public/images/
 */

const sharp = require('sharp');
const path = require('path');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: node scripts/process-logo.js <path-to-logo-image>');
  console.error('Example: node scripts/process-logo.js ~/Desktop/yet-logo.png');
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'public', 'images');

async function processLogo() {
  console.log(`Processing: ${inputPath}`);

  // 1. Load image and remove white background
  const raw = sharp(inputPath).removeAlpha().ensureAlpha();

  // Get image metadata
  const meta = await sharp(inputPath).metadata();
  console.log(`Original: ${meta.width}x${meta.height}, ${meta.format}`);

  // Process: remove white background by making near-white pixels transparent
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  const threshold = 240; // Pixels with R,G,B all > 240 become transparent

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r > threshold && g > threshold && b > threshold) {
      pixels[i + 3] = 0; // Make transparent
    }
  }

  // Save dark version (original black on transparent)
  const darkPath = path.join(outDir, 'logo-dark.png');
  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim()  // Auto-crop transparent padding
    .resize(400, null, { withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(darkPath);
  console.log(`✓ Dark logo saved: ${darkPath}`);

  // 2. Create light (inverted) version for dark backgrounds
  // Invert only non-transparent pixels
  const lightPixels = new Uint8Array(pixels);
  for (let i = 0; i < lightPixels.length; i += 4) {
    if (lightPixels[i + 3] > 0) { // Only invert visible pixels
      lightPixels[i] = 255 - lightPixels[i];       // R
      lightPixels[i + 1] = 255 - lightPixels[i + 1]; // G
      lightPixels[i + 2] = 255 - lightPixels[i + 2]; // B
    }
  }

  const lightPath = path.join(outDir, 'logo-light.png');
  await sharp(Buffer.from(lightPixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim()
    .resize(400, null, { withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(lightPath);
  console.log(`✓ Light logo saved: ${lightPath}`);

  console.log('\nDone! Logos saved to public/images/');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});

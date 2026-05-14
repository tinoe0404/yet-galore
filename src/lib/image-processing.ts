import sharp from 'sharp';

export type ImageVariant = 'thumbnail' | 'card' | 'detail' | 'hero';

const VARIANTS: Record<ImageVariant, { width: number; height: number; fit: sharp.FitEnum[keyof sharp.FitEnum] }> = {
  thumbnail: { width: 200,  height: 200,  fit: 'cover' },
  card:      { width: 800,  height: 800,  fit: 'cover' },
  detail:    { width: 1200, height: 1500, fit: 'cover' },
  hero:      { width: 1920, height: 1080, fit: 'cover' },
};

export async function processImage(
  inputBuffer: Buffer,
  variant: ImageVariant
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const config = VARIANTS[variant];
  const { data, info } = await sharp(inputBuffer)
    .resize(config.width, config.height, { fit: config.fit, position: 'attention' })
    .webp({ quality: 85 })
    .toBuffer({ resolveWithObject: true });

  return { buffer: data, width: info.width, height: info.height };
}

export async function getImageMetadata(buffer: Buffer) {
  const meta = await sharp(buffer).metadata();
  return { width: meta.width ?? 0, height: meta.height ?? 0, format: meta.format };
}

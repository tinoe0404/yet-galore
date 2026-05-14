import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/features/auth/config';
import { processImage } from '@/lib/image-processing';
import { uploadToR2 } from '@/lib/r2';
import { nanoid } from 'nanoid';

export const runtime = 'nodejs'; // Required for Sharp
export const maxDuration = 30; // Allow time for processing

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const productSlug = formData.get('productSlug') as string | 'temp';

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // Validate file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {  // 10MB
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const imageId = nanoid(10);

  // Process and upload card variant (primary use case for product images)
  // Also upload thumbnail for admin preview
  const [cardResult, thumbnailResult] = await Promise.all([
    processImage(inputBuffer, 'card'),
    processImage(inputBuffer, 'thumbnail'),
  ]);

  const cardKey = `products/${productSlug}/${imageId}-card.webp`;
  const thumbKey = `products/${productSlug}/${imageId}-thumb.webp`;

  const [cardUrl] = await Promise.all([
    uploadToR2(cardResult.buffer, cardKey),
    uploadToR2(thumbnailResult.buffer, thumbKey),
  ]);

  return NextResponse.json({
    url: cardUrl,
    publicId: cardKey,       // This is what gets saved to DB as publicId
    thumbnailUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${thumbKey}`,
    thumbnailKey: thumbKey,
    width: cardResult.width,
    height: cardResult.height,
  });
}

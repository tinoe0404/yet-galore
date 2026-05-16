'use server';

import { prisma } from '@/lib/prisma';
import { deleteFromR2 } from '@/lib/r2';
import { auth } from '@/features/auth/config';

export async function deleteProductImage(imageId: string, r2Key: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await Promise.all([
    deleteFromR2(r2Key),                                    
    r2Key.includes('-thumb') ? null :
      deleteFromR2(r2Key.replace('-card', '-thumb')),       
    prisma.productImage.delete({ where: { id: imageId } }), 
  ]);

  return { success: true };
}

import { revalidatePath } from 'next/cache';

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);
}

export async function createProduct(data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const slug = generateSlug(data.name);

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      details: data.details,
      price: data.price,
      currency: 'USD',
      categoryId: data.categoryId,
      isPublished: data.isPublished,
      isFeatured: data.isFeatured || false,
    }
  });

  revalidatePath('/admin/products');
  return { success: true, id: product.id };
}

export async function updateProduct(id: string, data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      details: data.details,
      price: data.price,
      categoryId: data.categoryId,
      isPublished: data.isPublished,
      isFeatured: data.isFeatured,
    }
  });

  if (data.images) {
    const existingImages = await prisma.productImage.findMany({ where: { productId: id } });
    const newImagePublicIds = data.images.map((img: any) => img.publicId);
    
    // Delete removed images
    for (const existing of existingImages) {
      if (!newImagePublicIds.includes(existing.publicId)) {
        await deleteProductImage(existing.id, existing.publicId);
      }
    }

    // Upsert current images
    for (const img of data.images) {
      if (img.id) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: {
            altText: img.altText || '',
            isPrimary: img.isPrimary,
            displayOrder: img.displayOrder,
          }
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId: id,
            url: img.url,
            publicId: img.publicId,
            altText: img.altText || '',
            isPrimary: img.isPrimary,
            displayOrder: img.displayOrder,
          }
        });
      }
    }
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
  return { success: true };
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  // First delete all images from R2
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  for (const img of images) {
    await deleteProductImage(img.id, img.publicId);
  }

  // Then delete product
  await prisma.product.delete({ where: { id } });

  revalidatePath('/admin/products');
  return { success: true };
}

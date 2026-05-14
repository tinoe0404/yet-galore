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

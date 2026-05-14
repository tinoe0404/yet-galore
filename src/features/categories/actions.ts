'use server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/features/auth/config';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
}

export async function createCategory(data: { name: string; description?: string }) {
  await requireAuth();
  const slug = slugify(data.name, { lower: true, strict: true });
  
  await prisma.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      displayOrder: 999,
    }
  });
  revalidatePath('/admin/categories');
}

export async function updateCategory(id: string, data: { name?: string; description?: string; isActive?: boolean; displayOrder?: number }) {
  await requireAuth();
  const updateData: any = { ...data };
  if (data.name) {
    updateData.slug = slugify(data.name, { lower: true, strict: true });
  }
  await prisma.category.update({
    where: { id },
    data: updateData,
  });
  revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
  await requireAuth();
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } }
  });

  if (category && category._count.products > 0) {
    throw new Error('Cannot delete category with products.');
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
}

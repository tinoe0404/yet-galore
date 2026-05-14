'use server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/features/auth/config';
import { EnquiryStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string) {
  await requireAuth();
  await prisma.enquiry.update({
    where: { id },
    data: { status, adminNotes: notes },
  });
  revalidatePath('/admin/enquiries');
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath('/admin/dashboard');
  return { success: true };
}

export async function markEnquiriesRead(ids: string[]) {
  await requireAuth();
  await prisma.enquiry.updateMany({
    where: { id: { in: ids } },
    data: { status: 'READ' },
  });
  revalidatePath('/admin/enquiries');
  revalidatePath('/admin/dashboard');
  return { success: true };
}

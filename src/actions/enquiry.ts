'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  productId: z.string().optional(),
  productName: z.string().optional(),
});

export async function submitEnquiry(data: z.infer<typeof enquirySchema>) {
  const result = enquirySchema.safeParse(data);
  if (!result.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const type = result.data.productId ? 'PRODUCT' : 'GENERAL';

    await prisma.enquiry.create({
      data: {
        type,
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        message: result.data.message,
        productId: result.data.productId || null,
        productName: result.data.productName || null,
      }
    });

    // We would trigger Resend email notification here
    // e.g. await resend.emails.send({...})

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to submit enquiry' };
  }
}

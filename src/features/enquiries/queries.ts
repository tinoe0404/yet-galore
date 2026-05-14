import { prisma } from '@/lib/prisma';
import { EnquiryStatus } from '@prisma/client';

export async function getDashboardStats() {
  const [totalProducts, featuredProducts, totalCategories, unreadEnquiries] = await Promise.all([
    prisma.product.count({ where: { isPublished: true } }),
    prisma.product.count({ where: { isFeatured: true } }),
    prisma.category.count(),
    prisma.enquiry.count({ where: { status: 'UNREAD' } }),
  ]);

  return { totalProducts, featuredProducts, totalCategories, unreadEnquiries };
}

export async function getEnquiries(filter?: EnquiryStatus | 'ALL', take = 50) {
  const where = filter && filter !== 'ALL' ? { status: filter as EnquiryStatus } : {};
  return prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take
  });
}

export async function getEnquiryById(id: string) {
  return prisma.enquiry.findUnique({
    where: { id },
  });
}

export async function getRecentProducts(take = 5) {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    include: {
      category: { select: { name: true } },
      images: { where: { isPrimary: true }, take: 1 }
    }
  });
}

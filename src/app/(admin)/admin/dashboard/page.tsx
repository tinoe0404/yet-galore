import React from 'react';
import { getDashboardStats, getRecentProducts, getEnquiries } from '@/features/enquiries/queries';
import { DashboardClient } from './DashboardClient';

export default async function DashboardPage() {
  const [stats, recentProducts, recentEnquiries] = await Promise.all([
    getDashboardStats(),
    getRecentProducts(5),
    getEnquiries('ALL', 5),
  ]);

  return (
    <DashboardClient
      stats={stats}
      recentProducts={recentProducts.map((p: any) => ({ ...p, price: p.price ? Number(p.price) : null }))}
      recentEnquiries={recentEnquiries}
    />
  );
}

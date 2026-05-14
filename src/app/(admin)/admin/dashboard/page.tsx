import React from 'react';
import Link from 'next/link';
import { getDashboardStats, getRecentProducts, getEnquiries } from '@/features/enquiries/queries';
import { formatPrice } from '@/lib/utils';

export default async function DashboardPage() {
  const [stats, recentProducts, recentEnquiries] = await Promise.all([
    getDashboardStats(),
    getRecentProducts(5),
    getEnquiries('ALL', 5),
  ]);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Featured Products" value={stats.featuredProducts} />
        <StatCard 
          title="Unread Enquiries" 
          value={stats.unreadEnquiries} 
          highlight={stats.unreadEnquiries > 0} 
        />
        <StatCard title="Total Categories" value={stats.totalCategories} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white border border-border overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl">Recent Products</h2>
            <Link href="/admin/products" className="text-xs uppercase tracking-widest text-muted hover:text-black transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-cream text-muted text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-normal">Piece</th>
                  <th className="px-6 py-4 font-normal">Category</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentProducts.map(product => (
                  <tr key={product.id} className="hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-beige relative overflow-hidden">
                        {product.images[0]?.url && (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-muted">{product.category.name}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-1 ${product.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white border border-border overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs uppercase tracking-widest text-muted hover:text-black transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-cream text-muted text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-normal">From</th>
                  <th className="px-6 py-4 font-normal">Type</th>
                  <th className="px-6 py-4 font-normal">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentEnquiries.map(enq => (
                  <tr key={enq.id} className={`hover:bg-cream/50 transition-colors ${enq.status === 'UNREAD' ? 'font-medium bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{enq.name}</span>
                        <span className="text-xs text-muted">{enq.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] uppercase tracking-wider bg-cream px-2 py-1">
                        {enq.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted text-xs">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, highlight }: { title: string, value: number, highlight?: boolean }) {
  return (
    <div className={`p-6 bg-white border ${highlight ? 'border-red-400 shadow-sm' : 'border-border'}`}>
      <h3 className="font-sans text-xs uppercase tracking-widest text-muted mb-4">{title}</h3>
      <p className={`font-display text-4xl ${highlight ? 'text-red-600' : 'text-black'}`}>{value}</p>
    </div>
  );
}

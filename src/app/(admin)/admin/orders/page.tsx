import React from 'react';
import { prisma } from '@/lib/prisma';
import { Tag } from '@/components/ui/Typography';

export const revalidate = 0; // Don't cache admin pages

export default async function OrdersAdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: {
            select: { name: true, price: true }
          }
        }
      }
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'FULFILLED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Tag className="mb-2 block">Management</Tag>
        <h1 className="font-display text-4xl">Orders</h1>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-muted font-sans">
            No orders found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-cream/50 text-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Order Reference</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{order.externalId}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{order.name}</div>
                      <div className="text-muted text-xs">{order.email}</div>
                      {order.phone && <div className="text-muted text-xs">{order.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-muted max-w-[200px] truncate">
                        {order.items.map((i: any) => `${i.qty}x ${i.name}`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-black">
                      ${(order.totalCents / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

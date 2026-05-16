'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { deleteProduct } from '@/features/products/actions';

export function ProductsClientView({ initialProducts }: { initialProducts: any[] }) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (e: any) {
        alert(e.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-2xl">Products</h1>
        <Link href="/admin/products/new">
          <Button>+ New Product</Button>
        </Link>
      </div>

      <div className="bg-white border border-border overflow-x-auto">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-cream text-muted text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Category</th>
              <th className="px-6 py-4 font-normal">Price</th>
              <th className="px-6 py-4 font-normal">Images</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {initialProducts.map(product => (
              <tr key={product.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-muted">{product.category.name}</td>
                <td className="px-6 py-4">${product.price?.toString() || '0'}</td>
                <td className="px-6 py-4">{product._count.images}</td>
                <td className="px-6 py-4">
                  {product.isPublished ? (
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs uppercase tracking-wider border border-green-200">Published</span>
                  ) : (
                    <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs uppercase tracking-wider border border-orange-200">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link href={`/admin/products/${product.id}`} className="text-black hover:underline text-xs tracking-widest uppercase">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 text-xs tracking-widest uppercase"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {initialProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

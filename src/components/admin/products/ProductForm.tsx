'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createProduct, updateProduct } from '@/features/products/actions';
import { ImageUploader } from './ImageUploader';

export function ProductForm({ product, categories }: { product?: any, categories: any[] }) {
  const router = useRouter();
  const isEditing = !!product;

  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [details, setDetails] = useState(product?.details || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.categoryId || (categories[0]?.id || ''));
  const [isPublished, setIsPublished] = useState(product ? product.isPublished : false);
  const [isFeatured, setIsFeatured] = useState(product ? product.isFeatured : false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState(product?.images || []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        name,
        description,
        details,
        price: price ? parseFloat(price) : null,
        categoryId,
        isPublished,
        isFeatured,
      };

      if (isEditing) {
        await updateProduct(product.id, { ...data, images });
        alert('Product updated successfully!');
      } else {
        const res = await createProduct(data);
        if (res.success) {
          router.push(`/admin/products/${res.id}`);
          return; // prevent setting submitting to false if redirecting
        }
      }
      router.push('/admin/products');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full lg:w-2/3 bg-white p-8 border border-border space-y-8">
        <h2 className="font-display text-2xl">{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
        
        <div className="space-y-6">
          <Input 
            label="Product Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />

          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-black/60">Category</label>
            <select 
              className="w-full border-b border-black/20 focus:border-black focus:outline-none py-2 text-sm bg-transparent"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <Input 
            label="Price (USD)" 
            type="number"
            step="0.01"
            value={price} 
            onChange={e => setPrice(e.target.value)} 
          />

          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-black/60">Description</label>
            <textarea 
              className="w-full border border-black/20 focus:border-black focus:outline-none p-3 text-sm bg-transparent resize-y min-h-[120px]"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="font-sans text-xs uppercase tracking-widest text-black/60">Details (Markdown/Text)</label>
            <textarea 
              className="w-full border border-black/20 focus:border-black focus:outline-none p-3 text-sm bg-transparent resize-y min-h-[120px]"
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </div>

          <div className="flex gap-8 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isPublished}
                onChange={e => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-black border-border rounded focus:ring-black"
              />
              <span className="font-sans text-sm uppercase tracking-widest">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-black border-border rounded focus:ring-black"
              />
              <span className="font-sans text-sm uppercase tracking-widest">Featured</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-border">
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/admin/products')}>Cancel</Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create & Add Images')}
          </Button>
        </div>
      </form>

      {/* Image Uploader Sidebar */}
      <div className="w-full lg:w-1/3 space-y-6">
        {isEditing ? (
          <div className="bg-white p-6 border border-border">
            <h3 className="font-display text-xl mb-4">Product Images</h3>
            <p className="text-sm text-muted mb-6">Manage images for this product.</p>
            <ImageUploader value={images} onChange={setImages} productSlug={product.slug} />
          </div>
        ) : (
          <div className="bg-cream/50 p-6 border border-border text-center text-muted">
            <p className="text-sm">Save the product first to upload images.</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createCategory, updateCategory, deleteCategory } from '@/features/categories/actions';
import { modalBackdrop, adminModal } from '@/lib/animations';

export function CategoriesClientView({ initialCategories }: { initialCategories: any[] }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory({ name: newName, description: newDesc });
    setNewName('');
    setNewDesc('');
    setIsCreating(false);
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    await updateCategory(id, { isActive: !current });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (e: any) {
        alert(e.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreating(true)}>+ New Category</Button>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalBackdrop}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setIsCreating(false)}
              className="absolute inset-0 bg-black/50"
            />
            <motion.form
              variants={adminModal}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleCreate}
              className="relative bg-white p-8 w-full max-w-md space-y-6 shadow-xl"
            >
              <h2 className="font-display text-2xl">Create Category</h2>
              <Input 
                label="Name" 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                required 
              />
              <div className="space-y-1">
                <label className="font-sans text-xs uppercase tracking-widest text-black/60">Description (Optional)</label>
                <textarea 
                  className="w-full border-b border-black/20 focus:border-black focus:outline-none py-2 text-sm bg-transparent resize-none"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1">Create</Button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-border overflow-hidden">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-cream text-muted text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Slug</th>
              <th className="px-6 py-4 font-normal">Products</th>
              <th className="px-6 py-4 font-normal">Active</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {initialCategories.map(cat => (
              <tr key={cat.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4 font-medium">{cat.name}</td>
                <td className="px-6 py-4 text-muted">{cat.slug}</td>
                <td className="px-6 py-4">{cat._count.products}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleToggleActive(cat.id, cat.isActive)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${cat.isActive ? 'bg-black' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${cat.isActive ? 'translate-x-5' : ''}`} />
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500 hover:text-red-700 text-xs tracking-widest uppercase disabled:opacity-50"
                    disabled={cat._count.products > 0}
                    title={cat._count.products > 0 ? 'Cannot delete category with products' : 'Delete'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {initialCategories.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

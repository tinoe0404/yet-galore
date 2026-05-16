'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number; // in cents
  qty: number;
  image?: string;
  slug?: string;
  size?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalQty: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'yg_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to read cart from storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to write cart to storage', e);
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.productId === item.productId && p.size === item.size);
      if (exists) {
        return prev.map((p) => (p.productId === item.productId && p.size === item.size) ? { ...p, qty: p.qty + item.qty } : p);
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    // id is expected to be `${productId}-${size || 'default'}`
    setItems((prev) => prev.filter((p) => `${p.productId}-${p.size || 'default'}` !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((p) => `${p.productId}-${p.size || 'default'}` === id ? { ...p, qty: Math.max(1, qty) } : p));
  };

  const clearCart = () => setItems([]);

  const totalQty = items.reduce((s, it) => s + it.qty, 0);
  const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalQty, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartProvider;

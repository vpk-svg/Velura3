'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export type CartItemType = 'botox' | 'fillers' | 'shape' | 'medicatie';

export interface CartItem {
  id: string;
  type: CartItemType;
  nameKey: string;
  /** Translation namespace for nameKey lookup */
  namespace: string;
  priceCents: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<CartItem, 'quantity'>) => void;
  clearByType: (type: CartItemType) => void;
  clearAll: () => void;
  getItemsByType: (type: CartItemType) => CartItem[];
  hasItem: (id: string) => boolean;
  totalCents: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const clearByType = useCallback((type: CartItemType) => {
    setItems((prev) => prev.filter((i) => i.type !== type));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const getItemsByType = useCallback(
    (type: CartItemType) => items.filter((i) => i.type === type),
    [items],
  );

  const hasItem = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        clearByType,
        clearAll,
        getItemsByType,
        hasItem,
        totalCents,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

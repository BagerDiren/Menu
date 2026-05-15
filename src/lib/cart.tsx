'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MENU, type Dish } from '@/data/menu';

interface CartItem {
  id: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  dishes: Array<{ dish: Dish; qty: number }>;
  totals: { price: number; calories: number };
}

const Ctx = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'anubis.feast.v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const add = useCallback((id: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      if (has(id)) remove(id);
      else add(id);
    },
    [has, add, remove]
  );

  const clear = useCallback(() => setItems([]), []);

  const dishes = useMemo(
    () =>
      items
        .map((i) => {
          const dish = MENU.find((d) => d.id === i.id);
          return dish ? { dish, qty: i.qty } : null;
        })
        .filter((x): x is { dish: Dish; qty: number } => x !== null),
    [items]
  );

  const totals = useMemo(
    () =>
      dishes.reduce(
        (acc, { dish, qty }) => ({
          price: acc.price + dish.price * qty,
          calories: acc.calories + dish.nutrition.calories * qty
        }),
        { price: 0, calories: 0 }
      ),
    [dishes]
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    count,
    has,
    add,
    remove,
    toggle,
    clear,
    dishes,
    totals
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

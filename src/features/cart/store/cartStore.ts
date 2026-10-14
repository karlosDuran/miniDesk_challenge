import { create } from 'zustand';
import { CartProduct, CartItem } from '../types';

export interface CartStoreState {
  items: Record<number, CartItem>;
  increment: (product: CartProduct) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartStoreState>()((set) => ({
  items: {},

  increment: (product: CartProduct) =>
    set((state) => {
      const existing = state.items[product.id];
      const nextQuantity = existing ? existing.quantity + 1 : 1;

      return {
        items: {
          ...state.items,
          [product.id]: {
            product,
            quantity: nextQuantity,
          },
        },
      };
    }),

  decrement: (id: number) =>
    set((state) => {
      const existing = state.items[id];
      if (!existing) return state;

      if (existing.quantity <= 1) {
        // Al llegar a 0 se elimina el producto del carrito
        const { [id]: _, ...remainingItems } = state.items;
        return { items: remainingItems };
      }

      return {
        items: {
          ...state.items,
          [id]: {
            ...existing,
            quantity: existing.quantity - 1,
          },
        },
      };
    }),

  remove: (id: number) =>
    set((state) => {
      if (!state.items[id]) return state;
      const { [id]: _, ...remainingItems } = state.items;
      return { items: remainingItems };
    }),

  clear: () => set({ items: {} }),
}));

import { create } from 'zustand';
import { MenuItem } from '../types';

interface CartItem extends MenuItem {
  quantity: number;
  special_instructions?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, instructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item, quantity = 1, instructions = '') => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity, special_instructions: instructions }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity, special_instructions: instructions }],
      };
    });
  },
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }));
  },
  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items: quantity === 0
        ? state.items.filter((i) => i.id !== itemId)
        : state.items.map((i) => i.id === itemId ? { ...i, quantity } : i),
    }));
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
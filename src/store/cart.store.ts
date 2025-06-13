import { create } from 'zustand';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const savedCart = cookies.get('cart') || [];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: savedCart,

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    let updatedCart;

    if (existing) {
      updatedCart = get().items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updatedCart = [...get().items, item];
    }

    cookies.set('cart', updatedCart);
    set({ items: updatedCart });
  },

  removeItem: (id) => {
    const updatedCart = get().items.filter((item) => item.id !== id);
    cookies.set('cart', updatedCart);
    set({ items: updatedCart });
  },

  clearCart: () => {
    cookies.remove('cart');
    set({ items: [] });
  },
}));

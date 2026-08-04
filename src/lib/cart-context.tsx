"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartLine } from "./types";
import { getProduct } from "./products";

type CartContextValue = {
  lines: CartLine[];
  addItem: (line: CartLine) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "ethereal-editorial-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage on mount
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addItem(line: CartLine) {
    setLines((prev) => {
      const existing = prev.find(
        (l) =>
          l.productId === line.productId &&
          l.size === line.size &&
          l.color === line.color
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + line.quantity } : l
        );
      }
      return [...prev, line];
    });
  }

  function removeItem(productId: string, size: string, color: string) {
    setLines((prev) =>
      prev.filter(
        (l) =>
          !(l.productId === productId && l.size === size && l.color === color)
      )
    );
  }

  function updateQuantity(
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) {
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId && l.size === size && l.color === color
          ? { ...l, quantity: Math.max(1, quantity) }
          : l
      )
    );
  }

  function clearCart() {
    setLines([]);
  }

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProduct(l.productId);
        return sum + (product ? product.price * l.quantity : 0);
      }, 0),
    [lines]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

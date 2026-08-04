"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Order, User } from "./types";

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  login: (email: string, _password: string) => void;
  register: (name: string, email: string, _password: string) => void;
  logout: () => void;
  orders: Order[];
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_KEY = "ethereal-editorial-user";

const SAMPLE_ORDERS: Order[] = [
  {
    id: "EE-10482",
    date: "2026-07-12",
    status: "Delivered",
    items: [
      {
        productId: "wool-overcoat",
        name: "Wool Overcoat",
        size: "M",
        color: "Graphite",
        quantity: 1,
        price: 890,
        image:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
      },
      {
        productId: "cashmere-knit",
        name: "Cashmere Crewneck",
        size: "S",
        color: "Oatmeal",
        quantity: 1,
        price: 340,
        image:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80",
      },
    ],
    total: 1230,
    address: {
      fullName: "Amina Farouk",
      line1: "14 Corniche Street",
      city: "Talkha",
      postalCode: "35511",
      country: "Egypt",
      phone: "+20 100 000 0000",
    },
  },
  {
    id: "EE-10317",
    date: "2026-06-02",
    status: "Shipped",
    items: [
      {
        productId: "leather-tote",
        name: "Structured Leather Tote",
        size: "One Size",
        color: "Cognac",
        quantity: 1,
        price: 780,
        image:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
      },
    ],
    total: 780,
    address: {
      fullName: "Amina Farouk",
      line1: "14 Corniche Street",
      city: "Talkha",
      postalCode: "35511",
      country: "Egypt",
      phone: "+20 100 000 0000",
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage on mount
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(USER_KEY);
  }, [user, hydrated]);

  function login(email: string) {
    const name = email.split("@")[0].replace(/[._]/g, " ");
    setUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email });
  }

  function register(name: string, email: string) {
    setUser({ name, email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, hydrated, login, register, logout, orders: SAMPLE_ORDERS }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

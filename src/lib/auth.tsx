"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  phone?: string;
  balance: number;
  currency: string;
  username?: string;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

export interface RegisterData {
  email?: string;
  phone?: string;
  password: string;
  currency?: string;
  country?: string;
  promoCode?: string;
  bonusType?: string;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    // Mock — 接后台时替换
    await new Promise(r => setTimeout(r, 600));
    setUser({
      id: "12345678",
      email,
      balance: 1250.00,
      currency: "MYR",
      username: email.split("@")[0],
    });
  };

  const logout = () => setUser(null);

  const register = async (data: RegisterData) => {
    await new Promise(r => setTimeout(r, 800));
    setUser({
      id: Math.floor(Math.random() * 90000000 + 10000000).toString(),
      email: data.email || `user@slotshub.com`,
      phone: data.phone,
      balance: 0,
      currency: data.currency || "MYR",
    });
  };

  return <Ctx.Provider value={{ user, login, logout, register }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

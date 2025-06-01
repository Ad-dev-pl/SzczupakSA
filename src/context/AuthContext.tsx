import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  name: string;
  avatar?: string;
};

type OrderItem = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  date: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Domyślnie niezalogowany
  const [orders, setOrders] = useState<Order[]>([]); // Zamówienia

  const login = () => {
    setUser({
      name: "Jan Kowalski",
      avatar: "https://i.pravatar.cc/300", // np. random avatar
    });
  };

  const logout = () => {
    setUser(null);
    setOrders([]); // Czyścimy zamówienia przy wylogowaniu
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, orders, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

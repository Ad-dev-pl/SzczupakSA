// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Typ dla elementów koszyka
type CartItem = {
  imageUrl: string;
  name: string;
  price: number;
};

// Typ dla kontekstu
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

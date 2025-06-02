import React, { createContext, useContext, useState, ReactNode } from "react";

interface Produkt {
  id: number;
  nazwa: string;
  cena: number;
  // inne pola...
}

interface CartItem extends Produkt {
  ilosc: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (produkt: Produkt) => void;
  removeFromCart: (produktId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (produkt: Produkt) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.id === produkt.id);
      if (exist) {
        return prev.map(item =>
          item.id === produkt.id ? { ...item, ilosc: item.ilosc + 1 } : item
        );
      } else {
        return [...prev, { ...produkt, ilosc: 1 }];
      }
    });
  };

  const removeFromCart = (produktId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== produktId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };

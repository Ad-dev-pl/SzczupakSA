import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  username?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
};

type OrderItem = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  date: string;
  status: string; // 'active', 'canceled', etc.
};

type SignupData = {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (id: number) => void;
  updateOrders: (orders: Order[]) => void;
  updateUser: (data: Partial<User>) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [password, setPassword] = useState<string | null>(() => {
    const savedPassword = localStorage.getItem("password");
    return savedPassword || null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (password) {
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("password");
    }
  }, [password]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const login = async (username: string, passwordAttempt: string) => {
    setLoading(true);
    setError(null);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && passwordAttempt === "1234") {
          const loggedUser = {
            username: "admin",
            firstName: "Jan",
            lastName: "Kowalski",
            avatar: "https://i.pravatar.cc/300",
            email: "admin@example.com",
            phone: "123456789",
            name: "Jan Kowalski"
          };
          setUser(loggedUser);
          setPassword("1234");
          setLoading(false);
          resolve();
        } else {
          setError("Nieprawidłowa nazwa użytkownika lub hasło");
          setLoading(false);
          reject("Błąd logowania");
        }
      }, 1000);
    });
  };

  const signup = async (data: SignupData) => {
    const { username, password: signupPassword, email, firstName, lastName, phone, birthDate, gender, address } = data;

    setLoading(true);
    setError(null);

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (username && signupPassword) {
          const newUser = {
            username,
            firstName: firstName || username,
            lastName: lastName || "",
            avatar: "https://i.pravatar.cc/300",
            email: email || `${username}@example.com`,
            phone: phone || "",
            birthDate: birthDate || "",
            gender: gender || "",
            address: address || "",
            name: `${firstName || username} ${lastName || ""}`.trim(),
          };
          setUser(newUser);
          setPassword(signupPassword);
          setLoading(false);
          resolve();
        } else {
          setError("Wypełnij wszystkie pola");
          setLoading(false);
          reject("Błąd rejestracji");
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setError(null);
    setPassword(null);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  const cancelOrder = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "canceled" } : order
      )
    );
  };

  const updateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const changePassword = (oldPassword: string, newPassword: string): Promise<void> => {
    setLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (oldPassword !== password) {
          setError("Stare hasło jest niepoprawne");
          setLoading(false);
          reject("Niepoprawne stare hasło");
        } else {
          setPassword(newPassword);
          setLoading(false);
          resolve();
        }
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        orders,
        addOrder,
        cancelOrder,
        updateOrders,
        updateUser,
        changePassword,
        loading,
        error,
      }}
    >
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

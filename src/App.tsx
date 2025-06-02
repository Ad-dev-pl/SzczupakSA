import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProduktyPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import SettingsPage from "./pages/SettingsPage";
import ProduktDetails from "./pages/ProductsDetails";
import ContactPage from "./pages/ContactPage";
import { CartProvider, CartContext } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import OrdersPage from './pages/OrdersPage';

interface Produkt {
  id: number;
  nazwa: string;
  kategoria: string;
  cena: number;
  ocena: number;
  nowosc: boolean;
  promocja: boolean;
  imageUrl: string;
}

const products: Produkt[] = [
  {
    id: 1,
    nazwa: "Wędka X",
    kategoria: "Wędki",
    cena: 100,
    ocena: 4.5,
    nowosc: false,
    promocja: true,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    nazwa: "Gitara Y",
    kategoria: "Gitary",
    cena: 150,
    ocena: 4.7,
    nowosc: true,
    promocja: false,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    nazwa: "Kijki Z",
    kategoria: "Akcesoria",
    cena: 50,
    ocena: 4.0,
    nowosc: true,
    promocja: true,
    imageUrl: "https://via.placeholder.com/150"
  }
];

// Nowa wersja HomePage z addToCart z kontekstu
const HomePage = () => {
  const { addToCart } = useCart();

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {products.map((product, index) => (
          <Box key={index} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
            <ProductCard produkt={product} addToCart={addToCart} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/ContactPage" element={<ContactPage />} />
              <Route path="/ProduktyPage" element={<ProduktyPage />} />
              <Route path="/produkt/:id" element={<ProduktDetails />} />
              <Route path="/settings" element={<SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
            <Footer darkMode={darkMode} />
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

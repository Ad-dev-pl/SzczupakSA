import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProduktyPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import SettingsPage from "./pages/SettingsPage";
import ProduktDetails from "./pages/ProductsDetails";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";  // lub SignupPage, jeśli masz stronę

import OrdersPage from './pages/OrdersPage';
// Przykładowe dane produktów
const products = [
  { imageUrl: "https://via.placeholder.com/150", name: "Wędka X", price: 100 },
  { imageUrl: "https://via.placeholder.com/150", name: "Gitara Y", price: 150 },
  { imageUrl: "https://via.placeholder.com/150", name: "Kijki Z", price: 50 },
];

// Strona główna
const HomePage = () => (
  <Container sx={{ marginTop: 4 }}>
    <Box display="flex" flexWrap="wrap" gap={2}>
      {products.map((product, index) => (
        <Box key={index} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
          <ProductCard {...product} />
        </Box>
      ))}
    </Box>
  </Container>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  // Synchronizuj stan darkMode z localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Tworzymy motyw MUI na podstawie darkMode
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

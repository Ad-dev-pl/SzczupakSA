import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProduktyPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import ProduktDetails from './pages/ProductsDetails';

// Przykładowe dane produktów
const products = [
  { imageUrl: 'https://via.placeholder.com/150', name: 'Wędka X', price: 100 },
  { imageUrl: 'https://via.placeholder.com/150', name: 'Gitara Y', price: 150 },
  { imageUrl: 'https://via.placeholder.com/150', name: 'Kijki Z', price: 50 },
];

// Strona główna
const HomePage = () => (
  <Container sx={{ marginTop: 4 }}>
    <Box display="flex" flexWrap="wrap" gap={2}>
      {products.map((product, index) => (
        <Box key={index} sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
          <ProductCard {...product} />
        </Box>
      ))}
    </Box>
  </Container>
);

const App = () => (
  <CartProvider>
    <Router>
      <Header />
      <Routes>
        {/* Strona główna */}
        <Route path="/" element={<HomePage />} />
        {/* Strona koszyka */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ProduktyPage" element={<ProduktyPage />} />
        <Route path="/produkt/:id" element={<ProduktDetails />} />
      </Routes>
      <Footer />
    </Router>
  </CartProvider>
);

export default App;

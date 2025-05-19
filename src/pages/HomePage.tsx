// src/pages/HomePage.tsx
import React from 'react';
import { Container, Box, Button} from '@mui/material';
import ProductCard from '../components/ProductCard';

const products = [
  { imageUrl: 'https://via.placeholder.com/150', name: 'Wędka X', price: 100 },
  { imageUrl: 'https://via.placeholder.com/150', name: 'Gitara Y', price: 150 },
  { imageUrl: 'https://via.placeholder.com/150', name: 'Kijki Z', price: 50 },
];

const HomePage = () => (
  <Container sx={{ marginTop: 4}}>
    <Box display="flex" flexWrap="wrap" gap={2}>
      {products.map((product, index) => (
        <Box key={index} sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
          <ProductCard {...product} />
        </Box>
      ))}
    </Box>
  </Container>
);

export default HomePage;

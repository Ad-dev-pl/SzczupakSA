// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const CartPage = () => {
  const { cart } = useCart();

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Twój koszyk
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="subtitle1">Koszyk jest pusty.</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`Cena: ${item.price} zł`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default CartPage;

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
} from '@mui/material';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  const handlePlaceOrder = () => {
    if (!user) {
      alert('Proszę się zalogować, aby złożyć zamówienie.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleString(),
      status: "placed", // Dodane: status zamówienia
    };

    addOrder(newOrder);
    clearCart();
    alert('Dziękujemy za zakupy! Twoje zamówienie zostało zapisane.');
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Twój koszyk
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="subtitle1">Koszyk jest pusty.</Typography>
      ) : (
        <>
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

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
            >
              Złóż zamówienie
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;

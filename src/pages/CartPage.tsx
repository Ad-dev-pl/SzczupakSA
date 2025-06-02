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
  const { cartItems, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  const handlePlaceOrder = () => {
  if (!user) {
    alert('Proszę się zalogować, aby złożyć zamówienie.');
    return;
  }

  const orderItems = cartItems.map(item => ({
    id: item.id,
    name: item.nazwa,
    price: item.cena,
    quantity: item.ilosc,
  }));

  const newOrder = {
    id: Date.now(),
    items: orderItems,
    date: new Date().toLocaleString(),
    status: "placed",
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

      {cartItems.length === 0 ? (
        <Typography variant="subtitle1">Koszyk jest pusty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={item.nazwa}
                    secondary={`Cena: ${item.cena} zł`}
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

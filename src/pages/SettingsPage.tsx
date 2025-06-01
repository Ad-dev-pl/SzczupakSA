import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Divider, Switch, FormControlLabel } from '@mui/material';
import { useAuth } from '../context/AuthContext';

type SettingsPageProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const SettingsPage: React.FC<SettingsPageProps> = ({ darkMode, toggleDarkMode }) => {
  const { orders } = useAuth();

  const [phone, setPhone] = useState<string>(() => localStorage.getItem('phone') || '');
  const [email, setEmail] = useState<string>(() => localStorage.getItem('email') || '');
  const [address, setAddress] = useState<string>(() => localStorage.getItem('address') || '');

  useEffect(() => {
    localStorage.setItem('phone', phone);
  }, [phone]);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('address', address);
  }, [address]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Ustawienia użytkownika</Typography>

      {/* Tryb jasny/ciemny */}
      <Box mb={4}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Tryb ciemny"
        />
      </Box>

      <Divider />

      {/* Informacje kontaktowe */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Informacje kontaktowe</Typography>

        <TextField
          label="Numer telefonu"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Moje zamówienia */}
      <Box>
        <Typography variant="h5" gutterBottom>Moje zamówienia</Typography>

        {orders.length === 0 ? (
          <Typography>Nie masz jeszcze żadnych zamówień.</Typography>
        ) : (
          orders.map((order) => (
            <Box key={order.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography><strong>Data:</strong> {order.date}</Typography>
              <Typography><strong>Pozycje:</strong></Typography>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} — {item.price} zł</li>
                ))}
              </ul>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Suma: {order.items.reduce((acc, item) => acc + item.price, 0)} zł
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default SettingsPage;

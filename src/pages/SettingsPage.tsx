import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button,
  Box, Divider, Switch, FormControlLabel, Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

type SettingsPageProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const SettingsPage: React.FC<SettingsPageProps> = ({ darkMode, toggleDarkMode }) => {
  const { user, orders, updateUser, changePassword, loading, error } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  // Dane użytkownika
  const [username, setUsername] = useState(user?.username || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [address, setAddress] = useState(user?.address || '');

  // Hasło - zmiana
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    setUsername(user?.username || '');
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setBirthDate(user?.birthDate || '');
    setGender(user?.gender || '');
    setAddress(user?.address || '');
    setIsEditing(false);
  }, [user]);

  const handleSave = () => {
    updateUser({
      username,
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      gender,
      address,
    });
    alert('Dane zapisane');
    setIsEditing(false);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("Nowe hasło i potwierdzenie nie są takie same");
      return;
    }
    if (!oldPassword || !newPassword) {
      setPasswordError("Wszystkie pola muszą być wypełnione");
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setPasswordSuccess("Hasło zostało zmienione pomyślnie");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(error || "Błąd podczas zmiany hasła");
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Ustawienia użytkownika</Typography>

      <Box mb={4}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Tryb ciemny"
        />
      </Box>

      <Divider />

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Dane użytkownika</Typography>

        <TextField
          label="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          label="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          label="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          label="Numer telefonu"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          label="Data urodzenia"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Płeć"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          label="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!isEditing}
        />

        {!isEditing ? (
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleEditClick}>
            Edytuj
          </Button>
        ) : (
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
            Zapisz zmiany
          </Button>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Sekcja zmiany hasła */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Zmiana hasła</Typography>

        <TextField
          label="Stare hasło"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nowe hasło"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Potwierdź nowe hasło"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        {passwordError && <Alert severity="error" sx={{ mt: 2 }}>{passwordError}</Alert>}
        {passwordSuccess && <Alert severity="success" sx={{ mt: 2 }}>{passwordSuccess}</Alert>}

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleChangePassword}
          disabled={loading}
        >
          Zmień hasło
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

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

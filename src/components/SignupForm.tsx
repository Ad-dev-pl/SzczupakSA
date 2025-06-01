import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, TextField, Button, Typography, Alert, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const genders = [
  { value: "", label: "Wybierz płeć" },
  { value: "male", label: "Mężczyzna" },
  { value: "female", label: "Kobieta" },
  { value: "other", label: "Inna" },
];

const SignupForm = () => {
  const { signup, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Hasła nie są takie same!");
      return;
    }

    try {
      await signup({
        username,
        password,
        email,
        firstName,
        lastName,
        phone,
        birthDate,
        gender,
        address,
      });
      setSuccess(true);
      navigate("/settings");
    } catch {
      setSuccess(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Rejestracja</Typography>

      <TextField
        label="Nazwa użytkownika"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Imię"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Nazwisko"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        type="email"
        required
      />

      <TextField
        label="Numer telefonu"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
        type="tel"
        required
      />

      <TextField
        label="Data urodzenia"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        select
        label="Płeć"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        margin="normal"
      >
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.value === ""}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
        required
      />

      <TextField
        label="Powtórz hasło"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
        required
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>Rejestracja udana!</Alert>}
    </Box>
  );
};

export default SignupForm;

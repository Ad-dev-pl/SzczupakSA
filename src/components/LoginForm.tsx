import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // hook wywołujemy tutaj, nie w funkcji

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/settings"); // lub inna strona po zalogowaniu
      }, 1000);
    } catch {
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label>Hasło:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Zalogowano pomyślnie!</div>}
      <Box sx={{ mt: 2 }}>
        <Link to="/signup">Nie masz konta? Zarejestruj się</Link>
      </Box>
    </form>
  );
};

export default LoginForm;

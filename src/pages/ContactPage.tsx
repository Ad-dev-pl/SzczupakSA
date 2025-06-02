import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const ContactPage = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm('service_w7joyc4', 'template_l7nqm1s', form.current, 'uw4f396ZFnHJQ-AVd')
      .then(
        () => {
          setMessageSent(true);
          setError(null);
          form.current?.reset();
        },
        (error) => {
          console.error(error);
          setError('Wystąpił błąd podczas wysyłania wiadomości.');
        }
      );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Kontakt</Typography>
      <Typography>Osoba kontaktowa: <strong>Dominik Jahaś</strong></Typography>
      <Typography>Główna siedziba: <strong>Planeta ziemia w galaktyce urwix</strong></Typography>
      <Typography>Nr Telefonu: <strong>+48-123-345-678</strong></Typography>
      <Typography>Email: <strong>adrian.d.studia1.testy@gmail.com</strong></Typography>

      <Box component="form" ref={form} onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500 }}>
        <TextField name="user_name" label="Imię" fullWidth required sx={{ mb: 2 }} />
        <TextField name="user_email" label="Email" type="email" fullWidth required sx={{ mb: 2 }} />
        <TextField name="message" label="Wiadomość" multiline rows={4} fullWidth required sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" color="primary">Wyślij</Button>

        {messageSent && <Alert severity="success" sx={{ mt: 2 }}>Wiadomość została wysłana!</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
};

export default ContactPage;

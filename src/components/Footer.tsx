// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ marginTop: 4, padding: '20px', backgroundColor: '#f1f1f1' }}>
      <Typography variant="body1" align="center">
        © 2025 Sklep Wędkarsko-Muzyczny
      </Typography>
      <Typography variant="body2" align="center">
        Autorzy: Adrian Drużdż, Sergiusz Braniewisz
      </Typography>
      <Typography variant="body2" align="center">
        <Link href="/regulamin" color="inherit">Regulamin</Link> | 
        <Link href="/polityka-prywatnosci" color="inherit"> Polityka prywatności</Link>
      </Typography>
    </Box>
  );
};

export default Footer;

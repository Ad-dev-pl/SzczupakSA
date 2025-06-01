import React from 'react';
import { Box, Typography, Link } from '@mui/material';

type FooterProps = {
  darkMode: boolean;
};

const Footer = ({ darkMode }: FooterProps) => {
  return (
    <Box
      sx={{
        marginTop: 4,
        padding: '20px',
        backgroundColor: darkMode ? '#121212' : '#f1f1f1',
        color: darkMode ? '#eee' : '#222',
        borderTop: darkMode ? '1px solid #333' : '1px solid #ccc',
      }}
    >
      <Typography variant="body1" align="center">
        © 2025 Sklep Wędkarsko-Muzyczny
      </Typography>
      <Typography variant="body2" align="center">
        Autorzy: Adrian Drużdż, Sergiusz Braniewisz
      </Typography>
      <Typography variant="body2" align="center">
        <Link href="/regulamin" color="inherit">
          Regulamin
        </Link>{' '}
        |{' '}
        <Link href="/polityka-prywatnosci" color="inherit">
          Polityka prywatności
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

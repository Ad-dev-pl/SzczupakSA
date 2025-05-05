import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sklep Wędkarsko-Muzyczny
        </Typography>
        <Button color="inherit" component={Link} to="/">Strona Główna</Button>
        <Button color="inherit" component={Link} to="/produkty">Produkty</Button>
        <Button color="inherit" component={Link} to="/kontakt">Kontakt</Button>
        <Button color="inherit" component={Link} to="/cart">Koszyk</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

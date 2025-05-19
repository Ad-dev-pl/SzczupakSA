import React from 'react';
import { AppBar, Toolbar, Button, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { link } from 'fs';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sklep Wędkarsko-Muzyczny
        </Typography>
        <SearchBar></SearchBar>
        <Button color="inherit" component={Link} to="/">Strona Główna</Button>
        <Button color="inherit" component={Link} to="/ProduktyPage">Produkty</Button>
        <Button color="inherit" component={Link} to="/kontakt">Kontakt</Button>
        <Button color="inherit" component={Link} to="/cart">Koszyk</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

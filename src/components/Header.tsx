import React from 'react';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // ikona dla ciemnego trybu
import Brightness7Icon from '@mui/icons-material/Brightness7'; // ikona dla jasnego trybu
import SearchBar from './SearchBar';
import UserMenu from "./UserMenu";

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sklep Wędkarsko-Muzyczny
        </Typography>
        <SearchBar />
        <Button color="inherit" component={Link} to="/">Strona Główna</Button>
        <Button color="inherit" component={Link} to="/ProduktyPage">Produkty</Button>
        <Button color="inherit" component={Link} to="/kontakt">Kontakt</Button>
        <Button color="inherit" component={Link} to="/cart">Koszyk</Button>

        {/* Przycisk przełączania trybu */}
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

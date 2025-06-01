import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const produkty = JSON.parse(localStorage.getItem('produkty') || '[]');
    const filtered = produkty.filter((p: any) =>
      p.nazwa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 1) {
      navigate(`/produkt/${filtered[0].id}`);
    } else if (filtered.length > 1) {
      navigate(`/produkty?query=${encodeURIComponent(searchTerm)}`);
    } else {
      alert('Nie znaleziono produktu');
    }

    setSearchTerm('');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Szukaj..."
        inputProps={{ 'aria-label': 'szukaj' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

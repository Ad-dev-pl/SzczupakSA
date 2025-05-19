import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputBase,
  IconButton,
  Paper,
  alpha,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 40,
  transition: 'width 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    width: 200,
    boxShadow: theme.shadows[3],
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  [`${SearchContainer}:hover &`]: {
    opacity: 1,
  },
}));

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
    <form onSubmit={handleSearch}>
      <SearchContainer elevation={1}>
        <IconButton type="submit" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        <StyledInput
          placeholder="Szukaj…"
          inputProps={{ 'aria-label': 'szukaj' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
    </form>
  );
};

export default SearchBar;

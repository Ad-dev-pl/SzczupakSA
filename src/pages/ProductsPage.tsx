// src/pages/ProduktyPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import ProduktForm from '../components/ProductsForm';
import Filters from '../components/Filters';
import ProduktList from '../components/ProductsList';

export interface Produkt {
  id: number;
  nazwa: string;
  kategoria: string;
  cena: number;
  ocena: number;
  nowosc: boolean;
  promocja: boolean;
  imageUrl: string;
}

export interface FiltrState {
  wyszukiwarka: string;
  kategoria: string;
  sortowanie: string;
}

const ProduktyPage = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('query') || '';

  const [produkty, setProdukty] = useState<Produkt[]>([]);
  const [filtr, setFiltr] = useState<FiltrState>({
    wyszukiwarka: '',
    kategoria: 'Wszystkie',
    sortowanie: 'nazwa-rosnąco',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('produkty') || '[]');
    setProdukty(stored);
  }, []);

  useEffect(() => {
    if (queryParam) {
      setFiltr((prev) => ({ ...prev, wyszukiwarka: queryParam }));
    }
  }, [queryParam]);

  const dodajProdukt = (nowy: Produkt) => {
    const updated = [...produkty, nowy];
    setProdukty(updated);
    localStorage.setItem('produkty', JSON.stringify(updated));
  };

  const przefiltrowane = produkty
    .filter(p => p.nazwa.toLowerCase().includes(filtr.wyszukiwarka.toLowerCase()))
    .filter(p => filtr.kategoria === 'Wszystkie' || p.kategoria === filtr.kategoria)
    .sort((a, b) => {
      if (filtr.sortowanie === 'nazwa-rosnąco') return a.nazwa.localeCompare(b.nazwa);
      if (filtr.sortowanie === 'nazwa-malejąco') return b.nazwa.localeCompare(a.nazwa);
      if (filtr.sortowanie === 'cena-rosnąco') return a.cena - b.cena;
      return b.cena - a.cena;
    });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Produkty</Typography>
      <ProduktForm dodaj={dodajProdukt} />
      <Filters filtr={filtr} setFiltr={setFiltr} />
      <ProduktList produkty={przefiltrowane} />
    </Container>
  );
};

export default ProduktyPage;

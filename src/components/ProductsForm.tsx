import { useState } from 'react';
import { Produkt } from '../pages/ProductsPage';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const kategorie = ['Wędki', 'Przynęty', 'Gitary', 'Akcesoria'];

const ProduktForm = ({ dodaj }: { dodaj: (p: Produkt) => void }) => {
  const [nazwa, setNazwa] = useState('');
  const [kategoria, setKategoria] = useState('Wędki');
  const [cena, setCena] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nazwa || cena === '') return;

    dodaj({ id: Date.now(), nazwa, kategoria, cena: Number(cena) });
    setNazwa('');
    setKategoria('Wędki');
    setCena('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        label="Nazwa produktu"
        value={nazwa}
        onChange={e => setNazwa(e.target.value)}
        required
      />
      <TextField
        select
        label="Kategoria"
        value={kategoria}
        onChange={e => setKategoria(e.target.value)}
      >
        {kategorie.map(k => (
          <MenuItem key={k} value={k}>{k}</MenuItem>
        ))}
      </TextField>
      <TextField
        type="number"
        label="Cena (zł)"
        value={cena}
        onChange={e => setCena(Number(e.target.value))}
        required
      />
      <Button type="submit" variant="contained">Dodaj</Button>
    </Box>
  );
};

export default ProduktForm;

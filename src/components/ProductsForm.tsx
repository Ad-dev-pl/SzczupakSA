import { useState } from 'react';
import { Produkt } from '../pages/ProductsPage';
import { Box, TextField, MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';

const kategorie = ['Wędki', 'Przynęty', 'Gitary', 'Akcesoria'];

const ProduktForm = ({ dodaj }: { dodaj: (p: Produkt) => void }) => {
  const [nazwa, setNazwa] = useState('');
  const [kategoria, setKategoria] = useState('Wędki');
  const [cena, setCena] = useState<number | ''>('');
  const [nowosc, setNowosc] = useState(false);
  const [promocja, setPromocja] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nazwa || cena === '') return;

    dodaj({
      id: Date.now(),
      nazwa,
      kategoria,
      cena: Number(cena),
      ocena: 0, // Domyślnie 0
      nowosc,
      promocja,
      imageUrl: 'https://via.placeholder.com/150', // Tymczasowy obrazek
    });

    setNazwa('');
    setKategoria('Wędki');
    setCena('');
    setNowosc(false);
    setPromocja(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
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
      <FormControlLabel
        control={<Checkbox checked={nowosc} onChange={e => setNowosc(e.target.checked)} />}
        label="Nowość"
      />
      <FormControlLabel
        control={<Checkbox checked={promocja} onChange={e => setPromocja(e.target.checked)} />}
        label="Promocja"
      />
      <Button type="submit" variant="contained">Dodaj</Button>
    </Box>
  );
};

export default ProduktForm;

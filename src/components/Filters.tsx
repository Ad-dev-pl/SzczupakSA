import { FiltrState } from '../pages/ProductsPage'; // lub '../types' jeśli masz osobny plik
import { Box, TextField, MenuItem } from '@mui/material';

interface FiltersProps {
  filtr: FiltrState;
  setFiltr: React.Dispatch<React.SetStateAction<FiltrState>>;
}
const Filters = ({ filtr, setFiltr }:FiltersProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        label="Szukaj"
        value={filtr.wyszukiwarka}
        onChange={e => setFiltr({ ...filtr, wyszukiwarka: e.target.value })}
      />
      <TextField
        select
        label="Kategoria"
        value={filtr.kategoria}
        onChange={e => setFiltr({ ...filtr, kategoria: e.target.value })}
      >
        <MenuItem value="Wszystkie">Wszystkie</MenuItem>
        <MenuItem value="Wędki">Wędki</MenuItem>
        <MenuItem value="Przynęty">Przynęty</MenuItem>
        <MenuItem value="Gitary">Gitary</MenuItem>
        <MenuItem value="Akcesoria">Akcesoria</MenuItem>
      </TextField>
      <TextField
        select
        label="Sortuj"
        value={filtr.sortowanie}
        onChange={e => setFiltr({ ...filtr, sortowanie: e.target.value })}
      >
        <MenuItem value="nazwa-rosnąco">Nazwa rosnąco</MenuItem>
        <MenuItem value="nazwa-malejąco">Nazwa malejąco</MenuItem>
        <MenuItem value="cena-rosnąco">Cena rosnąco</MenuItem>
        <MenuItem value="cena-malejąco">Cena malejąco</MenuItem>
      </TextField>
    </Box>
  );
};

export default Filters;

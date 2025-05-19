import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';

interface Produkt {
  id: number;
  nazwa: string;
  kategoria: string;
  cena: number;
}

const ProduktDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [produkt, setProdukt] = useState<Produkt | null>(null);

  useEffect(() => {
    const stored: Produkt[] = JSON.parse(localStorage.getItem('produkty') || '[]');

    const p = stored.find((produkt: Produkt) => produkt.id === Number(id));
    setProdukt(p ?? null);
  }, [id]);

  if (!produkt) return <Typography>Ładowanie...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{produkt.nazwa}</Typography>
      <Typography variant="subtitle1">{produkt.kategoria}</Typography>
      <Typography variant="body1">Cena: {produkt.cena} zł</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Tu mogą być bardziej szczegółowe dane o produkcie...
      </Typography>
    </Container>
  );
};

export default ProduktDetails;

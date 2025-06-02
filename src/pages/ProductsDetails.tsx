import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { useCart } from "../context/CartContext";

interface Produkt {
  id: number;
  nazwa: string;
  kategoria: string;
  cena: number;
  ocena: number;
  nowosc: boolean;
  promocja: boolean;
  imageUrl: string;
}

const ProduktDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [produkt, setProdukt] = useState<Produkt | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const produkty: Produkt[] = JSON.parse(localStorage.getItem("produkty") || "[]");
    const found = produkty.find((p) => p.id === Number(id));
    setProdukt(found || null);
  }, [id]);

  if (!produkt) {
    return <Container sx={{ mt: 4 }}><Typography>Produkt nie znaleziony.</Typography></Container>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
        <Box component="img" src={produkt.imageUrl} alt={produkt.nazwa} sx={{ maxWidth: 300 }} />
        <Box>
          <Typography variant="h4">{produkt.nazwa}</Typography>
          <Typography variant="h6" color="text.secondary">
            Kategoria: {produkt.kategoria}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Cena: {produkt.cena} zł
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Ocena: {produkt.ocena}
          </Typography>
          {produkt.nowosc && <Typography color="primary">Nowość!</Typography>}
          {produkt.promocja && <Typography color="secondary">Promocja!</Typography>}

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => addToCart(produkt)}
          >
            Dodaj do koszyka
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProduktDetails;

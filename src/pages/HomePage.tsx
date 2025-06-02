import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useCart} from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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

const HomePage = () => {
  const [produkty, setProdukty] = useState<Produkt[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Możesz tutaj pobierać z API lub localStorage
    const stored = JSON.parse(localStorage.getItem("produkty") || "[]");
    setProdukty(stored);
  }, []);

  const polecane = produkty.filter((p) => p.ocena >= 4);
  const promocje = produkty.filter((p) => p.promocja);
  const nowosci = produkty.filter((p) => p.nowosc);

  // Handler do przejścia na stronę szczegółów
  const goToDetails = (id: number) => {
    navigate(`/produkt/${id}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Polecane */}
      <Typography variant="h4" gutterBottom>
        Polecane produkty
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {polecane.length > 0 ? (
          polecane.map((produkt) => (
            <Box key={produkt.id} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
              <ProductCard
                produkt={produkt}
                addToCart={addToCart}
                onDetails={() => goToDetails(produkt.id)}
              />
            </Box>
          ))
        ) : (
          <Typography>Brak polecanych produktów.</Typography>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Promocje */}
      <Typography variant="h4" gutterBottom>
        Promocje
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {promocje.length > 0 ? (
          promocje.map((produkt) => (
            <Box key={produkt.id} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
              <ProductCard
                produkt={produkt}
                addToCart={addToCart}
                onDetails={() => goToDetails(produkt.id)}
              />
            </Box>
          ))
        ) : (
          <Typography>Brak promocji.</Typography>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Nowości */}
      <Typography variant="h4" gutterBottom>
        Nowości
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {nowosci.length > 0 ? (
          nowosci.map((produkt) => (
            <Box key={produkt.id} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
              <ProductCard
                produkt={produkt}
                addToCart={addToCart}
                onDetails={() => goToDetails(produkt.id)}
              />
            </Box>
          ))
        ) : (
          <Typography>Brak nowości.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;

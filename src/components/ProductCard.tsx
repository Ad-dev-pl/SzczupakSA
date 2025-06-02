import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

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

interface ProductCardProps {
  produkt: Produkt;
  addToCart: (produkt: Produkt) => void;
  onDetails?: () => void; // opcjonalnie handler do przejścia do szczegółów
}

const ProductCard = ({ produkt, addToCart, onDetails }: ProductCardProps) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={produkt.imageUrl} alt={produkt.nazwa} />
      <CardContent>
        <Typography variant="h6">{produkt.nazwa}</Typography>
        <Typography variant="body2" color="text.secondary">Cena: {produkt.cena} zł</Typography>
        <Typography variant="body2" color="text.secondary">Ocena: {produkt.ocena}</Typography>
        {produkt.nowosc && <Typography variant="caption" color="primary">Nowość!</Typography>}
        {produkt.promocja && <Typography variant="caption" color="secondary">Promocja!</Typography>}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onDetails}>Szczegóły</Button>
        <Button size="small" variant="contained" onClick={() => addToCart(produkt)}>Dodaj do koszyka</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

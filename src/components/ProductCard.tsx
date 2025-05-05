import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Snackbar } from '@mui/material';
import { useCart } from '../context/CartContext'

type Props = {
  imageUrl: string;
  name: string;
  price: number;
};

const ProductCard: React.FC<Props> = ({ imageUrl, name, price }) => {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({ imageUrl, name, price });
    setOpen(true);
  };

  return (
    <Card>
      <img src={imageUrl} alt={name} style={{ width: '100%' }} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{price} zł</Typography>
        <Button onClick={handleAddToCart} variant="contained" color="primary">
          Dodaj do koszyka
        </Button>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={(event, reason) => {
                if (reason === 'clickaway') return;
                setOpen(false);
            }}
            message="Nowy produkt w koszyku!"
        />

      </CardContent>
    </Card>
  );
};

export default ProductCard;

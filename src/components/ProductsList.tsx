import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  ListItemButton,
  Snackbar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface Produkt {
  id: number;
  nazwa: string;
  kategoria: string;
  cena: number;
  imageUrl?: string; // jeśli masz zdjęcia
}

interface Props {
  produkty: Produkt[];
}

const ProduktList = ({ produkty }: Props) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (id: number) => {
    navigate(`/produkt/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent, produkt: Produkt) => {
    e.stopPropagation(); // żeby nie otworzyć szczegółów klikając ikonę
    addToCart({
      imageUrl: produkt.imageUrl || '',
      name: produkt.nazwa,
      price: produkt.cena,
    });
    setOpenSnackbar(true);
  };

  return (
    <>
      {produkty.map((p) => (
        <div key={p.id}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(p.id)}>
              <ListItemText
                primary={p.nazwa}
                secondary={`${p.kategoria} — ${p.cena} zł`}
              />
              <IconButton edge="end" onClick={(e) => handleAddToCart(e, p)}>
                <AddShoppingCartIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <Divider />
        </div>
      ))}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Produkt dodany do koszyka"
      />
    </>
  );
};

export default ProduktList;

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
  imageUrl?: string;
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
    e.stopPropagation();
    addToCart(produkt); // przekazujemy cały obiekt produktu
    setOpenSnackbar(true);
  };

  return (
    <>
      <List>
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
      </List>

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

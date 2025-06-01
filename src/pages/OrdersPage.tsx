import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Divider } from '@mui/material';
import jsPDF from 'jspdf';

const OrdersPage = () => {
  const { orders, cancelOrder, user } = useAuth();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleToggleDetails = (orderId: number) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const generateInvoicePDF = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Faktura (symulacja)', 14, 20);

    doc.setFontSize(12);
    doc.text(`Zamówienie nr: ${order.id}`, 14, 30);
    doc.text(`Data zamówienia: ${order.date}`, 14, 38);

    doc.text(`Zamawiający: ${user?.name || user?.username || 'Brak danych'}`, 14, 46);
    doc.text(`Adres dostawy: ${user?.address || 'Brak adresu'}`, 14, 54);

    doc.text('Produkty:', 14, 64);

    let y = 72;
    order.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} — ${item.price.toFixed(2)} zł`, 20, y);
      y += 8;
    });

    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    doc.text(`Razem: ${total.toFixed(2)} zł`, 14, y + 6);

    doc.text('Metoda płatności: Za pobraniem', 14, y + 16);

    doc.save(`faktura_zamowienie_${order.id}.pdf`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Moje zamówienia</Typography>

      {orders.length === 0 ? (
        <Typography>Nie masz jeszcze żadnych zamówień.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <Box key={order.id} mb={2}>
              <ListItem
                component="button"
                onClick={() => handleToggleDetails(order.id)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderRadius: 1,
                  bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#e0e0e0' },
                  p: 2,
                }}
              >
                <ListItemText
                  primary={`Zamówienie #${order.id}`}
                  secondary={`Data: ${order.date} | Status: ${order.status}`}
                />
              </ListItem>

              {selectedOrderId === order.id && (
                <Box sx={{ pl: 2, mt: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Szczegóły zamówienia:
                  </Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index}>• {item.name} – {item.price} zł</Typography>
                  ))}

                  <Divider sx={{ my: 1 }} />

                  <Typography>
                    <strong>Zamawiający:</strong> {user?.name || user?.username || 'Brak danych'}
                  </Typography>
                  <Typography>
                    <strong>Adres dostawy:</strong> {user?.address || 'Brak adresu'}
                  </Typography>

                  <Typography sx={{ mt: 1, fontStyle: 'italic' }}>
                    Metoda płatności: <strong>Za pobraniem</strong>
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Anuluj zamówienie
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => generateInvoicePDF(order.id)}
                    >
                      Pobierz fakturę
                    </Button>
                  </Box>
                </Box>
              )}

              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
};

export default OrdersPage;

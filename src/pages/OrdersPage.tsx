import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import { Container, Typography, List, ListItem, ListItemText, Button, Box, Divider } from '@mui/material';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

const OrdersPage = () => {
  const { orders, cancelOrder, user } = useAuth();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleToggleDetails = (orderId: number) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const generateInvoicePDF = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const itemsTableBody = [
      ['Nazwa produktu', 'Cena (zł)'],
      ...order.items.map((item: any) => [item.name, item.price.toFixed(2)]),
    ];

    const total = order.items.reduce((sum: number, item: any) => sum + item.price, 0);

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Faktura (symulacja)', style: 'header' },
        { text: `Zamówienie nr: ${order.id}`, margin: [0, 10, 0, 2] },
        { text: `Data zamówienia: ${order.date}`, margin: [0, 0, 0, 10] },
        { text: `Zamawiający: ${user?.name || user?.username || 'Brak danych'}`, margin: [0, 0, 0, 2] },
        { text: `Adres dostawy: ${user?.address || 'Brak adresu'}`, margin: [0, 0, 0, 10] },

        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: itemsTableBody,
          },
          layout: 'lightHorizontalLines',
        },

        { text: `Razem: ${total.toFixed(2)} zł`, style: 'total', margin: [0, 10, 0, 0] },
        { text: 'Metoda płatności: Za pobraniem', margin: [0, 5, 0, 0] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        total: {
          bold: true,
          fontSize: 14,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
      defaultStyle: {
        font: 'Roboto',
      },
    };

    pdfMake.createPdf(docDefinition).download(`faktura_zamowienie_${order.id}.pdf`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Moje zamówienia</Typography>

      {orders.length === 0 ? (
        <Typography>Nie masz jeszcze żadnych zamówień.</Typography>
      ) : (
        <List>
          {orders.map((order: any) => (
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
                  {order.items.map((item: any, index: number) => (
                    <Typography key={index}>• {item.name} – {item.price.toFixed(2)} zł</Typography>
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

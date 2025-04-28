import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Grid, Paper } from '@mui/material';

const PaymentsPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f5f7', padding: 3 }}>
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
          maxWidth: 800,
          margin: 'auto',
          marginTop: 5, // margin at the top of the form
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, textAlign: 'center', color: '#333' }}
        >
          💳 Manage Payments
        </Typography>
        <Typography sx={{ color: '#777', marginBottom: 3, textAlign: 'center' }}>
          Add or update your payment information securely.
        </Typography>

        <form onSubmit={handleSavePayment}>
          <TextField
            label="Payment Method"
            fullWidth
            variant="outlined"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Card Number"
                fullWidth
                variant="outlined"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                sx={{ marginBottom: 2 }}
                inputProps={{ maxLength: 16 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date"
                fullWidth
                variant="outlined"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                sx={{ marginBottom: 2 }}
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
          </Grid>

          <TextField
            label="CVV"
            fullWidth
            variant="outlined"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            sx={{ marginBottom: 2 }}
            inputProps={{ maxLength: 3 }}
          />

          <Divider sx={{ margin: '30px 0' }} />

          <Button
            type="submit"
            sx={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '4px',
              width: '100%',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Save Payment Method
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PaymentsPage;

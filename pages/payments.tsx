// pages/payments.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';

const PaymentsPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // handle logic here
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
        minHeight: '100vh',
        py: 6,
        px: { xs: 2, md: 6 },
        color: '#212121',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: '#ffffff',
          color: '#212121',
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          💳 Manage Payments
        </Typography>
        <Typography variant="body1" textAlign="center" mb={3}>
          Securely add or update your preferred payment method.
        </Typography>

        <form onSubmit={handleSavePayment}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="payment-method-label" sx={{ color: '#212121' }}>
              Payment Method
            </InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              label="Payment Method"
              onChange={(e) => setPaymentMethod(e.target.value)}
              sx={{
                '& .MuiSelect-select': {
                  color: '#212121',
                },
              }}
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Card Number"
                fullWidth
                variant="outlined"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputProps={{ maxLength: 16 }}
                sx={{
                  mb: 2,
                  '& .MuiInputBase-input': {
                    color: '#212121',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#999',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                variant="outlined"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                inputProps={{ maxLength: 5 }}
                sx={{
                  mb: 2,
                  '& .MuiInputBase-input': {
                    color: '#212121',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#999',
                  },
                }}
              />
            </Grid>
          </Grid>

          <TextField
            label="CVV"
            fullWidth
            variant="outlined"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            inputProps={{ maxLength: 3 }}
            sx={{
              mb: 3,
              '& .MuiInputBase-input': {
                color: '#212121',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#999',
              },
            }}
          />

          <Divider sx={{ my: 3 }} />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#007bff',
              color: 'white',
              py: 1.5,
              fontSize: '1rem',
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

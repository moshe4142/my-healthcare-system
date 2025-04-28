import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';

const PaymentsPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment method saved successfully!');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>💳 Payments</Typography>
      
      <Typography sx={{ mb: 2, fontSize: '1.1rem', color: 'text.secondary' }}>
        View and manage your payments here.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <form onSubmit={handleSavePayment}>
        {/* Payment Method */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Payment Method</Typography>
          <TextField
            fullWidth
            label="Payment Method (e.g., Credit Card)"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mt: 1 }}
            variant="outlined"
          />
        </Box>

        {/* Card Number */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Card Number</Typography>
          <TextField
            fullWidth
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            sx={{ mt: 1 }}
            variant="outlined"
            type="text"
            inputProps={{ maxLength: 16 }}
          />
        </Box>

        {/* Expiry Date */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Expiry Date</Typography>
          <TextField
            fullWidth
            label="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            sx={{ mt: 1 }}
            variant="outlined"
            type="text"
            inputProps={{ maxLength: 5 }}
          />
        </Box>

        {/* CVV */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>CVV</Typography>
          <TextField
            fullWidth
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            sx={{ mt: 1 }}
            variant="outlined"
            type="password"
            inputProps={{ maxLength: 3 }}
          />
        </Box>

        {/* Save Button */}
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: '10px 20px' }}
          >
            Save Payment Method
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PaymentsPage;

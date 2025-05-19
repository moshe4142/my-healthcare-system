import React, { useState, useEffect } from 'react';
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
import { useCart } from '../context/shoppingCartContext';
import { useRouter } from 'next/router';

const PaymentsPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { getTotalPrice } = useCart();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('paymentData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setPaymentMethod(parsed.paymentMethod || '');
      setCardNumber(parsed.cardNumber || '');
      setExpiryDate(parsed.expiryDate || '');
      setCvv(parsed.cvv || '');
    }
  }, []);

  const validateForm = () => {
    if (!paymentMethod || !cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all payment fields.');
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length < 12 || cvv.length < 3) {
      setError('Please enter valid card details.');
      return false;
    }
    return true;
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19); // 16 digits + 3 spaces

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const paymentData = {
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
    };

    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    localStorage.removeItem('cartItems'); // 🧹 Clear cart
    setSuccess(true);
    setError('');

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
        p: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💳 Payment Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {success ? (
          <Typography color="success.main" fontWeight="bold">
            ✅ Payment successful! Redirecting...
          </Typography>
        ) : (
          <form onSubmit={handleSavePayment}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <MenuItem value="credit">Credit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Card Number"
                  fullWidth
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Expiry Date"
                  fullWidth
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  fullWidth
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Total to Pay: ${getTotalPrice().toFixed(2)}
                </Typography>
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Confirm and Pay
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentsPage;

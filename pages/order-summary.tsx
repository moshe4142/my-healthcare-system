import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
} from '@mui/material';

const OrderSummaryPage = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      const parsed = JSON.parse(storedOrder);
      setOrderId(parsed.orderId);
      setTotal(parsed.total);
    } else {
      router.push('/');
    }
  }, [router]);

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
          ✅ Thank you for your order!
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">
          Order ID: <strong>{orderId}</strong>
        </Typography>
        <Typography variant="body1">
          Total Paid: <strong>${total.toFixed(2)}</strong>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderSummaryPage;

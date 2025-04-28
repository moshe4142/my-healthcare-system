import React from 'react';
import { Box, Typography } from '@mui/material';

const PaymentsPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>💳 Payments</Typography>
      <Typography sx={{ mt: 2 }}>
        View and manage your payments here.
      </Typography>
    </Box>
  );
};

export default PaymentsPage;

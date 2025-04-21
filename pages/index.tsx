// pages/index.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        Welcome to the Pharmacy Home Page
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Find all the products and services you need for your health and wellness.
      </Typography>
    </Container>
  );
}

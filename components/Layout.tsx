'use client';

import React from 'react';
import { Box, Toolbar } from '@mui/material';
import ButtonAppBar from './ButtonAppBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* AppBar */}
      <ButtonAppBar />

      {/* Main content */}
      <Box component="main" >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;

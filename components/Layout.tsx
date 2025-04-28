import React from 'react';
import { Box, Toolbar } from '@mui/material';
import ButtonAppBar from './ButtonAppBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ButtonAppBar />
      <Box component="main" sx={{ flexGrow: 1,  }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;

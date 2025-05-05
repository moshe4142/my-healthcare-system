'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface NavBarProps {
  onMenuClick: () => void;
}

const NavBar = ({ onMenuClick }: NavBarProps) => {
  const router = useRouter();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#1f2937', // Dark background
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Hamburger Menu */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Pharmacy System Logo/Text */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#66bb6a' }}>
          Pharmacy System
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => router.push('/')}
            sx={{ color: '#ef5350', ':hover': { backgroundColor: '#374151' }, transition: 'background-color 0.3s ease' }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push('/appointments')}
            sx={{ color: '#66bb6a', ':hover': { backgroundColor: '#374151' }, transition: 'background-color 0.3s ease' }}
          >
            Appointments
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push('/payments')}
            sx={{ color: '#42a5f5', ':hover': { backgroundColor: '#374151' }, transition: 'background-color 0.3s ease' }}
          >
            Payments
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push('/medicalRecords')}
            sx={{ color: '#ef5350', ':hover': { backgroundColor: '#374151' }, transition: 'background-color 0.3s ease' }}
          >
            Medical Records
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push('/medicalEquipment')}
            sx={{ color: '#66bb6a', ':hover': { backgroundColor: '#374151' }, transition: 'background-color 0.3s ease' }}
          >
            Medical Equipment
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

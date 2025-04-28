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
        backgroundColor: '#1f2937', // צבע כהה (gray-800)
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* המבורגר בצד שמאל */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* כותרת */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Pharmacy System
        </Typography>

        {/* כפתורי ניווט */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
          <Button color="inherit" onClick={() => router.push('/appointments')}>Appointments</Button>
          <Button color="inherit" onClick={() => router.push('/payments')}>Payments</Button>
          <Button color="inherit" onClick={() => router.push('/medicalRecords')}>Medical Records</Button>
          <Button color="inherit" onClick={() => router.push('/medicalEquipment')}>Medical Equipment</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

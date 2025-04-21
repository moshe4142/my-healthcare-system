import { AppBar, Toolbar, IconButton, Typography, Button, Drawer } from '@mui/material';
import { useState } from 'react';

const ButtonAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(!drawerOpen)}>
          {/* Icon for Drawer */}
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pharmacy
        </Typography>
        <Button color="inherit" href="/appointments">
          Appointments
        </Button>
        <Button color="inherit" href="/login">
          Login
        </Button>
      </Toolbar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {/* Drawer content */}
      </Drawer>
    </AppBar>
  );
};

export default ButtonAppBar;

'use client';

import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { Email, Phone, ShoppingCart, Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0d47a1",
        color: "white",
        py: 3,
        px: 2,
        textAlign: "center",
      }}
    >
      {/* Contact Info */}
      <Stack direction="row" justifyContent="center" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <IconButton color="inherit" disabled>
          <Email fontSize="small" />
        </IconButton>
        <Typography variant="body2">pharmacy@example.com</Typography>

        <IconButton color="inherit" disabled>
          <Phone fontSize="small" />
        </IconButton>
        <Typography variant="body2">+1 (234) 567-890</Typography>
      </Stack>

      {/* Social and Cart */}
      <Stack direction="row" justifyContent="center" spacing={1}>
        <IconButton color="inherit" aria-label="Facebook">
          <Facebook />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter">
          <Twitter />
        </IconButton>
        <IconButton color="inherit" aria-label="Instagram">
          <Instagram />
        </IconButton>
        <IconButton color="inherit" aria-label="Cart">
          <ShoppingCart />
        </IconButton>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        © 2025 Pharmacy System | All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

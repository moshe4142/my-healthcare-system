"use client";

import React from "react";
import { Box, Typography, IconButton, Stack, Grid, Paper } from "@mui/material";
import {
  Email,
  Phone,
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  LocationOn,
  AccessTime,
  Star,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        minHeight: "70vh",
        // paddingTop: 8,
        py: 15,
        background:
          "linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #1565c0 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)
          `,
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          mx: "auto",
          px: 3,
          py: 6,
        }}
      >
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Paper
                elevation={0}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: { xs: "auto", md: 0 },
                  mb: 2,
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    background: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <Star sx={{ fontSize: 32, color: "#4fc3f7" }} />
              </Paper>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  background: "linear-gradient(45deg, #4fc3f7, #81d4fa)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pharmacy System
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#bbdefb", lineHeight: 1.6 }}
              >
                Specializing in professional healthcare services
                <br />
                with advanced technology and personal care
              </Typography>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "#4fc3f7", fontWeight: 600 }}
              >
                Contact Us
              </Typography>

              <Stack spacing={2}>
                <Paper
                  elevation={0}
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #00acc1, #26c6da)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <Email sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                    pharmacy@example.com
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <Phone sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                    +1 (234) 567-890
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #f44336, #ef5350)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <LocationOn sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                    123 Health Street, Tel Aviv
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Grid>

          {/* Hours & Services */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "#4fc3f7", fontWeight: 600 }}
              >
                Opening Hours
              </Typography>

              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <AccessTime sx={{ fontSize: 16, color: "#4fc3f7", mr: 1 }} />
                  <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                    Mon-Thu: 08:00-20:00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <AccessTime sx={{ fontSize: 16, color: "#4fc3f7", mr: 1 }} />
                  <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                    Fri: 08:00-14:00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <AccessTime sx={{ fontSize: 16, color: "#4fc3f7", mr: 1 }} />
                  <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                    Sat: Closed
                  </Typography>
                </Box>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <IconButton
                  sx={{
                    width: 48,
                    height: 48,
                    background: "linear-gradient(45deg, #ff9800, #ff5722)",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 8px 25px rgba(255, 152, 0, 0.3)",
                    },
                  }}
                >
                  <ShoppingCart />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media & Copyright */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Social Icons */}
          <Stack direction="row" spacing={2} sx={{ mb: { xs: 3, md: 0 } }}>
            <IconButton
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(45deg, #3b5998, #4267b2)",
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 8px 25px rgba(59, 89, 152, 0.3)",
                },
              }}
            >
              <Facebook />
            </IconButton>

            <IconButton
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(45deg, #1da1f2, #0d8bd9)",
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 8px 25px rgba(29, 161, 242, 0.3)",
                },
              }}
            >
              <Twitter />
            </IconButton>

            <a
              href="https://www.instagram.com/josefstalinofficial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(45deg, #e1306c, #fd1d1d)",
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 8px 25px rgba(225, 48, 108, 0.3)",
                  },
                }}
              >
                <Instagram />
              </IconButton>
            </a>

          </Stack>

          {/* Copyright */}
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography
              variant="body2"
              sx={{ color: "#81d4fa", fontWeight: 500 }}
            >
              © 2025 Pharmacy System | All rights reserved
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#64b5f6", mt: 0.5, display: "block" }}
            >
              Advanced pharmacy management system
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Floating Animation Elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#4fc3f7",
          opacity: 0.3,
          animation: "pulse 2s infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: 32,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#81d4fa",
          opacity: 0.2,
          animation: "pulse 2s infinite 1s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "75%",
          left: 32,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#3f51b5",
          opacity: 0.25,
          animation: "pulse 2s infinite 2s",
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
    </Box>
  );
};

export default Footer;

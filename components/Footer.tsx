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
import Flight from "@mui/icons-material/Flight";
import { useTheme } from "@mui/material/styles"; // חשוב: תיקנתי ל־styles
import { useRouter } from "next/router";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const router = useRouter();

  const handleAction = () => {
    if (router.pathname === "/") {
      // כבר בעמוד הבית - גלילה למעלה
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // נווט לעמוד הבית
      router.push("/");
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        minHeight: "70vh",
        py: 15,
        background: isDark
          ? "linear-gradient(135deg, #0d1b4d 0%, #0b2e63 50%, #104e82 100%)"
          : "linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #1565c0 100%)",
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
        {/* תוכן הפוטר */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* מידע על החברה */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Paper
                elevation={0}
                onClick={handleAction}
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

              <Typography variant="body2" sx={{ color: "#bbdefb", lineHeight: 1.6 }}>
                Specializing in professional healthcare services
                <br />
                with advanced technology and personal care
              </Typography>
            </Box>
          </Grid>

          {/* פרטי יצירת קשר */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "#4fc3f7", fontWeight: 600 }}
              >
                Contact Us
              </Typography>

              <Stack spacing={2}>
                {/* אימייל */}
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
                    josef_stalin@gmail.com
                  </Typography>
                </Paper>

                {/* טלפון */}
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
                  <a href="tel:+972584084177" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                      +972 58-408-4177
                    </Typography>
                  </a>
                </Paper>

                {/* מיקום */}
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
                  <a
                    href="https://www.google.com/maps/place/%D7%98%D7%94%D7%A8%D7%9F,+%D7%90%D7%99%D7%A8%D7%90%D7%9F%E2%80%AD/@35.7077402,51.5124614,11z/data=!3m1!4b1!4m6!3m5!1s0x3f8e00491ff3dcd9:0xf0b3697c567024bc!8m2!3d35.7218583!4d51.3346954!16zL20vMGZ0bHg?entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                      Tehran, Iran
                    </Typography>
                  </a>
                </Paper>
              </Stack>
            </Box>
          </Grid>

          {/* שעות פעילות ושירותים */}
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
                    sun-Thu: 08:30-17:00
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

        {/* מדיה חברתית וזכויות יוצרים */}
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
          {/* אייקונים של מדיה חברתית */}
          <Stack direction="row" spacing={2} sx={{ mb: { xs: 3, md: 0 } }}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            </a>

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

          {/* זכויות יוצרים */}
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography
              variant="body2"
              sx={{
                color: "#81d4fa",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Flight sx={{ fontSize: 18 }} />© 2025 Ma'aT Unit (מע״ת) | All rights
              reserved
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

      {/* אלמנטים אנימציה צפים */}
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

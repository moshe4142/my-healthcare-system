import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  Fade,
  Typography,
  Badge,
  Chip,
  Tooltip,
  Zoom,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useRouter } from "next/router";
import ThemeToggleButton from "../context/ThemeToggle";
import { useTheme } from "@mui/material";
import { useCart } from "../context/shoppingCartContext";

const ButtonAppBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { cartItems, getTotalItems } = useCart();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Sync cart items count
  useEffect(() => {
    setCartItemsCount(getTotalItems());
  }, [cartItems, getTotalItems]);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Logout failed (${res.status}): ${text}`);
      }
      router.push("/login");
      setOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const drawerItems = [
    {
      label: "Profile",
      icon: <AccountCircleIcon />,
      action: () => handleNavigate("/profile"),
      description: "Manage personal profile",
    },
    {
      label: "Contact",
      icon: <ContactMailIcon />,
      action: () => handleNavigate("/contact"),
      description: "Support and contact",
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      action: handleLogout,
      description: "Sign out of system",
    },
  ];

  return (
    <>
      {/* Main AppBar */}
      <AppBar
        position="fixed"
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #0d1b2a 0%, #1b263b 25%, #2d3748 50%, #1a365d 75%, #2c5aa0 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.2)",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)"
            : "0 8px 32px rgba(102, 126, 234, 0.3), 0 4px 16px rgba(118, 75, 162, 0.2)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? "linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)"
              : "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
            zIndex: -1,
          },
        }}
      >
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between",
          minHeight: "72px !important",
          px: 3,
        }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Menu" placement="bottom" TransitionComponent={Zoom}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "scale(1.1) rotate(180deg)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Shopping Cart" placement="bottom" TransitionComponent={Zoom}>
              <Badge
                badgeContent={cartItemsCount}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#ff4757",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(255, 71, 87, 0.4)",
                    animation: "pulse 2s infinite",
                  },
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => router.push("/cart")}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </Tooltip>
          </Box>

          {/* Center Section - Logo */}
          <Box sx={{ 
            flexGrow: 1, 
            display: "flex", 
            justifyContent: "center",
            position: "relative",
          }}>
            <Button
              onClick={() => router.push("/")}
              sx={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "none",
                px: 4,
                py: 1.5,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                letterSpacing: "1px",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalHospitalIcon sx={{ fontSize: "1.8rem" }} />
                Pharmacy System
              </Box>
            </Button>
          </Box>

          {/* Right Section - Navigation */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Tooltip title="Book appointments" placement="bottom" TransitionComponent={Zoom}>
              <Button
                color="inherit"
                onClick={() => router.push("/appointments")}
                startIcon={<CalendarTodayIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.1)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                Appointments
              </Button>
            </Tooltip>

            <Tooltip title="View medical records" placement="bottom" TransitionComponent={Zoom}>
              <Button
                color="inherit"
                onClick={() => router.push("/medicalRecords")}
                startIcon={<MedicalServicesIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.1)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                Medical Records
              </Button>
            </Tooltip>

            <Tooltip title="Browse medical equipment" placement="bottom" TransitionComponent={Zoom}>
              <Button
                color="inherit"
                onClick={() => router.push("/medicalEquipment")}
                startIcon={<LocalHospitalIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.1)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                Equipment
              </Button>
            </Tooltip>

            <Tooltip title="Toggle theme" placement="bottom" TransitionComponent={Zoom}>
              <Box sx={{ 
                ml: 2, 
                p: 1, 
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  transform: "rotate(15deg)",
                },
                transition: "all 0.3s ease",
              }}>
                <ThemeToggleButton />
              </Box>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar sx={{ minHeight: "72px !important" }} />

      {/* Enhanced Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            position: "fixed",
            top: "72px",
            left: "16px",
            height: "auto",
            minHeight: "200px",
            maxHeight: "60vh",
            width: 360,
            borderRadius: 4,
            background: isDark
              ? "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 50%, #1a1a1a 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)",
            color: isDark ? "#f0f0f0" : "#1b1b1b",
            boxShadow: isDark
              ? "0 20px 60px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.4)"
              : "0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.08)",
            overflowY: "auto",
            backdropFilter: "blur(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: isDark ? "#2d2d2d" : "#f1f3f4",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: isDark ? "#555" : "#c1c1c1",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: isDark ? "#777" : "#a8a8a8",
              },
            },
          },
        }}
        transitionDuration={400}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pb: 2,
            background: isDark
              ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)"
              : "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.02) 100%)",
            borderRadius: "16px 16px 0 0",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDark
                ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)"
                : "radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 70%)",
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: "1.4rem",
                color: isDark ? "#f0f0f0" : "#1b1b1b",
                letterSpacing: "0.5px",
                textShadow: isDark 
                  ? "0 2px 4px rgba(0,0,0,0.3)" 
                  : "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Menu
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? "#b0b0b0" : "#666",
                fontSize: "0.85rem",
                mt: 0.5,
              }}
            >
              Quick navigation
            </Typography>
          </Box>

          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              color: isDark ? "#f0f0f0" : "#1b1b1b",
              background: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: isDark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)",
                transform: "rotate(90deg) scale(1.1)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: 2,
              width: 44,
              height: 44,
              position: "relative",
              zIndex: 1,
            }}
          >
            <CloseIcon sx={{ fontSize: "1.3rem" }} />
          </IconButton>
        </Box>

        {/* Elegant Divider */}
        <Box sx={{ px: 3, py: 1 }}>
          <Divider
            sx={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.2) 80%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%, transparent 100%)",
              height: "2px",
              borderRadius: 1,
              border: "none",
            }}
          />
        </Box>

        {/* Menu Items */}
        <List sx={{ px: 2, py: 1 }}>
          {drawerItems.map((item, i) => (
            <ListItem
              key={i}
              onClick={item.action}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                mx: 1,
                my: 1,
                px: 2,
                py: 2,
                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.02)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(0,0,0,0.05)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(102, 126, 234, 0.08)",
                  transform: "translateX(12px) scale(1.02)",
                  boxShadow: isDark
                    ? "0 8px 25px rgba(0,0,0,0.4)"
                    : "0 8px 25px rgba(102, 126, 234, 0.2)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(102, 126, 234, 0.2)",
                },
                "&:active": {
                  transform: "translateX(8px) scale(0.98)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: isDark
                    ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
                    : "linear-gradient(90deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%)",
                  transition: "left 0.5s ease",
                },
                "&:hover::before": {
                  left: "100%",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isDark ? "#f0f0f0" : "#1b1b1b",
                  minWidth: 48,
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.4rem",
                    filter: isDark
                      ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                      : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: isDark ? "#f0f0f0" : "#1b1b1b",
                    letterSpacing: "0.25px",
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem",
                    color: isDark ? "#b0b0b0" : "#666",
                    mt: 0.5,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Status Chip */}
        <Box sx={{ px: 3, py: 2 }}>
          <Chip
            label="System Online"
            variant="outlined"
            sx={{
              width: "100%",
              py: 1,
              background: isDark
                ? "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)",
              borderColor: "#4caf50",
              color: "#4caf50",
              fontWeight: 600,
              "& .MuiChip-label": {
                fontSize: "0.9rem",
              },
            }}
          />
        </Box>

        {/* Animated Footer */}
        <Box
          sx={{
            height: "6px",
            background: isDark
              ? "linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"
              : "linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
            mt: 2,
            borderRadius: "0 0 16px 16px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              animation: "shimmer 3s infinite",
            },
            "@keyframes shimmer": {
              "0%": { left: "-100%" },
              "100%": { left: "100%" },
            },
          }}
        />
      </Drawer>

      {/* Global Styles for Pulse Animation */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default ButtonAppBar;
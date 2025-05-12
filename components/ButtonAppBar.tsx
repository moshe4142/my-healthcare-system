import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from "next/router";
import { useTheme } from "../context/ThemeContext";

const ButtonAppBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // const { theme, toggleTheme } = useTheme();

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
    setOpen(false);
  };

  return (
    <>

      <AppBar

        position="fixed"
        sx={{ backgroundColor: "#4db6ac", boxShadow: "none" }}

        // position="static"
        // sx={{ backgroundColor: "#4db6ac", boxShadow: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Menu and Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => router.push("/cart")}
              sx={{
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                transition: "background-color 0.3s ease",
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>

          {/* Center: Title Button */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => router.push("/")}
              sx={{
                color: "white",
                fontSize: "1.25rem",
                fontWeight: "bold",
                textTransform: "none",
                ":hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Pharmacy System
            </Button>
          </Box>

          {/* Right: Page Links */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              color="inherit"
              onClick={() => router.push("/appointments")}
              sx={{
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                transition: "background-color 0.3s ease",
              }}
            >
              Appointments
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/payments")}
              sx={{
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                transition: "background-color 0.3s ease",
              }}
            >
              Payments
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/medicalRecords")}
              sx={{
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                transition: "background-color 0.3s ease",
              }}
            >
              Medical Records
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/medicalEquipment")}
              sx={{
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                transition: "background-color 0.3s ease",
              }}
            >
              Medical Equipment
            </Button>

            {/* Optional theme toggle 
            <Tooltip title={theme === "dark" ? "Light Mode" : "Dark Mode"}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  transition: "transform 0.4s ease, color 0.3s",
                  transform: theme === "dark" ? "rotate(180deg)" : "rotate(0deg)",
                  color: theme === "dark" ? "#fdd835" : "#ffffff",
                }}
              >
                {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to push content below the fixed AppBar */}
      <Toolbar />

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        PaperProps={{
          sx: {
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            width: 260,
            transition: "all 0.3s ease",
            borderRight: "1px solid #c8e6c9",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "#2e7d32" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ backgroundColor: "#a5d6a7", marginBottom: 2 }} />

        <List>
          {[
            {
              label: "Profile",
              icon: <AccountCircleIcon />,
              action: () => handleNavigate("/profile"),
            },
            {
              label: "Contact",
              icon: <ContactMailIcon />,
              action: () => handleNavigate("/contact"),
            },
            {
              label: "Logout",
              icon: <LogoutIcon />,
              action: handleLogout,
            },
          ].map((item, index) => (
            <ListItem
              component="button"
              key={index}
              onClick={item.action}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#dcedc8",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#2e7d32" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>

          ))}
        </List>
      </Drawer>
    </>
  );
};

export default ButtonAppBar;

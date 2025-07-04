import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import ThemeToggleButton from "../context/ThemeToggle";
import { useTheme } from "@mui/material"; // ✅

interface ButtonAppBarProps {
  className?: string;
}

const ButtonAppBar: React.FC<ButtonAppBarProps> = ({ className = "" }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme(); // ✅
  const isDark = theme.palette.mode === "dark"; // ✅

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
  ];

  return (
    <>
      <AppBar
        position="fixed"
        className={className}
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #004d40 0%, #00695c 50%, #00796b 100%)"
            : "linear-gradient(135deg, #4db6ac 0%, #26a69a 50%, #009688 100%)",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
                          <ThemeToggleButton />

          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
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
          {drawerItems.map((item, index) => (
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

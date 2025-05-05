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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // ✅ עגלת קניות
import { useRouter } from "next/router";

const ButtonAppBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
      <AppBar position="static" sx={{ backgroundColor: "#1f2937" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* צד שמאל: תפריט + עגלת קניות */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => router.push("/cart")}
              sx={{
                ":hover": { backgroundColor: "#374151" },
                transition: "background-color 0.3s ease",
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>

          {/* כותרת במרכז */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <button color="inherit" onClick={() => router.push("/")}>
              Pharmacy System
            </button>
          </Typography>

          {/* צד ימין: כפתורי ניווט */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => router.push("/appointments")}
              sx={{
                ":hover": { backgroundColor: "#374151" },
                transition: "background-color 0.3s ease",
              }}
            >
              Appointments
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/payments")}
              sx={{
                ":hover": { backgroundColor: "#374151" },
                transition: "background-color 0.3s ease",
              }}
            >
              Payments
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/medicalRecords")}
              sx={{
                ":hover": { backgroundColor: "#374151" },
                transition: "background-color 0.3s ease",
              }}
            >
              Medical Records
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/medicalEquipment")}
              sx={{
                ":hover": { backgroundColor: "#374151" },
                transition: "background-color 0.3s ease",
              }}
            >
              Medical Equipment
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        PaperProps={{
          sx: {
            backgroundColor: "#1f2937",
            color: "white",
            width: 260,
            transition: "all 0.3s ease",
            borderRight: "1px solid #374151",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ backgroundColor: "gray", marginBottom: 2 }} />

        <List>
          <ListItem button onClick={() => handleNavigate("/profile")}>
            <ListItemIcon sx={{ color: "white" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button onClick={() => handleNavigate("/contact")}>
            <ListItemIcon sx={{ color: "white" }}>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>

          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default ButtonAppBar;
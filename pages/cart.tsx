import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  IconButton,
  Button,
  Grid,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const router = useRouter();

  type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCartItems");
    if (saved) {
      try {
        const parsed: Item[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((savedItem) =>
            cartItems.some((cartItem) => cartItem.id === savedItem.id)
          );
          setSelectedItems(filtered);
        }
      } catch (e) {
        console.error("Failed to parse selected items:", e);
      }
    } else {
      setSelectedItems([]);
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const toggleItemSelection = (item: Item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isItemSelected = (id: string) => {
    return selectedItems.some((i) => i.id === id);
  };

 const getSelectedTotal = () =>
  selectedItems.reduce((sum, selectedItem) => {
    const currentItem = cartItems.find((i) => i.id === selectedItem.id);
    return currentItem ? sum + currentItem.price * currentItem.quantity : sum;
  }, 0);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: 10,
          flexGrow: 1,
          maxWidth: "80%",
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#01579b", textAlign: { xs: "center", md: "left" } }}
          gutterBottom
        >
          🛒 Your Shopping Cart
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#424242",
            mb: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Review your items and proceed to secure checkout.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {cartItems.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6" fontWeight="medium" color="textPrimary">
              Your shopping cart is currently empty.
            </Typography>
            <Typography variant="body1" mt={1} color="textSecondary">
              Looks like you haven’t added any products yet.
              <br />
              Start browsing and add your favorite items to your cart!
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 4,
                py: 1.5,
                bgcolor: "#0288d1",
                color: "white",
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": { bgcolor: "#0277bd" },
              }}
              onClick={() => router.push("/")}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 4,
                    backgroundColor: "#ffffff",
                    border: "1px solid #bbdefb",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Checkbox
                      checked={isItemSelected(item.id)}
                      onChange={() => toggleItemSelection(item)}
                      sx={{ color: "#0288d1" }}
                    />
                    
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#0288d1", mt: 0.5 }}
                      >
                        ${item.price.toFixed(2)} per unit
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Product ID: #{item.id}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: { xs: 2, sm: 0 },
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        sx={{
                          minWidth: 32,
                          color: "black",
                          borderColor: "#0288d1",
                          "&:hover": {
                            backgroundColor: "#e1f5fe",
                          },
                        }}
                      >
                        −
                      </Button>
                      <Typography fontWeight="bold">{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => increaseQuantity(item.id)}
                        sx={{
                          minWidth: 32,
                          color: "black",
                          borderColor: "#0288d1",
                          "&:hover": {
                            backgroundColor: "#e1f5fe",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>

                    <Typography fontWeight="bold" sx={{ color: "#00796b" }}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </Typography>

                    <IconButton
                      onClick={() => {
                        removeFromCart(item.id);
                        setSelectedItems((prev) =>
                          prev.filter((i) => i.id !== item.id)
                        );
                      }}
                      sx={{
                        bgcolor: "#ffe0e0",
                        color: "#c62828",
                        "&:hover": {
                          bgcolor: "#ffcccc",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Divider sx={{ my: 3 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    clearCart();
                    setSelectedItems([]);
                    localStorage.removeItem("selectedCartItems");
                  }}
                  sx={{
                    bgcolor: "#ef5350",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "#e53935",
                    },
                  }}
                >
                  Remove All Items
                </Button>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="gray" variant="h6">
                    Total to pay:
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#2e7d32" }}
                  >
                    ${getTotalPrice().toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    const selectedForCheckout = cartItems.filter((item) =>
                      selectedItems.some((i) => i.id === item.id)
                    );
                    localStorage.setItem(
                      "itemsToCheckout",
                      JSON.stringify(selectedForCheckout)
                    );
                    router.push("/payments");
                  }}
                  sx={{
                    bgcolor: selectedItems.length === 0 ? "#90caf9" : "#0288d1",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    px: 5,
                    py: 1.5,
                    "&:hover": {
                      bgcolor:
                        selectedItems.length === 0 ? "#90caf9" : "#0277bd",
                    },
                  }}
                >
                  Continue to Checkout
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default CartPage;

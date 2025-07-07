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
  Badge,
  Tooltip,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
  } = useCart();
  const router = useRouter();
  const theme = useTheme();

  type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isHoveringCheckout, setIsHoveringCheckout] = useState(false);

  // Load selected items from localStorage
  useEffect(() => {
  const saved = localStorage.getItem("selectedCartItems");
  if (saved) {
    try {
      const parsed: Item[] = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((savedItem) =>
          cartItems.some((cartItem) => cartItem.id === savedItem.id)
        );
        setSelectedItems(filtered.length > 0 ? filtered : cartItems);
      } else {
        setSelectedItems(cartItems);
      }
    } catch (e) {
      console.error("Failed to parse selected items:", e);
      setSelectedItems(cartItems);
    }
  } else {
    setSelectedItems(cartItems);
  }
}, [cartItems]);


  // Save selected items to localStorage
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
        minHeight: "70vh",
        py: 10,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to bottom, #121212, #1e1e1e)"
            : "linear-gradient(to bottom, #f5f5f5, #ffffff)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: 4,
          flexGrow: 1,
          maxWidth: "80%",
          mx: "auto",
          width: "100%",
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: theme.palette.mode === "dark" ? "#81d4fa" : "#01579b",
              textAlign: { xs: "center", md: "left" },
            }}
            gutterBottom
          >
            🛒 Your Shopping Cart
          </Typography>
          
          <Badge 
            badgeContent={getTotalItems()} 
            color="primary"
            sx={{ ml: 2 }}
          >
            <ShoppingCartCheckoutIcon 
              sx={{ 
                fontSize: 32,
                color: theme.palette.mode === "dark" ? "#81d4fa" : "#0288d1" 
              }} 
            />
          </Badge>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.mode === "dark" ? "#ccc" : "#424242",
            mb: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {cartItems.length > 0 
            ? `You have ${getTotalItems()} item${getTotalItems() !== 1 ? 's' : ''} in your cart` 
            : "Review your items and proceed to secure checkout."}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {cartItems.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6" fontWeight="medium" color="textPrimary">
              Your shopping cart is currently empty.
            </Typography>
            <Typography
              variant="body1"
              mt={1}
              color={theme.palette.mode === "dark" ? "#aaa" : "textSecondary"}
            >
              Looks like you haven't added any products yet.
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
                boxShadow: theme.shadows[4],
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
                    boxShadow: theme.shadows[2],
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                    border: `1px solid ${
                      theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
                    }`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[6],
                      borderColor: theme.palette.mode === "dark" ? "#4fc3f7" : "#0288d1",
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
                    <Tooltip 
                      title={isItemSelected(item.id) ? "Deselect item" : "Select item"} 
                      placement="top"
                      TransitionComponent={Zoom}
                    >
                      <Checkbox
                        checked={isItemSelected(item.id)}
                        onChange={() => toggleItemSelection(item)}
                        sx={{
                          color: "#0288d1",
                          '&.Mui-checked': {
                            color: "#0288d1",
                          },
                        }}
                      />
                    </Tooltip>
                    
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        objectFit: "cover",
                        border: `1px solid ${
                          theme.palette.mode === "dark" ? "#444" : "#e0e0e0"
                        }`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="textPrimary"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: theme.palette.mode === "dark" ? "#81d4fa" : "#0288d1", 
                          mt: 0.5 
                        }}
                      >
                        ${item.price.toFixed(2)} per unit
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="textSecondary"
                        sx={{ display: "block", mt: 0.5 }}
                      >
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
                          color: theme.palette.mode === "dark" ? "#fff" : "text.primary",
                          borderColor: "#0288d1",
                          "&:hover": {
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(0, 77, 96, 0.5)"
                                : "rgba(2, 136, 209, 0.1)",
                          },
                          "&:disabled": {
                            borderColor: theme.palette.mode === "dark" ? "#555" : "#e0e0e0",
                          },
                        }}
                      >
                        −
                      </Button>
                      <Typography fontWeight="bold">
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => increaseQuantity(item.id)}
                        sx={{
                          minWidth: 32,
                          color: theme.palette.mode === "dark" ? "#fff" : "text.primary",
                          borderColor: "#0288d1",
                          "&:hover": {
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(0, 77, 96, 0.5)"
                                : "rgba(2, 136, 209, 0.1)",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>

                    <Typography
                      fontWeight="bold"
                      sx={{
                        color: theme.palette.mode === "dark" ? "#80cbc4" : "#00796b",
                        minWidth: "80px",
                        textAlign: "center",
                      }}
                    >
                      ${(item.quantity * item.price).toFixed(2)}
                    </Typography>

                    <Tooltip title="Remove item" placement="top" TransitionComponent={Zoom}>
                      <IconButton
                        onClick={() => {
                          removeFromCart(item.id);
                          setSelectedItems((prev) =>
                            prev.filter((i) => i.id !== item.id)
                          );
                        }}
                        sx={{
                          bgcolor:
                            theme.palette.mode === "dark" ? "rgba(198, 40, 40, 0.2)" : "rgba(198, 40, 40, 0.1)",
                          color: "#c62828",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor:
                              theme.palette.mode === "dark" ? "rgba(198, 40, 40, 0.4)" : "rgba(198, 40, 40, 0.2)",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
                  gap: 3,
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(2, 136, 209, 0.05)",
                  border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(2, 136, 209, 0.1)"}`,
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
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: theme.shadows[2],
                  }}
                >
                  Remove All Items
                </Button>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    variant="h6" 
                    color={theme.palette.mode === "dark" ? "#ccc" : "text.secondary"}
                  >
                    {selectedItems.length > 0 
                      ? `Selected items total:` 
                      : `Cart total:`}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#a5d6a7" : "#2e7d32",
                    }}
                  >
                    ${selectedItems.length > 0 
                      ? getSelectedTotal().toFixed(2) 
                      : getTotalPrice().toFixed(2)}
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
                  onMouseEnter={() => setIsHoveringCheckout(true)}
                  onMouseLeave={() => setIsHoveringCheckout(false)}
                  sx={{
                    bgcolor:
                      selectedItems.length === 0
                        ? theme.palette.mode === "dark" ? "#555" : "#e0e0e0"
                        : "#0288d1",
                    color: selectedItems.length === 0 
                      ? theme.palette.mode === "dark" ? "#aaa" : "#757575"
                      : "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    px: 5,
                    py: 1.5,
                    "&:hover": {
                      bgcolor:
                        selectedItems.length === 0
                          ? theme.palette.mode === "dark" ? "#555" : "#e0e0e0"
                          : "#0277bd",
                      transform: selectedItems.length > 0 ? "translateY(-2px)" : "none",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: selectedItems.length > 0 ? theme.shadows[4] : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isHoveringCheckout && selectedItems.length > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)",
                        animation: "shimmer 2s infinite",
                        "@keyframes shimmer": {
                          "0%": { transform: "translateX(-100%)" },
                          "100%": { transform: "translateX(100%)" },
                        },
                      }}
                    />
                  )}
                  Continue to Checkout
                  {selectedItems.length > 0 && (
                    <Badge
                      badgeContent={selectedItems.reduce((sum, item) => sum + (cartItems.find(i => i.id === item.id)?.quantity || 0), 0)}
                      color="secondary"
                      sx={{ ml: 2 }}
                    />
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
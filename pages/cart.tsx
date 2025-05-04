import React, { useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingCartContext } from "../context/shoppingCartContext";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ShoppingCartContext);
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ px: { xs: 2, md: 6 }, py: 4, flexGrow: 1 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          sx={{ color: "black", textAlign: { xs: "center", md: "left" } }}
        >
          🛒 Your Shopping Cart
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {cartItems.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6" fontWeight="medium" sx={{ color: "black" }}>
              Your shopping cart is currently empty.
            </Typography>
            <Typography variant="body1" mt={1} sx={{ color: "black" }}>
              Looks like you haven’t added any products yet.
              <br />
              Start browsing and add your favorite items to your cart!
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, px: 4, py: 1, borderRadius: 2, bgcolor: "#0288d1", "&:hover": { bgcolor: "#0277bd" } }}
              onClick={() => router.push("/")}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 4,
                    backgroundColor: "#ffffff",
                    border: "1px solid #bbdefb",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1976d2", mt: 0.5 }}>
                      ${item.price.toFixed(2)} per unit
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "flex-end" },
                      gap: 2,
                      mt: { xs: 2, sm: 0 },
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        sx={{
                          minWidth: 32,
                          color: "black",
                          borderColor: "black",
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                            borderColor: "#0b3c91",
                          },
                        }}
                      >
                        −
                      </Button>
                      <Typography fontWeight="bold" sx={{ color: "black" }}>
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => increaseQuantity(item.id)}
                        sx={{
                          minWidth: 32,
                          color: "black",
                          borderColor: "black",
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                            borderColor: "#0b3c91",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>

                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#1565c0" }}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </Typography>

                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        bgcolor: "#ffebee",
                        color: "#c62828",
                        "&:hover": {
                          bgcolor: "#ffcdd2",
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
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "black" }}>
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
                  ${getTotalPrice().toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right", mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#0288d1",
                    "&:hover": { bgcolor: "#0277bd" },
                    borderRadius: 2,
                    px: 4,
                  }}
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout
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

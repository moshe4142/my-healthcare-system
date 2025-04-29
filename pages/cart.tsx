import React, { useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingCartContext } from "../context/shoppingCartContext"; // נתיב לקובץ הקונטקסט שלך

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useContext(ShoppingCartContext);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} × $${item.price.toFixed(2)}`}
                />
                <Typography variant="body1">
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${getTotalPrice().toFixed(2)}</Typography>
          </Box>

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button variant="contained" color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;

// PaymentsPage.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { useCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";

const PaymentsPage = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [paypalUsername, setPaypalUsername] = useState("");
  const [visaCardholder, setVisaCardholder] = useState("");
  const [mastercardCode, setMastercardCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { cartItems, getTotalPrice } = useCart();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("paymentData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPaymentMethod(parsed.paymentMethod || "");
      setCardNumber(parsed.cardNumber || "");
      setExpiryDate(parsed.expiryDate || "");
      setCvv(parsed.cvv || "");
      setEmail(parsed.email || "");
      setPaypalUsername(parsed.paypalUsername || "");
      setVisaCardholder(parsed.visaCardholder || "");
      setMastercardCode(parsed.mastercardCode || "");
    }
  }, []);

  useEffect(() => {
    const savedSelections = localStorage.getItem("selectedCartItems");
    if (savedSelections) {
      setSelectedItems(JSON.parse(savedSelections));
    }
  }, []);

  const validateForm = () => {
    if (!paymentMethod || !cardNumber || !expiryDate || !cvv || !email) {
      setError("Please fill out all payment fields.");
      return false;
    }
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
      setError("Invalid card number format.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError("Invalid expiration format. Use MM/YY.");
      return false;
    }
    if (cvv.length < 3 || cvv.length > 4) {
      setError("Invalid CVV.");
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Invalid email address.");
      return false;
    }

    if (paymentMethod === "paypal" && !paypalUsername) {
      setError("Please enter your PayPal username.");
      return false;
    }
    if (paymentMethod === "visa" && !visaCardholder) {
      setError("Please enter the cardholder name.");
      return false;
    }
    if (paymentMethod === "mastercard" && !mastercardCode) {
      setError("Please enter the secure code.");
      return false;
    }

    return true;
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const paymentData = {
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      email,
      paypalUsername,
      visaCardholder,
      mastercardCode,
    };

    
    // מסוכן מאוד מאוד מאוד לא לשכוח למחוק את השורה הזאת!!!!!!!!!!!!!!!!!!!!!!
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    /////////


    localStorage.removeItem("cartItems");
    setSuccess(true);
    setError("");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, maxWidth: 1000, mx: "auto", borderRadius: 4 }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💳 Payment Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🛒 Selected Items ({selectedItems.length} items)
            </Typography>
            <Grid container spacing={2}>
              {selectedItems.length === 0 ? (
                <Typography variant="body1">No items selected.</Typography>
              ) : (
                selectedItems.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ display: "flex", p: 1 }}>
                      <CardMedia
                        component="img"
                        image={item.imageUrl}
                        alt="Product"
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          $
                          {typeof item.price === "number"
                            ? item.price.toFixed(2)
                            : "0.00"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>

            <Typography variant="h6" mt={3} fontWeight="bold">
              Total Price: ${getTotalPrice().toFixed(2)}
            </Typography>

            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => router.push("/cart")}
            >
              ← Back to Cart
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            {success ? (
              <Typography color="success.main" fontWeight="bold">
                ✅ Payment made successfully! Redirecting to the home page...
              </Typography>
            ) : (
              <form onSubmit={handleSavePayment}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        value={paymentMethod}
                        label="Payment Method"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <MenuItem value="visa">
                          <Box display="flex" alignItems="center" gap={1}>
                            <FaCcVisa size={24} />
                            Visa
                          </Box>
                        </MenuItem>
                        <MenuItem value="mastercard">
                          <Box display="flex" alignItems="center" gap={1}>
                            <FaCcMastercard size={24} />
                            MasterCard
                          </Box>
                        </MenuItem>
                        <MenuItem value="paypal">
                          <Box display="flex" alignItems="center" gap={1}>
                            <FaPaypal size={24} />
                            PayPal
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {paymentMethod === "visa" && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Cardholder Name"
                        value={visaCardholder}
                        onChange={(e) => setVisaCardholder(e.target.value)}
                      />
                    </Grid>
                  )}

                  {paymentMethod === "mastercard" && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Secure Code"
                        value={mastercardCode}
                        onChange={(e) => setMastercardCode(e.target.value)}
                      />
                    </Grid>
                  )}

                  {paymentMethod === "paypal" && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="PayPal Username"
                        value={paypalUsername}
                        onChange={(e) => setPaypalUsername(e.target.value)}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      label="Card Number"
                      fullWidth
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Expiry Date"
                      fullWidth
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="CVV"
                      fullWidth
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {error && (
                    <Grid item xs={12}>
                      <Typography color="error">{error}</Typography>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Pay Now
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PaymentsPage;

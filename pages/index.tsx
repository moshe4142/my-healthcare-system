import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  LocalHospital,
  Favorite,
  EmojiPeople,
} from "@mui/icons-material";

const HomePage = () => {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: "Aspirin",
      description: "Effective pain relief and anti-inflammatory.",
      imageUrl: "https://placehold.co/300x200?text=Aspirin",
      price: "10.99",
    },
    {
      id: 2,
      name: "Cough Syrup",
      description: "Fast-acting cough and cold relief syrup.",
      imageUrl: "https://placehold.co/300x200?text=Cough+Syrup",
      price: "8.49",
    },
    {
      id: 3,
      name: "Antibiotics",
      description: "Prescription antibiotics for infections.",
      imageUrl: "https://placehold.co/300x200?text=Antibiotics",
      price: "15.99",
    },
  ];

  const navigateToProductPage = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "60px 20px 40px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 800, color: "#1976d2", mb: 2 }}>
          Welcome to the Pharmacy System
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          Trusted Healthcare Solutions for Your Family
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 5, px: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search for medicines, supplements, products..."
          sx={{
            width: { xs: "100%", sm: "60%", md: "50%" },
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
        <IconButton
          sx={{
            ml: 2,
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          <Search />
        </IconButton>
      </Box>

      {/* Featured Products */}
      <Box sx={{ px: 5 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 5,
            fontWeight: 700,
            color: "#0d47a1",
          }}
        >
          Popular Products
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  maxWidth: 350,
                  mx: "auto",
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={product.imageUrl}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#0d47a1" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", mt: 1, mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigateToProductPage(product.id)}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#1976d2",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          backgroundColor: "#e3f2fd",
          py: 6,
          mt: 8,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#0d47a1", mb: 4 }}
        >
          Why Choose Us?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Favorite sx={{ fontSize: 50, color: "#ef5350" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mt: 2, color: "black" }}
            >
              Quality Care
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
              We ensure the highest quality healthcare products and services.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <LocalHospital sx={{ fontSize: 50, color: "#66bb6a" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mt: 2, color: "black" }}
            >
              Certified Pharmacists
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
              Our pharmacists are certified professionals ready to assist you.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <EmojiPeople sx={{ fontSize: 50, color: "#42a5f5" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mt: 2, color: "black" }}
            >
              Customer Focused
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
              We value our customers and prioritize their health and satisfaction.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* About Section */}
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#ffffff",
          py: 6,
          px: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#0d47a1", mb: 3 }}
        >
          About Our Pharmacy
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#555", maxWidth: "800px", mx: "auto" }}
        >
          Our pharmacy is committed to providing high-quality healthcare products,
          personalized customer service, and expert guidance. Whether you need
          prescription medications, over-the-counter remedies, or professional
          advice, we are here to support your health journey every step of the way.
        </Typography>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#0d47a1",
          color: "white",
          mt: "auto",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          Contact us: pharmacy@example.com | +1 (234) 567-890
        </Typography>
        <Box>
          <IconButton color="inherit" sx={{ mx: 1 }}>
            <ShoppingCart />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          © 2025 Pharmacy System | All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
export async function getServerSideProps() {
  // Fetch any necessary data here
  return {
    props: {}, // Pass the data as props to the component
  };
}
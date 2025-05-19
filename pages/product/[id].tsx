import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import { ShoppingCart, Favorite, Star } from "@mui/icons-material";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  // Mock product data
  const product = {
    id: productId,
    name: "Luxury Vitamin C Serum",
    description:
      "This premium Vitamin C Serum is packed with antioxidants to rejuvenate and brighten your skin. Ideal for daily use.",
    imageUrl: "https://placehold.co/500x500?text=Serum",
    price: "120.00",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Aloe Vera"],
    benefits: [
      "Brightens skin",
      "Reduces wrinkles",
      "Moisturizes deeply",
      "Anti-aging properties",
    ],
    reviews: 4.8,
    reviewCount: 320,
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
          minHeight: "100vh",
          py: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            width: "100%",
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Product Header */}
          <Box
            sx={{
              padding: 3,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="250"
                  image={product.imageUrl}
                  sx={{
                    borderRadius: 2,
                    objectFit: "contain",
                    boxShadow: 3,
                    width: "100%",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={7}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0d47a1" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                  {product.description}
                </Typography>

                {/* Price and Reviews */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1976d2",
                      marginRight: 2,
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Star sx={{ color: "#ffb300", fontSize: 18 }} />
                    <Typography sx={{ ml: 1 }}>
                      {product.reviews} ({product.reviewCount} reviews)
                    </Typography>
                  </Box>
                </Box>

                {/* Add to Cart and Wishlist Buttons */}
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      padding: "8px",
                      backgroundColor: "#1976d2",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <IconButton
                      sx={{
                        backgroundColor: "#e91e63",
                        color: "white",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#d81b60" },
                      }}
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#115293" },
                      }}
                    >
                      <ShoppingCart />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Product Details */}
          <Box
            sx={{
              padding: 3,
              backgroundColor: "white",
              marginTop: 4,
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0d47a1" }}>
              Key Ingredients
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {product.ingredients.map((ingredient, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Card sx={{ borderRadius: 2, boxShadow: 2, padding: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#1976d2" }}>
                      {ingredient}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0d47a1" }}>
              Benefits
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {product.benefits.map((benefit, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Card sx={{ borderRadius: 2, boxShadow: 2, padding: 1 }}>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      {benefit}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default ProductPage;

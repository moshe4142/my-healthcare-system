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
  import { useCart } from "../../context/shoppingCartContext"; // 👈 חדש

  const ProductPage = () => {
    const router = useRouter();
    const { addToCart } = useCart(); // 👈 חדש
    const { productId } = router.query;

    // Mock product data
    const product = {
      id: Number(productId),
      name: "Luxury Vitamin C Serum",
      description:
        "This premium Vitamin C Serum is packed with antioxidants to rejuvenate and brighten your skin. Ideal for daily use.",
      imageUrl: "https://placehold.co/500x500?text=Serum",
      price: 120.0,
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

    const handleAddToCart = () => {
      addToCart({
        id: product.id.toString(), // ✅ עכשיו זה string
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
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
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#0d47a1" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                    {product.description}
                  </Typography>

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
                      onClick={handleAddToCart} // 👈 חדש
                    >
                      Add to Cart
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
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
                        onClick={handleAddToCart} // 👈 גם פה אם אתה רוצה קיצור
                      >
                        <ShoppingCart />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* שאר הדף... */}
          </Box>
        </Box>

        <Footer />
      </>
    );
  };

  export default ProductPage;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Container,
  Stack,
  Divider,
  Card,
  CardContent,
  Badge,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Skeleton,
} from "@mui/material";
import {
  ShoppingCart,
  Star,
  CheckCircleOutline,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  ThumbUp,
  Info,
} from "@mui/icons-material";
import { useCart } from "../../context/shoppingCartContext";
import { useTheme } from "@mui/material/styles";
interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  ingredients?: string[];
  benefits?: string[];
  reviews?: number;
  reviewCount?: number;
}

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { addToCart } = useCart();

  const theme = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => setProduct(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 10px 40px rgba(0, 188, 212, 0.15), 0 4px 15px rgba(0, 150, 136, 0.1)",
          }}
        >
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            טוען מוצר...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 6,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 10px 40px rgba(0, 188, 212, 0.15), 0 4px 15px rgba(0, 150, 136, 0.1)",
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            המוצר לא נמצא
          </Typography>
          <Typography variant="body1" color="text.secondary">
            לצערנו, המוצר שחיפשת אינו זמין
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "70vh",
          paddingTop: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating background shadows */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              theme.palette.mode === "light"
                ? "radial-gradient(circle, rgba(0, 188, 212, 0.08) 0%, rgba(0, 188, 212, 0.02) 50%, transparent 100%)"
                : "radial-gradient(circle, rgba(0, 188, 212, 0.03) 0%, rgba(0, 188, 212, 0.01) 50%, transparent 100%)",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              theme.palette.mode === "light"
                ? "radial-gradient(circle, rgba(0, 150, 136, 0.06) 0%, rgba(0, 150, 136, 0.01) 50%, transparent 100%)"
                : "radial-gradient(circle, rgba(0, 150, 136, 0.03) 0%, rgba(0, 150, 136, 0.01) 50%, transparent 100%)",
            filter: "blur(60px)",
            animation: "float 12s ease-in-out infinite reverse",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "20%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              theme.palette.mode === "light"
                ? "radial-gradient(circle, rgba(79, 172, 254, 0.05) 0%, rgba(79, 172, 254, 0.01) 50%, transparent 100%)"
                : "radial-gradient(circle, rgba(79, 172, 254, 0.02) 0%, rgba(79, 172, 254, 0.005) 50%, transparent 100%)",
            filter: "blur(50px)",
            animation: "float 10s ease-in-out infinite",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{ py: { xs: 4, md: 8 }, position: "relative", zIndex: 1 }}
        >
          <Fade in={true} timeout={800}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 10px 40px rgba(0, 188, 212, 0.15), 0 4px 15px rgba(0, 150, 136, 0.1)"
                    : "0 10px 40px rgba(0, 188, 212, 0.08), 0 4px 15px rgba(0, 150, 136, 0.05)",
                border: "1px solid rgba(0, 188, 212, 0.08)",
              }}
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ position: "relative", height: { xs: 400, md: 600 } }}
                  >
                    {!imageLoaded && (
                      <Skeleton
                        variant="rectangular"
                        height="100%"
                        animation="wave"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      image={product.imageUrl}
                      alt={product.name}
                      onLoad={() => setImageLoaded(true)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: imageLoaded ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="הוסף למועדפים">
                        <IconButton
                          sx={{ bgcolor: "background.paper", boxShadow: 2 }}
                        >
                          <FavoriteBorder />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="שתף">
                        <IconButton
                          sx={{ bgcolor: "background.paper", boxShadow: 2 }}
                        >
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <CardContent sx={{ p: { xs: 3, md: 5 }, height: "100%" }}>
                    <Stack spacing={3} height="100%">
                      <Box>
                        <Typography
                          variant="h3"
                          fontWeight={700}
                          sx={{
                            background:
                              "linear-gradient(45deg, #00bcd4, #009688)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                            fontSize: { xs: "2rem", md: "2.5rem" },
                          }}
                        >
                          {product.name}
                        </Typography>
                        {product.reviews && product.reviewCount && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mr: 2,
                              }}
                            >
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  sx={{
                                    color:
                                      i < Math.floor(product.reviews ?? 0)
                                        ? "#ffb300"
                                        : "#e0e0e0",
                                    fontSize: "1.2rem",
                                  }}
                                />
                              ))}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {product.reviews} ({product.reviewCount} ביקורות)
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.8,
                          fontSize: "1.1rem",
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Box>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          sx={{
                            color: "#2e7d32",
                            display: "flex",
                            alignItems: "baseline",
                            gap: 1,
                          }}
                        >
                          ${product.price.toFixed(2)}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ${(product.price * 1.2).toFixed(2)}
                          </Typography>
                        </Typography>
                        <Chip
                          label="20% sale"
                          color="error"
                          size="small"
                          sx={{ mt: 1, fontWeight: 600 }}
                        />
                      </Box>

                      <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                        <Chip
                          icon={<LocalShipping />}
                          label="Free shipping"
                          variant="outlined"
                          color="primary"
                          size="small"
                        />
                        <Chip
                          icon={<Security />}
                          label="Secure purchase"
                          variant="outlined"
                          color="success"
                          size="small"
                        />
                      </Stack>

                      <Box sx={{ mt: "auto" }}>
                        <Button
                          onClick={handleAddToCart}
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={<ShoppingCart />}
                          sx={{
                            py: 2,
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            borderRadius: 3,
                            background:
                              "linear-gradient(45deg, #00bcd4, #009688)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #00acc1, #00897b)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(0, 188, 212, 0.4)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          Add To Cart
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Fade>
        </Container>
      </Box>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
      `}</style>
    </>
  );
};

export default ProductPage;

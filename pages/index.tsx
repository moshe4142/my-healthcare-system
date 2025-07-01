"use client";

import { useCart } from "../context/shoppingCartContext";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Container,
  Chip,
  Stack,
  Avatar,
  Fade,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  ShoppingCart,
  Visibility,
  Search,
  FavoriteBorder,
  Star,
  LocalOffer,
} from "@mui/icons-material";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const HomePage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadingStates, setImageLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const productsPerPage = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);

        // Preload images and set loading states
        const initialStates: { [key: number]: boolean } = {};
        data.forEach((product: Product) => {
          initialStates[product.id] = false;

          const img = new Image();
          img.src = product.imageUrl;

          if (img.complete) {
            initialStates[product.id] = true;
          } else {
            img.onload = () => {
              setImageLoadingStates((prev) => ({
                ...prev,
                [product.id]: true,
              }));
            };
          }
        });
        setImageLoadingStates(initialStates);

        setImageLoadingStates(initialStates);
      } catch (err: any) {
        setError(err.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleImageLoad = (productId: number) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / productsPerPage),
    [filteredProducts]
  );

  const paginatedProducts = useMemo(
    () =>
      viewAll
        ? filteredProducts
        : filteredProducts.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          ),
    [filteredProducts, currentPage, viewAll]
  );

  const navigateToProductPage = useCallback(
    (productId: number) => {
      router.push(`/product/${productId}`);
    },
    [router]
  );

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 550,
      behavior: "smooth",
    });
  }, []);

  const toggleViewAll = useCallback(() => {
    setViewAll(!viewAll);
    if (viewAll) {
      setCurrentPage(1);
      scrollToTop();
    }
    scrollToTop();
  }, [viewAll]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
      });
      setAddedProductName(product.name);
      setShowAlert(true);
    },
    [addToCart]
  );

  const handleCloseAlert = useCallback(() => {
    setShowAlert(false);
  }, []);

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        Error loading products: {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft Turquoise Shadow Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 188, 212, 0.06) 0%, rgba(0, 188, 212, 0.01) 50%, transparent 100%)",
          filter: "blur(80px)",
          animation: "float 15s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -300,
          left: -300,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 150, 136, 0.04) 0%, rgba(0, 150, 136, 0.01) 50%, transparent 100%)",
          filter: "blur(100px)",
          animation: "float 20s ease-in-out infinite reverse",
        }}
      />

      {/* Header Section */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(45deg, #00bcd4, #009688)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Welcome to the Pharmacy System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              fontSize: "1.2rem",
              fontWeight: 400,
            }}
          >
            Trusted health solutions for your family
          </Typography>
        </Box>

        {/* Search Section */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "60%", md: "50%" },
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search medications, supplements, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0, 188, 212, 0.1)",
                border: "1px solid rgba(0, 188, 212, 0.08)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  "& fieldset": {
                    borderColor: "rgba(0, 188, 212, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 188, 212, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00bcd4",
                  },
                },
              }}
              InputProps={{
                startAdornment: <Search sx={{ color: "#00bcd4", mr: 1 }} />,
              }}
            />
          </Box>
        </Box>

        {/* Products Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 700,
              background: "linear-gradient(45deg, #00bcd4, #009688)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Popular Products
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {loading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      maxWidth: 350,
                      mx: "auto",
                      borderRadius: 3,
                      boxShadow: "0 8px 32px rgba(0, 188, 212, 0.12)",
                    }}
                  >
                    <Skeleton variant="rectangular" height={220} />
                    <CardContent>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.5rem", mb: 1 }}
                      />
                      <Skeleton variant="text" sx={{ mb: 2 }} />
                      <Skeleton variant="text" sx={{ mb: 2, width: "60%" }} />
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" height={36} />
                        <Skeleton variant="rectangular" height={36} />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Fade in={true} timeout={600 + index * 200}>
                    <Card
                      sx={{
                        maxWidth: 350,
                        mx: "auto",
                        borderRadius: 3,
                        backgroundColor: "#ffffff",
                        boxShadow:
                          "0 8px 32px rgba(0, 188, 212, 0.12), 0 4px 12px rgba(0, 150, 136, 0.08)",
                        border: "1px solid rgba(0, 188, 212, 0.06)",
                        transition:
                          "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow:
                            "0 20px 40px rgba(0, 188, 212, 0.2), 0 8px 20px rgba(0, 150, 136, 0.15)",
                          border: "1px solid rgba(0, 188, 212, 0.15)",
                        },
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Product Image with Loading State */}
                      <Box sx={{ position: "relative", height: 220 }}>
                        {!imageLoadingStates[product.id] && (
                          <Skeleton
                            variant="rectangular"
                            height={220}
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
                          alt={product.name}
                          image={product.imageUrl}
                          onLoad={() => handleImageLoad(product.id)}
                          sx={{
                            height: 220,
                            objectFit: "cover",
                            opacity: imageLoadingStates[product.id] ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                          }}
                        />

                        {/* Floating Elements */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.95)",
                              boxShadow: "0 4px 12px rgba(0, 188, 212, 0.2)",
                              "&:hover": {
                                bgcolor: "white",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <FavoriteBorder
                              sx={{ fontSize: "1rem", color: "#00bcd4" }}
                            />
                          </IconButton>
                        </Box>

                        {/* Sale Badge */}
                        <Chip
                          label="Sale"
                          color="error"
                          size="small"
                          icon={<LocalOffer />}
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        {/* Product Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#333",
                            mb: 1.5,
                            fontSize: "1.1rem",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Rating */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              sx={{
                                color: i < 4 ? "#ffb300" : "#e0e0e0",
                                fontSize: "1rem",
                              }}
                            />
                          ))}
                          <Typography
                            variant="caption"
                            sx={{ ml: 1, color: "#666" }}
                          >
                            (4.0)
                          </Typography>
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            mb: 2,
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.description}
                        </Typography>

                        {/* Price */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 1,
                            mb: 3,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#2e7d32",
                              fontSize: "1.3rem",
                            }}
                          >
                            ${product.price.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#999",
                              textDecoration: "line-through",
                              fontSize: "0.9rem",
                            }}
                          >
                            ${(product.price * 1.2).toFixed(2)}
                          </Typography>
                        </Box>

                        {/* Action Buttons */}
                        <Stack spacing={1.5}>
                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<Visibility />}
                            onClick={() => navigateToProductPage(product.id)}
                            sx={{
                              borderColor: "#00bcd4",
                              color: "#00bcd4",
                              fontWeight: 600,
                              borderRadius: 2,
                              "&:hover": {
                                borderColor: "#00acc1",
                                backgroundColor: "rgba(0, 188, 212, 0.04)",
                                transform: "translateY(-1px)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            View Product
                          </Button>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<ShoppingCart />}
                            onClick={() => handleAddToCart(product)}
                            sx={{
                              background:
                                "linear-gradient(45deg, #00bcd4, #009688)",
                              fontWeight: 600,
                              borderRadius: 2,
                              "&:hover": {
                                background:
                                  "linear-gradient(45deg, #00acc1, #00897b)",
                                transform: "translateY(-1px)",
                                boxShadow: "0 6px 20px rgba(0, 188, 212, 0.4)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography sx={{ color: "#888", fontSize: "1.1rem" }}>
                    No products found for "{searchTerm}"
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Pagination */}
          {!viewAll && totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Stack direction="row" spacing={1}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    variant={
                      currentPage === index + 1 ? "contained" : "outlined"
                    }
                    sx={{
                      minWidth: 48,
                      height: 48,
                      borderRadius: 2,
                      ...(currentPage === index + 1
                        ? {
                            background:
                              "linear-gradient(45deg, #00bcd4, #009688)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #00acc1, #00897b)",
                            },
                          }
                        : {
                            borderColor: "#00bcd4",
                            color: "#00bcd4",
                            "&:hover": {
                              borderColor: "#00acc1",
                              backgroundColor: "rgba(0, 188, 212, 0.04)",
                            },
                          }),
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          {/* View All Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="contained"
              onClick={toggleViewAll}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 3,
                background: "linear-gradient(45deg, #00bcd4, #009688)",
                "&:hover": {
                  background: "linear-gradient(45deg, #00acc1, #00897b)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 188, 212, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {viewAll ? "Back to Pagination" : "View All Products"}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Success Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            fontSize: "1rem",
            background: "linear-gradient(45deg, #4CAF50, #8BC34A)",
            boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
          }}
        >
          🛒 "{addedProductName}" successfully added to cart!
        </Alert>
      </Snackbar>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </Box>
  );
};

export default HomePage;
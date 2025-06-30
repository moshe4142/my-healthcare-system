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
} from "@mui/material";
import { useRouter } from "next/router";
// import { Search } from "@mui/icons-material"; // במידה ותחזיר את כפתור החיפוש

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
      } catch (err: any) {
        setError(err.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  // if (loading) {
  //   return (
  //     <Typography sx={{ textAlign: "center", mt: 5 }}>
  //       Loading products...
  //     </Typography>
  //   );
  // }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        Error loading products: {error}
      </Typography>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "60px 20px 40px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, color: "#1976d2", mb: 2 }}
        >
          Welcome to the Pharmacy System
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          Trusted Healthcare Solutions for Your Family
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 5, px: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search for medicines, supplements, products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            width: { xs: "100%", sm: "60%", md: "50%" },
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Product Section */}
      <Box sx={{ px: 5, pb: 4 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 5, fontWeight: 700, color: "#0d47a1" }}
        >
          Popular Products
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
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
                    image={product.imageUrl}
                    sx={{ objectFit: "cover", height: 220 }}
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
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ mb: 1 }}
                      onClick={() => navigateToProductPage(product.id)}
                    >
                      View Product
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", mt: 4, color: "#888" }}>
              No products found for "{searchTerm}"
            </Typography>
          )}
        </Grid>

        {!viewAll && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                color="primary"
                sx={{ mx: 1 }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleViewAll}
            sx={{
              color: "white",
              fontWeight: "bold",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(33, 150, 243, 0.4)",
              },
            }}
          >
            {viewAll ? "Back to Pagination" : "View All"}
          </Button>
        </Box>
      </Box>

      {/* Alert */}
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
            width: "100%",
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(45deg, #4CAF50, #8BC34A)",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
          }}
        >
          🛒 "{addedProductName}" added to cart successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;

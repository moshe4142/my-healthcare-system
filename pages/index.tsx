import { useCart } from "../context/shoppingCartContext";
import { useState, useMemo, useCallback } from "react";
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
import { Search } from "@mui/icons-material";

// הגדרת טיפוס Product
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const productsPerPage = 3;

  const products = useMemo<Product[]>(
    () => [
      {
        id: 1,
        name: "Aspirin",
        description: "Effective for pain relief and reducing inflammation.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/05/08/20/54/drugs-758837_960_720.jpg",
        price: 10.99,
      },
      {
        id: 2,
        name: "Cough Syrup",
        description: "Soothes sore throat and relieves dry cough.",
        imageUrl:
          "https://media.istockphoto.com/id/1366960245/photo/man-pouring-cough-syrup-into-spoon.jpg?s=2048x2048&w=is&k=20&c=VuoskcIRZ8kKt93y21f3piGB5ZheF_jvgSpoj377qCY=",
        price: 8.49,
      },
      {
        id: 3,
        name: "Antibiotics",
        description: "Prescription medication to fight bacterial infections.",
        imageUrl:
          "https://media.istockphoto.com/id/1349441051/photo/overhead-view-of-senior-asian-woman-feeling-sick-taking-medicines-in-hand-with-a-glass-of.jpg?s=2048x2048&w=is&k=20&c=swet4f2ZyDBMyMvtOGLdWGDko8Zo-LNLYiQxwCTuVTw=",
        price: 15.99,
      },
      {
        id: 4,
        name: "Vitamin C",
        description: "Boosts immune system and fights colds.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_1280.png",
        price: 5.99,
      },
      {
        id: 5,
        name: "Pain Relief Gel",
        description: "Topical gel for muscle and joint pain.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2012/04/12/19/45/pill-30353_1280.png",
        price: 9.49,
      },
      {
        id: 6,
        name: "Allergy Pills",
        description: "Effective relief from seasonal allergies.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2013/07/13/11/44/capsule-158568_1280.png",
        price: 7.89,
      },
      {
        id: 7,
        name: "Multivitamins",
        description: "Daily support for overall health and wellness.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2025/04/25/11/25/multivitamin-9558634_1280.png",
        price: 12.49,
      },
      {
        id: 8,
        name: "Eye Drops",
        description: "Relieves dryness and irritation in eyes.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2021/07/12/20/39/dropper-6425049_1280.png",
        price: 6.99,
      },
      {
        id: 9,
        name: "Viagra",
        description: "Used to treat erectile dysfunction in men.",
        imageUrl:
          "https://cdn.pixabay.com/photo/2020/05/01/18/59/medicine-5118692_1280.png",
        price: 29.99,
      },
      {
        id: 10,
        name: "snoop dog",
        description: "Used to treat erectile dysfunction in men.",
        imageUrl:
          "https://variety.com/wp-content/uploads/2022/11/snoop.jpg?w=1000&h=562&crop=1",
        price: 999,
      },
      {
        id: 11,
        name: "50 cent",
        description: "Used to treat erectile dysfunction in men.",
        imageUrl:
          "https://cdn-images.dzcdn.net/images/artist/58da3cca2d598e43c7a7823cf75277e5/1900x1900-000000-80-0-0.jpg",
        price: 50,
      },
      {
        id: 12,
        name: "conor mcgregor",
        description: "Used to treat erectile dysfunction in men.",
        imageUrl:
          "https://images.daznservices.com/di/library/DAZN_News/13/5d/conor-mcgregor_1texrxkjfjww41w4lecwy25etn.jpg?t=-1094698001&w=800&quality=100",
        price: 18,
      },
    ],
    []
  );

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

  const toggleViewAll = useCallback(() => {
    setViewAll(!viewAll);
    if (viewAll) {
      setCurrentPage(1);
    }
  }, [viewAll]);

  // הפונקציה המתוקנת עם טיפוס מפורש
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

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        <IconButton
          onClick={handleSearch}
          sx={{
            width: 56,
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

      {/* Services Section */}
      <Box sx={{ px: 5, py: 6, backgroundColor: "#f8f9fa" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: 700, color: "#0d47a1" }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ fontSize: "3rem", mb: 2 }}>💊</Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, color: "#0d47a1" }}
              >
                Prescription Refills
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Fast and convenient prescription refill service
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ fontSize: "3rem", mb: 2 }}>🩺</Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, color: "#0d47a1" }}
              >
                Health Consultation
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Expert pharmacist consultation available
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ fontSize: "3rem", mb: 2 }}>🚚</Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, color: "#0d47a1" }}
              >
                Home Delivery
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Free delivery for orders over $50
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ fontSize: "3rem", mb: 2 }}>⏰</Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, color: "#0d47a1" }}
              >
                24/7 Support
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Round-the-clock customer support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

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
                    className="rounded-t-lg"
                    image={product.imageUrl}
                    sx={{ objectFit: "cover", height: 220 }}
                  />
                  <CardContent className="bg-gray-100">
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
              background: "primary",
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

      {/* Success Alert Popup */}
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
import { useCart } from "../context/shoppingCartContext";
import { useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Search, Favorite, LocalHospital, EmojiPeople } from "@mui/icons-material";

const HomePage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const products = [
    {
      id: 1,
      name: "Aspirin",
      description: "Effective for pain relief and reducing inflammation.",
      imageUrl: "https://images.unsplash.com/photo-1603393817823-9c80e59b6c87?auto=format&fit=crop&w=800&q=80",
      price: 10.99,
    },
    {
      id: 2,
      name: "Cough Syrup",
      description: "Soothes sore throat and relieves dry cough.",
      imageUrl: "https://images.unsplash.com/photo-1620138542429-785f92c190f1?auto=format&fit=crop&w=800&q=80",
      price: 8.49,
    },
    {
      id: 3,
      name: "Antibiotics",
      description: "Prescription medication to fight bacterial infections.",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-ec7f8b90decc?auto=format&fit=crop&w=800&q=80",
      price: 15.99,
    },
    {
      id: 4,
      name: "Vitamin C",
      description: "Boosts immune system and fights colds.",
      imageUrl: "https://images.unsplash.com/photo-1612731486609-4f1b2ffdbfc9?auto=format&fit=crop&w=800&q=80",
      price: 5.99,
    },
    {
      id: 5,
      name: "Pain Relief Gel",
      description: "Topical gel for muscle and joint pain.",
      imageUrl: "https://images.unsplash.com/photo-1620924224894-dc512ec9635d?auto=format&fit=crop&w=800&q=80",
      price: 9.49,
    },
    {
      id: 6,
      name: "Allergy Pills",
      description: "Effective relief from seasonal allergies.",
      imageUrl: "https://images.unsplash.com/photo-1617957741983-66c3097b005e?auto=format&fit=crop&w=800&q=80",
      price: 7.89,
    },
    {
      id: 7,
      name: "Multivitamins",
      description: "Daily support for overall health and wellness.",
      imageUrl: "https://images.unsplash.com/photo-1618915929368-39681f146874?auto=format&fit=crop&w=800&q=80",
      price: 12.49,
    },
    {
      id: 8,
      name: "Eye Drops",
      description: "Relieves dryness and irritation in eyes.",
      imageUrl: "https://images.unsplash.com/photo-1588774069261-126708724251?auto=format&fit=crop&w=800&q=80",
      price: 6.99,
    },
    {
      id: 9,
      name: "Viagra",
      description: "Used to treat erectile dysfunction in men.",
      imageUrl: "https://images.unsplash.com/photo-1610621345176-408a18986e5d?auto=format&fit=crop&w=800&q=80",
      price: 29.99,
    },
  ];

  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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
      <Box sx={{ textAlign: "center", padding: "60px 20px 40px", backgroundColor: "#ffffff" }}>
        <Typography variant="h2" sx={{ fontWeight: 800, color: "#1976d2", mb: 2 }}>
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

      <Box sx={{ px: 5 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 5, fontWeight: 700, color: "#0d47a1" }}>
          Popular Products
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {paginatedProducts.map((product) => (
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
                <CardContent className="bg-gray-100">
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0d47a1" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mt: 1, mb: 2 }}>
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
                    onClick={() =>
                      addToCart({
                        id: String(product.id),
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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
      </Box>

      <Box sx={{ backgroundColor: "#e3f2fd", py: 6, mt: 8, px: 3, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0d47a1", mb: 4 }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Favorite sx={{ fontSize: 50, color: "#ef5350" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Quality Care
            </Typography>
            <Typography variant="body2">
              We ensure the highest quality healthcare products and services.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalHospital sx={{ fontSize: 50, color: "#66bb6a" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Certified Pharmacists
            </Typography>
            <Typography variant="body2">
              Our pharmacists are certified professionals ready to assist you.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <EmojiPeople sx={{ fontSize: 50, color: "#42a5f5" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
              Customer Focused
            </Typography>
            <Typography variant="body2">
              We value our customers and prioritize their health and satisfaction.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  return { props: {} };
}

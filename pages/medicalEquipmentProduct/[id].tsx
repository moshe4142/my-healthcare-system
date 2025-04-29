// pages/medicalEquipmentProduct/[id].tsx
import { useRouter } from "next/router";
import { Box, Grid, Typography, Button } from "@mui/material";

// נתונים לדוגמה
const equipmentData = [
  {
    id: 1,
    name: "X-ray Machine",
    description:
      "High-resolution X-ray machine for diagnostic purposes. Includes adjustable bed, digital imaging, and wireless data export.",
    imageUrl: "https://placehold.co/600x400?text=X-ray+Machine",
    price: "$5000",
  },
  {
    id: 2,
    name: "MRI Scanner",
    description:
      "Advanced MRI scanner with high precision and full-body scanning capabilities. FDA-approved for clinical use.",
    imageUrl: "https://placehold.co/600x400?text=MRI+Scanner",
    price: "$12000",
  },
  {
    id: 3,
    name: "Defibrillator",
    description:
      "Portable defibrillator with voice instructions and automatic shock delivery. Suitable for clinics and emergency responders.",
    imageUrl: "https://placehold.co/600x400?text=Defibrillator",
    price: "$3000",
  },
];

const MedicalEquipmentProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const equipment = equipmentData.find((item) => item.id === Number(id));

  if (!equipment) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 10 }}>
        Product not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)", // רקע כמו HomePage
        minHeight: "100vh",
        py: 6,
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 800, color: "#1976d2", mb: 4, textAlign: "center" }}
      >
        {equipment.name}
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* תמונה של המוצר */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={equipment.imageUrl}
            alt={equipment.name}
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: 4,
              maxHeight: 450,
              objectFit: "cover",
            }}
          />
        </Grid>

        {/* תוכן טקסטואלי */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#0d47a1", mb: 2 }}>
            Product Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.primary" }}>
            {equipment.description}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main", mb: 2 }}>
            Price: {equipment.price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MedicalEquipmentProduct;

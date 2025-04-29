// pages/medicalEquipment.tsx
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import Link from "next/link";

// ציוד רפואי לדוגמה
const equipmentData = [
  {
    id: 1,
    name: "X-ray Machine",
    description: "High-resolution X-ray machine for diagnostic purposes.",
    imageUrl: "https://placehold.co/300x200?text=X-ray+Machine",
    price: "$5000",
  },
  {
    id: 2,
    name: "MRI Scanner",
    description: "MRI scanner for detailed imaging of internal organs.",
    imageUrl: "https://placehold.co/300x200?text=MRI+Scanner",
    price: "$12000",
  },
  {
    id: 3,
    name: "Defibrillator",
    description: "Used to deliver a dose of electric current to the heart in case of emergency.",
    imageUrl: "https://placehold.co/300x200?text=Defibrillator",
    price: "$3000",
  },
];

const MedicalEquipmentPage = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #e0f2f1, #ffffff)",
        minHeight: "100vh",
        py: 6,
        px: { xs: 2, md: 6 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          textAlign: "center",
          mb: 6,
          color: "#1976d2",
        }}
      >
        Medical Equipment
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {equipmentData.map((equipment) => (
          <Grid item xs={12} sm={6} md={4} key={equipment.id}>
            <Card
              sx={{
                maxWidth: 360,
                mx: "auto",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                alt={equipment.name}
                height="200"
                image={equipment.imageUrl}
                sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0d47a1", mb: 1 }}>
                  {equipment.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                  {equipment.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  {equipment.price}
                </Typography>
                <Link href={`/medicalEquipmentProduct/${equipment.id}`} passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      textTransform: "none",
                      backgroundColor: "#1976d2",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    View Product
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MedicalEquipmentPage;

// pages/medicalEquipment.tsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Divider,
  Badge,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// ציוד רפואי לדוגמה
interface Equipment {
  id: number;
  name: string;
  description: string;
  price: string;
  availability: "In Stock" | "Out of Stock";
}

const equipmentData: Equipment[] = [
  {
    id: 1,
    name: "X-ray Machine",
    description: "High-resolution X-ray machine for diagnostic purposes.",
    price: "$5000",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "MRI Scanner",
    description: "MRI scanner for detailed imaging of internal organs.",
    price: "$12000",
    availability: "Out of Stock",
  },
  {
    id: 3,
    name: "Defibrillator",
    description: "Delivers electric shock to the heart in emergencies.",
    price: "$3000",
    availability: "In Stock",
  },
];

const getAvailabilityChip = (status: Equipment["availability"]) => {
  return status === "In Stock" ? (
    <Chip label="In Stock" color="success" variant="outlined" size="small" />
  ) : (
    <Chip label="Out of Stock" color="error" variant="outlined" size="small" />
  );
};

const MedicalEquipmentPage = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        minHeight: "70vh",
        // paddingTop: 8,
        py: 15,
        px: { xs: 2, md: 6 },
        color: "#212121",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: "#ffffff",
          color: "#212121",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" fontWeight={600}>
            🏥 Medical Equipment Inventory
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ color: "#212121", my: 2 }}>
          This table displays available equipment for pharmacy technical staff.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Badge badgeContent={equipmentData.length} color="primary">
            <Typography variant="subtitle1" sx={{ color: "#212121" }}>
              🧰 Total Equipment
            </Typography>
          </Badge>
        </Stack>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ bgcolor: "#fafafa" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#e3f2fd" }}>
                <TableCell sx={{ color: "#212121" }}>Name</TableCell>
                <TableCell sx={{ color: "#212121" }}>Description</TableCell>
                <TableCell sx={{ color: "#212121" }}>Price</TableCell>
                <TableCell sx={{ color: "#212121" }}>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ color: "#212121" }}>{item.name}</TableCell>
                  <TableCell sx={{ color: "#212121" }}>
                    {item.description}
                  </TableCell>
                  <TableCell sx={{ color: "#212121" }}>{item.price}</TableCell>
                  <TableCell>
                    {getAvailabilityChip(item.availability)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default MedicalEquipmentPage;

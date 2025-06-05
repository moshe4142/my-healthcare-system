// pages/medicalEquipment.tsx
import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Equipment {
  id: number;
  name: string;
  description: string;
  price: string;
  status: "In Stock" | "Out of Stock" | "Limited Stock" | string;
}

const getAvailabilityChip = (status: Equipment["status"]) => {
  if (!status || typeof status !== "string") {
    console.log(status);
    return <Chip label="Unknown" color="default" variant="outlined" size="small" />;
  }

  switch (status.toLowerCase()) {
    case "in stock":
      return <Chip label="In Stock" color="success" variant="outlined" size="small" />;
    case "out of stock":
      return <Chip label="Out of Stock" color="error" variant="outlined" size="small" />;
    case "limited stock":
      return <Chip label="Limited Stock" color="warning" variant="outlined" size="small" />;
    default:
      return <Chip label={status} color="default" variant="outlined" size="small" />;
  }
};


const MedicalEquipmentPage = () => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch("/api/medicalEquipmentProduct", {
          headers: {
            // You can optionally pass a JWT cookie here if needed
          },
        });
        if (!res.ok) throw new Error("Failed to fetch equipment");
        const data = await res.json();
        setEquipmentData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 10 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        minHeight: "70vh",
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
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
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

        <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: "#fafafa" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#e3f2fd" }}>
                <TableCell sx={{ color: "#212121" }}>Name</TableCell>
                <TableCell sx={{ color: "#212121" }}>Description</TableCell>
                <TableCell sx={{ color: "#212121" }}>Price</TableCell>
                <TableCell sx={{ color: "#212121" }}>status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ color: "#212121" }}>{item.name}</TableCell>
                  <TableCell sx={{ color: "#212121" }}>{item.description}</TableCell>
                  <TableCell sx={{ color: "#212121" }}>{item.price}</TableCell>
                  <TableCell>{getAvailabilityChip(item.status)}</TableCell>
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

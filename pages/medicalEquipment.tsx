import React, { useEffect, useState } from 'react';
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
} from '@mui/material';

interface Equipment {
  id: number;
  name: string;
  description: string;
  price: string;
  status: string; // במקום availability
}

const getStatusChip = (status: string) => {
  switch (status.toLowerCase()) {
    case 'available':
      return <Chip label="Available" color="success" variant="outlined" size="small" />;
    case 'out of stock':
      return <Chip label="Out of Stock" color="error" variant="outlined" size="small" />;
    case 'limited':
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
        const res = await fetch('/api/medicalEquipmentProduct');
        if (!res.ok) throw new Error('Failed to fetch equipment');
        const data = await res.json();
        setEquipmentData(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 10 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
        minHeight: '100vh',
        py: 6,
        px: { xs: 2, md: 6 },
        color: '#212121',
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            🏥 Medical Equipment Inventory
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ color: '#212121', my: 2 }}>
          This table displays available equipment for pharmacy technical staff.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Badge badgeContent={equipmentData.length} color="primary">
            <Typography variant="subtitle1" sx={{ color: '#212121' }}>
              🧰 Total Equipment
            </Typography>
          </Badge>
        </Stack>

        <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: '#fafafa' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ color: '#212121' }}>Name</TableCell>
                <TableCell sx={{ color: '#212121' }}>Description</TableCell>
                <TableCell sx={{ color: '#212121' }}>Price</TableCell>
                <TableCell sx={{ color: '#212121' }}>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{getStatusChip(item.status)}</TableCell>
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

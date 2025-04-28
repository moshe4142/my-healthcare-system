import React from 'react';
import { Box, Typography } from '@mui/material';

const MedicalRecordsPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>📂 Medical Records</Typography>
      <Typography sx={{ mt: 2 }}>
        Manage and view your personal medical records here.
      </Typography>
    </Box>
  );
};

export default MedicalRecordsPage;

import React from 'react';
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
  IconButton,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScienceIcon from '@mui/icons-material/Science';

interface MedicalRecord {
  date: string;
  type: string;
  doctor: string;
  notes: string;
  fileName: string;
}

const dummyMedicalRecords: MedicalRecord[] = [
  {
    date: '2025-04-01',
    type: 'Prescription',
    doctor: 'Dr. Cohen',
    notes: 'Antibiotics for 7 days',
    fileName: 'prescription-april.pdf',
  },
  {
    date: '2025-03-15',
    type: 'Blood Test',
    doctor: 'Dr. Levi',
    notes: 'Lipid panel',
    fileName: 'blood-test-march.pdf',
  },
];

const getTypeChip = (type: string) => {
  switch (type) {
    case 'Prescription':
      return (
        <Chip
          icon={<LocalHospitalIcon />}
          label="Prescription"
          variant="outlined"
          color="primary"
          size="small"
        />
      );
    case 'Blood Test':
      return (
        <Chip
          icon={<ScienceIcon />}
          label="Blood Test"
          variant="outlined"
          color="secondary"
          size="small"
        />
      );
    default:
      return <Chip label={type} size="small" />;
  }
};

const MedicalRecordsPage: React.FC = () => {
  const records: MedicalRecord[] = dummyMedicalRecords;

  return (
    // רקע תכלת מאחורי הכרטיס
    <Box sx={{ bgcolor: '#e3f2fd', minHeight: '100vh', py: 6, px: { xs: 2, md: 6 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: 'white', // שמרנו על הצבע הלבן בכרטיס
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          📂 Medical Records
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          View and manage your medical documents such as prescriptions, lab results, and doctor reports.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle1">🗂️ Total Records: {records.length}</Typography>
        </Stack>

        {records.length > 0 ? (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f0f2f5' }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell align="center">Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{getTypeChip(record.type)}</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                    <TableCell>{record.notes}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        href={`/files/${record.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, mt: 4, textAlign: 'center' }} variant="outlined">
            <InsertDriveFileIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
            <Typography variant="h6">No records available</Typography>
            <Typography variant="body2" color="text.secondary">
              Once your medical records are added, they will appear here.
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default MedicalRecordsPage;

"use client";

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
  IconButton,
  Stack,
  Chip,
  Divider,
  Button,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScienceIcon from "@mui/icons-material/Science";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

interface MedicalRecord {
  date: string;
  type: string;
  doctor: string;
  notes: string;
  fileName: string;
}

const getTypeChip = (type: string) => {
  switch (type) {
    case "Prescription":
      return (
        <Chip
          icon={<LocalHospitalIcon />}
          label="Prescription"
          variant="outlined"
          sx={{
            bgcolor: "#e3f2fd",
            color: "#0d47a1",
            borderColor: "#90caf9",
          }}
          size="small"
        />
      );
    case "Blood Test":
      return (
        <Chip
          icon={<ScienceIcon />}
          label="Blood Test"
          variant="outlined"
          sx={{
            bgcolor: "#fce4ec",
            color: "#880e4f",
            borderColor: "#f48fb1",
          }}
          size="small"
        />
      );
    default:
      return <Chip label={type} size="small" />;
  }
};

const MedicalRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(`/api/medical-records/1`);
        const transformed = res.data.map((rec: any) => ({
          date: rec.record_date,
          type: rec.prescription ? "Prescription" : "Other",
          doctor: rec.doctor_name,
          notes: rec.notes,
          fileName: rec.prescription || "manual-upload.pdf",
        }));
        setRecords(transformed);
      } catch (err) {
        console.error("Failed to fetch medical records:", err);
      }
    };
    fetchRecords();
  }, []);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newRecord: MedicalRecord = {
        date: new Date().toISOString().slice(0, 10),
        type: "Other",
        doctor: "Uploaded by you",
        notes: "Manual upload",
        fileName: file.name,
      };
      setRecords((prev) => [newRecord, ...prev]);
    }
  };

  return (
    <Box
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to bottom, #121212, #1e1e1e)"
            : "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        minHeight: "70vh",
        py: 15,
        px: { xs: 2, md: 6 },
        color: theme.palette.text.primary,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            📂 Medical Records
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{
              bgcolor: "#0288d1",
              "&:hover": { bgcolor: "#0277bd" },
            }}
          >
            Upload
            <input hidden type="file" onChange={handleUpload} />
          </Button>
        </Stack>

        <Typography variant="body1" sx={{ color: theme.palette.text.primary, my: 2 }}>
          View and manage your medical documents such as prescriptions, lab results, and doctor reports.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Badge badgeContent={records.length} color="primary">
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary }}>
              🗂️ Total Records
            </Typography>
          </Badge>
        </Stack>

        {records.length > 0 ? (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ bgcolor: theme.palette.background.default }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark" ? "#2c2c2c" : "#e3f2fd",
                  }}
                >
                  <TableCell sx={{ color: theme.palette.text.primary }}>Date</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Type</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Doctor</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Notes</TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary }}>
                    Download
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.date}</TableCell>
                    <TableCell>{getTypeChip(record.type)}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.doctor}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{record.notes}</TableCell>
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
          <Paper
            sx={{
              p: 3,
              mt: 4,
              textAlign: "center",
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.secondary,
            }}
            variant="outlined"
          >
            <InsertDriveFileIcon
              sx={{
                fontSize: 60,
                color: theme.palette.text.disabled,
                mb: 1,
              }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              No records available
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Once your medical records are added, they will appear here.
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default MedicalRecordsPage;

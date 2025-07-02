import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Alert,
  Fab,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface Appointment {
  id: number;
  appointment_date: string;
  status: string;
  patient_id?: number;
  doctor_id?: number;
  notes?: string;
}

interface NewAppointment {
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  status?: string;
  notes?: string;
}

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<NewAppointment>({
    patient_id: 0,
    doctor_id: 0,
    appointment_date: "",
    status: "pending",
    notes: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/appointments", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const { appointments } = await res.json();
      setAppointments(appointments);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof NewAppointment, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.patient_id || !formData.doctor_id || !formData.appointment_date) {
      setError("אנא מלא את כל השדות הנדרשים");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create appointment");
      }

      const data = await res.json();
      const newAppointment = data.appointment || data;
      
      // Add the new appointment to the list
      setAppointments(prev => [...prev, newAppointment]);
      
      // Reset form and close dialog
      setFormData({
        patient_id: 0,
        doctor_id: 0,
        appointment_date: "",
        status: "pending",
        notes: "",
      });
      setOpenDialog(false);
      setSuccess("הפגישה נוספה בהצלחה!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);

    } catch (err: any) {
      setError(err.message || "שגיאה ביצירת הפגישה");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      patient_id: 0,
      doctor_id: 0,
      appointment_date: "",
      status: "pending",
      notes: "",
    });
    setError(null);
  };

  // Format datetime-local input value
  const formatDateTimeForInput = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  return (
    <Box sx={{ p: 4, position: "relative" }}>
      <Typography variant="h4" mb={3}>📋 הפגישות שלך</Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : error && !openDialog ? (
        <Typography color="error">{error}</Typography>
      ) : appointments.length === 0 ? (
        <Typography>אין פגישות כרגע</Typography>
      ) : (
        <Grid container spacing={2}>
          {appointments.map((appt) => {
            const date = new Date(appt.appointment_date).toLocaleString("he-IL");
            return (
              <Grid item xs={12} md={6} key={appt.id}>
                <Card>
                  <CardContent>
                    <Typography><strong>📅 תאריך:</strong> {date}</Typography>
                    <Typography><strong>📌 סטטוס:</strong> {appt.status}</Typography>
                    {appt.notes && (
                      <Typography><strong>📝 הערות:</strong> {appt.notes}</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add appointment"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>➕ הוספת פגישה חדשה</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="מספר מטופל"
              type="number"
              value={formData.patient_id || ""}
              onChange={(e) => handleInputChange("patient_id", parseInt(e.target.value) || 0)}
              required
              fullWidth
            />

            <TextField
              label="מספר רופא"
              type="number"
              value={formData.doctor_id || ""}
              onChange={(e) => handleInputChange("doctor_id", parseInt(e.target.value) || 0)}
              required
              fullWidth
            />

            <TextField
              label="תאריך ושעת הפגישה"
              type="datetime-local"
              value={formatDateTimeForInput(formData.appointment_date)}
              onChange={(e) => handleInputChange("appointment_date", e.target.value)}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="סטטוס"
              select
              value={formData.status || "pending"}
              onChange={(e) => handleInputChange("status", e.target.value)}
              fullWidth
            >
              <MenuItem value="pending">בהמתנה</MenuItem>
              <MenuItem value="confirmed">אושר</MenuItem>
              <MenuItem value="completed">הושלם</MenuItem>
              <MenuItem value="cancelled">בוטל</MenuItem>
            </TextField>

            <TextField
              label="הערות (אופציונלי)"
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            ביטול
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={20} /> : "שמור פגישה"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentsPage;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Fab,
  useTheme,
  IconButton,
  Chip,
  Stack,
  Divider,
  CardActions,
  Tooltip,
  Avatar,
  LinearProgress,
  Fade,
  Slide,
  Paper,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  MedicalServices as DoctorIcon,
  Notes as NotesIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  EventAvailable as EventIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface Appointment {
  id?: number;
  date?: string;
  time?: string;
  department?: string;
  type?: string;
  location?: string;
  duration?: string;
  priority?: string;
  status: string;
  notes?: string;
  appointment_date?: string;
  patient_id?: number;
  doctor_id?: number;
}

interface NewAppointment {
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  status?: string;
  notes?: string;
}

const AppointmentsPage = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/appointments", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const { appointments } = await res.json();
      setAppointments(appointments);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(
        (appt) =>
          appt.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appt.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((appt) => appt.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  };

  const handleInputChange = (field: keyof NewAppointment, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFutureDate = (dateStr: string) => {
    const selected = new Date(dateStr);
    const now = new Date();
    return selected.getTime() > now.getTime();
  };

  const handleSubmit = async () => {
    if (!formData.doctor_id || !formData.appointment_date) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isFutureDate(formData.appointment_date)) {
      setError("Appointment date and time must be in the future.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const isEditing = editingAppointment !== null;
      const url = isEditing ? `/api/appointments/${editingAppointment.id}` : "/api/appointments";
      const method = isEditing ? "PUT" : "POST";

      // For editing, don't send patient_id (it's handled by the API)
      const bodyData = isEditing 
        ? {
            doctor_id: formData.doctor_id,
            appointment_date: formData.appointment_date,
            status: formData.status,
            notes: formData.notes,
          }
        : formData;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} appointment`);
      }

      const data = await res.json();
      const appointmentData = data.appointment || data;

      if (isEditing) {
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === editingAppointment.id ? appointmentData : appt))
        );
        setSuccess("Appointment updated successfully!");
      } else {
        setAppointments((prev) => [...prev, appointmentData]);
        setSuccess("Appointment created successfully!");
      }

      handleCloseDialog();
      setSnackbarOpen(true);
    } catch (err: any) {
      setError(err.message || `Error ${editingAppointment ? 'updating' : 'creating'} appointment.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patient_id: appointment.patient_id || 0, // Only for display, won't be sent in update
      doctor_id: appointment.doctor_id || 0,
      appointment_date: appointment.appointment_date || "",
      status: appointment.status,
      notes: appointment.notes || "",
    });
    setOpenDialog(true);
  };

  const handleDelete = async (appointmentId: number) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete appointment");

      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
      setSuccess("Appointment deleted successfully!");
      setSnackbarOpen(true);
    } catch (err: any) {
      setError(err.message || "Error deleting appointment.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAppointment(null);
    setFormData({
      patient_id: 0,
      doctor_id: 0,
      appointment_date: "",
      status: "pending",
      notes: "",
    });
    setError(null);
  };

  const formatDateTimeForInput = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "✅";
      case "pending":
        return "⏳";
      case "completed":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  const upcomingAppointments = filteredAppointments.filter(
    (appt) => new Date(appt.appointment_date || "") >= new Date()
  );
  const pastAppointments = filteredAppointments.filter(
    (appt) => new Date(appt.appointment_date || "") < new Date()
  );

  return (
    <Box sx={{ p: 4, position: "relative", minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
            <CalendarIcon />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="primary">
            Your Appointments
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your medical appointments with ease
        </Typography>
      </Paper>

      {/* Search and Filter Controls */}
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            placeholder="Search appointments..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight={600} color="primary">
                <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Upcoming Appointments ({upcomingAppointments.length})
              </Typography>
              <Grid container spacing={3}>
                {upcomingAppointments.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    formatDateTime={formatDateTime}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    theme={theme}
                  />
                ))}
              </Grid>
            </Box>
          )}

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight={600} color="text.secondary">
                <CalendarIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Past Appointments ({pastAppointments.length})
              </Typography>
              <Grid container spacing={3}>
                {pastAppointments.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    formatDateTime={formatDateTime}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    theme={theme}
                    isPast={true}
                  />
                ))}
              </Grid>
            </Box>
          )}

          {filteredAppointments.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: "center",
                backgroundColor: theme.palette.grey[50],
                borderRadius: 3,
                border: `2px dashed ${theme.palette.grey[300]}`,
              }}
            >
              <CalendarIcon sx={{ fontSize: 80, color: theme.palette.grey[400], mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No appointments found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first appointment"}
              </Typography>
            </Paper>
          )}
        </>
      )}

      <Tooltip title="Add New Appointment" placement="left">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            boxShadow: 4,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Enhanced Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                {editingAppointment ? <EditIcon /> : <AddIcon />}
              </Avatar>
              <Typography variant="h5" fontWeight={600}>
                {editingAppointment ? "Edit Appointment" : "New Appointment"}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Patient ID"
                type="number"
                value={formData.patient_id || ""}
                onChange={(e) => handleInputChange("patient_id", parseInt(e.target.value) || 0)}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Doctor ID"
                type="number"
                value={formData.doctor_id || ""}
                onChange={(e) => handleInputChange("doctor_id", parseInt(e.target.value) || 0)}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DoctorIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Appointment Date & Time"
                type="datetime-local"
                value={formatDateTimeForInput(formData.appointment_date)}
                onChange={(e) => handleInputChange("appointment_date", e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Status"
                select
                value={formData.status || "pending"}
                onChange={(e) => handleInputChange("status", e.target.value)}
                fullWidth
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notes (optional)"
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                      <NotesIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} disabled={submitting} size="large">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={submitting}
            size="large"
            sx={{ minWidth: 120 }}
          >
            {submitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : editingAppointment ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Separate component for appointment cards
const AppointmentCard = ({
  appointment,
  onEdit,
  onDelete,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
  theme,
  isPast = false,
}: any) => {
  const dateTime = formatDateTime(appointment.appointment_date || appointment.date || "");

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Fade in timeout={300}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
            border: `1px solid ${theme.palette.divider}`,
            opacity: isPast ? 0.8 : 1,
          }}
        >
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  mr: 2,
                  width: 32,
                  height: 32,
                }}
              >
                <CalendarIcon fontSize="small" />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                {dateTime.date}
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TimeIcon sx={{ mr: 1, color: "text.secondary", fontSize: 20 }} />
                <Typography variant="body1" fontWeight={500}>
                  {dateTime.time}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Status:
                </Typography>
                <Chip
                  label={`${getStatusIcon(appointment.status)} ${appointment.status}`}
                  color={getStatusColor(appointment.status)}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              {appointment.notes && (
                <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
                  <NotesIcon sx={{ mr: 1, color: "text.secondary", fontSize: 20, mt: 0.2 }} />
                  <Typography variant="body2" color="text.secondary">
                    {appointment.notes}
                  </Typography>
                </Box>
              )}
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between", px: 2, py: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Edit Appointment">
                <IconButton
                  size="small"
                  onClick={() => onEdit(appointment)}
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": { bgcolor: theme.palette.primary.main + "20" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Appointment">
                <IconButton
                  size="small"
                  onClick={() => onDelete(appointment.id)}
                  sx={{
                    color: theme.palette.error.main,
                    "&:hover": { bgcolor: theme.palette.error.main + "20" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </CardActions>
        </Card>
      </Fade>
    </Grid>
  );
};

export default AppointmentsPage;

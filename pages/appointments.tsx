import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  TextField,
  MenuItem,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Appointment {
  id?: number;
  date: string;
  time: string;
  department: string;
  type: string;
  location: string;
  duration: string;
  priority: string;
  status: string;
  notes: string;
  appointment_date?: string;
}

const departments = ["Cardiology", "Tech Support", "HR", "Radiology", "Dermatology"];
const types = ["Consultation", "Follow-up", "Maintenance", "Diagnosis"];
const priorities = ["Low", "Medium", "High"];

const AppointmentsPage = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Appointment>({
    date: "",
    time: "",
    department: "",
    type: "",
    location: "",
    duration: "",
    priority: "Medium",
    status: "Scheduled",
    notes: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { date, time, department, type, location, duration } = formData;
    return date && time && department && type && location && duration;
  };

  const saveAppointments = (data: Appointment[]) => {
    setAppointments(data);
    localStorage.setItem("appointments", JSON.stringify(data));
  };

  const handleAppointment = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    const appointment = {
      ...formData,
      date: new Date(formData.date).toDateString(),
    };

    if (editIndex !== null) {
      const updated = appointments.map((a, i) => (i === editIndex ? appointment : a));
      saveAppointments(updated);
      setEditIndex(null);
    } else {
      saveAppointments([...appointments, appointment]);
    }

    setFormData({
      date: "",
      time: "",
      department: "",
      type: "",
      location: "",
      duration: "",
      priority: "Medium",
      status: "Scheduled",
      notes: "",
    });
  };

  const handleEdit = (index: number) => {
    const item = appointments[index];
    setFormData({
      ...item,
      date: new Date(item.date).toISOString().split("T")[0],
    });
    setEditIndex(index);
  };

  const handleRemove = (index: number) => {
    saveAppointments(appointments.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 2, md: 6 },
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to bottom, #121212, #1e1e1e)"
            : "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        color: theme.palette.text.primary,
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="h4" mb={3} fontWeight={600}>
        📋 Your Appointments
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : appointments.length === 0 ? (
        <Typography>No appointments at the moment.</Typography>
      ) : (
        <Grid container spacing={2} mb={6}>
          {appointments.map((appt) => {
            const date = new Date(appt.appointment_date || appt.date).toLocaleString();
            return (
              <Grid item xs={12} md={6} key={appt.id || `${appt.date}-${appt.time}`}>
                <Card sx={{ backgroundColor: theme.palette.background.paper }}>
                  <CardContent>
                    <Typography>
                      <strong>📅 Date:</strong> {date}
                    </Typography>
                    <Typography>
                      <strong>📌 Status:</strong> {appt.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Paper sx={{ p: 4, borderRadius: 2, maxWidth: 1000, mx: "auto", mb: 8 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={1}>
          Make an Appointment
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 4, color: "#555" }}>
          Manage advanced appointment details below.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              label="Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              label="Time"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select name="department" value={formData.department} onChange={handleChange} label="Department" fullWidth>
              {departments.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select name="type" value={formData.type} onChange={handleChange} label="Appointment Type" fullWidth>
              {types.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="location" value={formData.location} onChange={handleChange} label="Location" fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField name="duration" type="number" value={formData.duration} onChange={handleChange} label="Duration (min)" fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField select name="priority" value={formData.priority} onChange={handleChange} label="Priority" fullWidth>
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField name="notes" value={formData.notes} onChange={handleChange} label="Notes" fullWidth multiline rows={3} />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleAppointment}
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            backgroundColor: "#0288d1",
            color: "#fff",
            "&:hover": { backgroundColor: "#0277bd" },
          }}
        >
          {editIndex !== null ? "✏️ Update Appointment" : "➕ Book Appointment"}
        </Button>

        <Box mt={5}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            📖 All Appointments
          </Typography>

          {appointments.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              No appointments found.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {appointments.map((a, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      bgcolor: "#f9f9f9",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" textAlign="center" mb={1}>
                        {a.date} at {a.time}
                      </Typography>
                      <Typography>
                        <b>Department:</b> {a.department}
                      </Typography>
                      <Typography>
                        <b>Type:</b> {a.type}
                      </Typography>
                      <Typography>
                        <b>Location:</b> {a.location}
                      </Typography>
                      <Typography>
                        <b>Duration:</b> {a.duration} min
                      </Typography>
                      <Typography>
                        <b>Priority:</b> {a.priority}
                      </Typography>
                      {a.notes && (
                        <Typography>
                          <b>Notes:</b> {a.notes}
                        </Typography>
                      )}
                      <Box mt={2} display="flex" justifyContent="center" gap={2}>
                        <IconButton onClick={() => handleEdit(index)} sx={{ bgcolor: "#e3f2fd" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(index)} sx={{ bgcolor: "#ffebee" }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AppointmentsPage;
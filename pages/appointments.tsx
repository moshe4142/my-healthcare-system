import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const departments = [
  "Cardiology",
  "Tech Support",
  "HR",
  "Radiology",
  "Dermatology",
];
const types = ["Consultation", "Follow-up", "Maintenance", "Diagnosis"];
const priorities = ["Low", "Medium", "High"];
const statuses = ["Scheduled", "Completed", "Cancelled"];

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
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
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const saveAppointments = (items: any[]) => {
    setAppointments(items);
    localStorage.setItem("appointments", JSON.stringify(items));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { date, time, department, type, location, duration } = formData;
    return date && time && department && type && location && duration;
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
      const updated = appointments.map((a, i) =>
        i === editIndex ? appointment : a
      );
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
        minHeight: "70vh",
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        paddingTop: 8,
        px: { xs: 2, sm: 4, md: 8 },
        py: 6,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          maxWidth: 1000,
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, textAlign: "center", mb: 1 }}
        >
          Make an appointment{" "}
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
            <TextField
              select
              name="department"
              value={formData.department}
              onChange={handleChange}
              label="Department"
              fullWidth
            >
              {departments.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Appointment Type"
              fullWidth
            >
              {types.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="location"
              value={formData.location}
              onChange={handleChange}
              label="Location"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              label="Duration (min)"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
              fullWidth
            >
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              label="Notes"
              fullWidth
              multiline
              rows={3}
            />
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

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            📖 All Appointments
          </Typography>

          {appointments.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
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
                      <Box
                        mt={2}
                        display="flex"
                        justifyContent="center"
                        gap={2}
                      >
                        <IconButton
                          onClick={() => handleEdit(index)}
                          sx={{ bgcolor: "#e3f2fd" }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleRemove(index)}
                          sx={{ bgcolor: "#ffebee" }}
                        >
                          <Delete />
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

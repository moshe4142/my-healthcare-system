import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
} from "@mui/material";

interface Appointment {
  id: number;
  appointment_date: string;
  status: string;
}

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
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

  const handleAppointment = () => {
    if (!selectedDate || !selectedTime) return;

    const newItem = {
      date: new Date(selectedDate).toDateString(),
      time: selectedTime,
    };

    if (editIndex !== null) {
      const updated = appointments.map((a, i) => (i === editIndex ? newItem : a));
      saveAppointments(updated);
      setEditIndex(null);
    } else {
      saveAppointments([...appointments, newItem]);
    }

    setSelectedDate("");
    setSelectedTime("");
  };

  const handleRemove = (index: number) => {
    saveAppointments(appointments.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const item = appointments[index];
    setSelectedDate(new Date(item.date).toISOString().split("T")[0]);
    setSelectedTime(item.time);
    setEditIndex(index);
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 4, md: 8 },  // מרווח אחיד לפנים העמוד
          py: 6,  // מתאים לעמודים אחרים
        }}
      >
        <Paper
          sx={{
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "white",
            maxWidth: 900,
            margin: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, textAlign: "center", color: "#333", mb: 1 }}
          >
            📅 Book a New Appointment
          </Typography>
          <Typography
            sx={{ color: "#555", mb: 4, textAlign: "center" }}
          >
            Easily schedule your appointments below.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                label="Select Date"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#333" }, // Ensure label is dark
                }}
                InputProps={{
                  style: { color: "#333" }, // Ensure input text is dark
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#333", // Dark border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#0288d1", // Border color on hover
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                label="Select Time"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#333" }, // Ensure label is dark
                }}
                InputProps={{
                  style: { color: "#333" }, // Ensure input text is dark
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#333", // Dark border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#0288d1", // Border color on hover
                    },
                  },
                }}
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
              "&:hover": {
                backgroundColor: "#0277bd",
              },
            }}
          >
            {editIndex !== null ? "✏️ Edit Appointment" : "➕ Book Appointment"}
          </Button>

          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
              📖 Your Appointments
            </Typography>

            {appointments.length === 0 ? (
              <Typography color="text.secondary" textAlign="center">
                No appointments yet. Start by booking one!
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {appointments.map((a, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        position: "relative",
                        bgcolor: "#f9f9f9",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ textAlign: "center", color: "#333" }}
                        >
                          {a.date} at {a.time}
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                          }}
                        >
                          <IconButton
                            onClick={() => handleEdit(index)}
                            sx={{ bgcolor: "rgba(0, 0, 255, 0.1)" }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRemove(index)}
                            sx={{ bgcolor: "rgba(255, 0, 0, 0.1)" }}
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
    </Box>
  );
};

export default AppointmentsPage;

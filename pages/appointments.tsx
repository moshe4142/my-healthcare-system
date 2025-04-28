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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

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

    if (editIndex !== null) {
      const updatedAppointments = appointments.map((a, index) =>
        index === editIndex
          ? { date: new Date(selectedDate).toDateString(), time: selectedTime }
          : a
      );
      saveAppointments(updatedAppointments);
      setEditIndex(null);
    } else {
      const newAppointment = {
        date: new Date(selectedDate).toDateString(),
        time: selectedTime,
      };
      const updated = [...appointments, newAppointment];
      saveAppointments(updated);
    }

    setSelectedDate("");
    setSelectedTime("");
  };

  const handleRemove = (index: number) => {
    const updated = appointments.filter((_, i) => i !== index);
    saveAppointments(updated);
  };

  const handleEdit = (index: number) => {
    setSelectedDate(
      new Date(appointments[index].date).toISOString().split("T")[0]
    );
    setSelectedTime(appointments[index].time);
    setEditIndex(index);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f5f7", padding: 3 }}>
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          maxWidth: 800,
          margin: "auto",
          marginTop: 5, // margin at the top of the form
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, textAlign: "center", color: "#333" }}
        >
          📅 Book a New Appointment
        </Typography>
        <Typography
          sx={{ color: "#777", marginBottom: 3, textAlign: "center" }}
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
                shrink: true, // Ensures the label stays visible when the field is focused
              }}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  paddingRight: "15px", // Adds padding to prevent text overflow
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem", // Makes sure the label doesn't shrink too much
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
                shrink: true, // Ensures the label stays visible when the field is focused
              }}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  paddingRight: "15px", // Adds padding to prevent text overflow
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem", // Makes sure the label doesn't shrink too much
                },
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAppointment}
          fullWidth
          sx={{
            borderRadius: "4px",
            padding: "12px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#004d99",
            },
          }}
        >
          {editIndex !== null ? "✏️ Edit Appointment" : "➕ Book Appointment"}
        </Button>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            📖 Your Appointments
          </Typography>
          {appointments.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              No appointments yet. Start by booking one!
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {appointments.map((a, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      position: "relative",
                      padding: "16px",
                      overflow: "visible", // This ensures the icons do not disappear when they are outside the card
                      marginBottom: 3, // margin between cards
                    }}
                  >
                    <CardContent sx={{ paddingBottom: "50px" }}>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        {a.date} at {a.time}
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0, // set it to 50% of the height of the card
                          right: 73, // some padding from the right edge
                          transform: "translateY(-50%)", // move the box up by half of its own height
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          color="error"
                          onClick={() => handleRemove(index)}
                          sx={{
                            backgroundColor: "rgba(255, 0, 0, 0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 0, 0, 0.2)",
                            },
                            fontSize: "18px", // smaller icon size
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(index)}
                          sx={{
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 255, 0.2)",
                            },
                            fontSize: "18px", // smaller icon size
                          }}
                        >
                          <Edit />
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

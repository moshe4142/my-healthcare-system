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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

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

        if (!res.ok) {
          throw new Error("Failed to fetch appointments");
        }

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

  return (
    <Box
  sx={{
    py: 10,
    px: { xs: 2, md: 6 },
    minHeight: "70vh",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(to bottom, #121212, #1e1e1e)"
        : "linear-gradient(to bottom, #e0f7fa, #ffffff)",
    color: theme.palette.text.primary,
    transition: "background-color 0.3s ease, color 0.3s ease",
  }}
>
  <Typography variant="h4" mb={3} fontWeight={600} sx={{ transition: "color 0.3s ease" }}>
    📋 Your Appointments
  </Typography>

  {loading ? (
    <CircularProgress />
  ) : error ? (
    <Typography color="error" sx={{ transition: "color 0.3s ease" }}>{error}</Typography>
  ) : appointments.length === 0 ? (
    <Typography sx={{ transition: "color 0.3s ease" }}>No appointments at the moment.</Typography>
  ) : (
    <Grid container spacing={2}>
      {appointments.map((appt) => {
        const date = new Date(appt.appointment_date).toLocaleString();
        return (
          <Grid item xs={12} md={6} key={appt.id}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              <CardContent>
                <Typography sx={{ transition: "color 0.3s ease" }}>
                  <strong>📅 Date:</strong> {date}
                </Typography>
                <Typography sx={{ transition: "color 0.3s ease" }}>
                  <strong>📌 Status:</strong> {appt.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  )}
</Box>

  );
};

export default AppointmentsPage;

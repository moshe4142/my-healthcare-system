// pages/appointments/index.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token"); // או מאיפה שאתה שומר אותו
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
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>📋 הפגישות שלך</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : appointments.length === 0 ? (
        <Typography>אין פגישות כרגע</Typography>
      ) : (
        <Grid container spacing={2}>
          {appointments.map((appt) => {
            const date = new Date(appt.appointment_date).toLocaleString();
            return (
              <Grid item xs={12} md={6} key={appt.id}>
                <Card>
                  <CardContent>
                    <Typography><strong>📅 תאריך:</strong> {date}</Typography>
                    <Typography><strong>📌 סטטוס:</strong> {appt.status}</Typography>
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

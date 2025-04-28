import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const saveAppointments = (items: any[]) => {
    setAppointments(items);
    localStorage.setItem('appointments', JSON.stringify(items));
  };

  const handleAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    const newAppointment = { date: new Date(selectedDate).toDateString(), time: selectedTime };
    const updated = [...appointments, newAppointment];
    saveAppointments(updated);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleRemove = (index: number) => {
    const updated = appointments.filter((_, i) => i !== index);
    saveAppointments(updated);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', padding: 3 }}>
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>📅 Book a New Appointment</Typography>

        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Select Date"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          label="Select Time"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAppointment}
          fullWidth
          sx={{ mb: 2 }}
        >
          ➕ Book Appointment
        </Button>

        <Box>
          <Typography variant="h6">📖 Your Appointments</Typography>
          {appointments.length === 0 ? (
            <Typography color="text.secondary">No appointments yet.</Typography>
          ) : (
            <Box>
              {appointments.map((a, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 1 }}>
                  <Typography>{a.date} at {a.time}</Typography>
                  <Button
                    onClick={() => handleRemove(index)}
                    color="error"
                  >
                    ✖
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentsPage;

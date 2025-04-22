import React, { useState, useEffect } from 'react';

type Appointment = {
  date: string;
  time: string;
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const saveAppointments = (items: Appointment[]) => {
    setAppointments(items);
    localStorage.setItem('appointments', JSON.stringify(items));
  };

  const handleAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    const newAppointment: Appointment = {
      date: new Date(selectedDate).toDateString(),
      time: selectedTime,
    };
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow w-full max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">📅 Book a New Appointment</h3>

        <div className="mb-4">
          <label className="block mb-1 text-white">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-white">Time</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleAppointment}
          className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded w-full transition"
        >
          ➕ Book Appointment
        </button>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">📖 Your Appointments</h3>
          <ul className="space-y-2">
            {appointments.length === 0 && (
              <li className="text-gray-400">No appointments yet.</li>
            )}
            {appointments.map((a, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span>{a.date} at {a.time}</span>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-white hover:text-red-400 text-sm transition"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;

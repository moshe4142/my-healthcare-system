import React, { useState, useEffect } from 'react';

type Appointment = {
  date: string;
  time: string;
};

const AppointmentsPage = () => {
  const [date] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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
    const newAppointment: Appointment = {
      date: date.toDateString(),
      time: '10:00 AM', // You can update this later with a time picker if needed
    };
    const updated = [...appointments, newAppointment];
    saveAppointments(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Appointments</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow w-full max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-2">Today's Date</h3>
        <p className="mb-4 text-green-300">{date.toDateString()}</p>

        <button
          onClick={handleAppointment}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold py-2 px-4 rounded"
        >
          Book Appointment
        </button>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
          <ul className="list-disc pl-4">
            {appointments.length === 0 && (
              <li className="text-gray-400">No appointments yet.</li>
            )}
            {appointments.map((a, index) => (
              <li key={index}>
                {a.date} at {a.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;

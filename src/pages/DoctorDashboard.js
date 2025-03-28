import React, { useEffect, useState } from "react";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctorId = localStorage.getItem("uid");

  useEffect(() => {
    if (!doctorId) {
      setError("Unauthorized: Doctor ID not found.");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/doctor/${doctorId}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>

        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && appointments.length === 0 && (
          <p>No appointments found.</p>
        )}

        <ul className="list-none p-0">
          {appointments.map(({ id, name, email }) => (
            <li key={id} className="mb-2 p-2 border-b border-gray-300">
              {name} - {email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;

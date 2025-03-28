import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token found:", token);

    if (!token) {
      console.error("No token found, user not authenticated");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    // Fetch doctors data
    fetch("http://localhost:8080/api/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Doctors data:", data);
        setDoctors(data);
      })
      .catch((err) => console.error("Error fetching doctors:", err));

    // Fetch patients data
    fetch("http://localhost:8080/api/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Patients data:", data);
        setPatients(data);
      })
      .catch((err) => console.error("Error fetching patients:", err));

    // Fetch appointments data
    fetch("http://localhost:8080/api/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Appointments data:", data);
        setAppointments(data);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, [navigate]);

  // Inline styles
  const containerStyle = {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(to right, #f3f4f6, #e0e7ff)",
    fontFamily: "'Poppins', sans-serif",
  };

  const headingStyle = {
    fontSize: "2.2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1f2937",
    textAlign: "center",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    transition: "transform 0.2s ease-in-out",
  };

  const cardHoverEffect = {
    ...cardStyle,
    transform: "scale(1.02)",
  };

  const sectionTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#4f46e5",
    borderBottom: "2px solid #4f46e5",
    paddingBottom: "5px",
  };

  const listStyle = {
    listStyle: "none",
    padding: "0",
  };

  const listItemStyle = {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    borderLeft: "4px solid #4f46e5",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Admin Dashboard</h1>

      {/* Doctors Section */}
      <div style={cardStyle}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Doctors
        </h2>
        {doctors != undefined && doctors.length > 0 ? (
          <ul style={listStyle}>
            {doctors.map((doc) => (
              <li key={doc.id} style={listItemStyle}>
                Name - {doc.username} || Specialization - {doc.specialization}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors found</p>
        )}
      </div>

      {/* Patients Section */}
      <div style={cardStyle}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Patients
        </h2>
        {patients.length > 0 ? (
          <ul style={listStyle}>
            {patients.map((pat) => (
              <li key={pat.id} style={listItemStyle}>
                Name - {pat.username} || Gender - {pat.genderEnum} || DOB -{" "}
                {pat.dateOfBirth}
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients found</p>
        )}
      </div>

      {/* Appointments Section */}
      <div style={cardStyle}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Appointments
        </h2>
        {appointments.length > 0 ? (
          <ul style={listStyle}>
            {appointments.map((appt) => (
              <li key={appt.id} style={listItemStyle}>
                Patient {appt.patientId} has appoinment with Doctor{" "}
                {appt.doctorId} on {appt.appointmentDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

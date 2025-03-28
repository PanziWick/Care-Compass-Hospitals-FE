import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [message, setMessage] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ comments: "", rating: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const patient = JSON.parse(localStorage.getItem("patient"));
  const [patientId, setPatientId] = useState(patient.id || "");

  console.log("p found:", localStorage.getItem("patient"));
  console.log("Patient found:", patient);
  console.log("Patient ID:", patientId);

  useEffect(() => {
    if (!token) {
      console.error("No token found, user not authenticated");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/api/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data.content))
      .catch((err) => console.error("Error fetching doctors:", err));

    if (user.id) {
      fetchAppointments();
      fetchFeedback(); // Fetch the feedback here
    }
  }, [navigate, patientId]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/patient/${patientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/feedback/${patientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedback(data); // Set feedback data
      } else {
        console.error("Failed to fetch feedback");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleBookAppointment = async () => {
    if (!patientId) {
      setMessage("Please create a patient first.");
      return;
    }
    if (!selectedDoctor || !appointmentDate) {
      setMessage("Please select a doctor and a date.");
      return;
    }

    const appointmentData = {
      patientId: patientId,
      doctorId: selectedDoctor,
      appointmentDate,
    };

    try {
      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        setMessage("Appointment booked successfully!");
        fetchAppointments();
      } else {
        setMessage("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("Something went wrong. Try again.");
    }
  };

  const handleSubmitFeedback = async (appointmentId) => {
    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appointmentId,
          comments: newFeedback.comments,
          rating: parseFloat(newFeedback.rating),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Feedback submitted successfully!");
        setNewFeedback({ comments: "", rating: "" }); // Reset feedback form
      } else {
        console.error("Feedback Error:", data);
        setMessage(
          `Failed to submit feedback: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Something went wrong. Try again.");
    }
  };

  const handleUpdateAppointment = async (appointmentId) => {
    if (!appointmentDate) {
      setMessage("Please select a new date to update.");
      return;
    }

    const updatedAppointment = {
      patientId: user.id,
      doctorId:
        selectedDoctor ||
        appointments.find((a) => a.id === appointmentId)?.doctor?.id,
      appointmentDate,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedAppointment),
        }
      );

      if (response.ok) {
        setMessage("Appointment updated successfully!");
        fetchAppointments();
      } else {
        setMessage("Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      setMessage("Something went wrong. Try again.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Appointment deleted successfully!");
        setAppointments(
          appointments.filter((appt) => appt.id !== appointmentId)
        ); // Remove from UI
      } else {
        alert("Failed to delete appointment.");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Something went wrong. Try again.");
    }
  };

  // Inline styles
  const containerStyle = {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f9fafb",
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#374151",
  };

  const inputStyle = {
    border: "1px solid #d1d5db",
    padding: "10px",
    borderRadius: "8px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease",
    fontSize: "1rem",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    backgroundColor: "white",
    cursor: "pointer",
  };

  const buttonStyle = {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1d4ed8",
  };

  const feedbackInputStyle = {
    ...inputStyle,
    marginTop: "5px",
  };

  const feedbackButtonStyle = {
    ...buttonStyle,
    marginTop: "5px",
  };

  const deleteButtonStyle = {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "#b91c1c",
  };

  const messageStyle = {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#dc2626",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Patient Dashboard</h1>

      <div style={cardStyle}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Book an Appointment
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Select Doctor:</label>
          <select
            style={inputStyle}
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Choose a doctor</option>
            {doctors != null &&
              doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.specialization}
                </option>
              ))}
          </select>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Select Date:</label>
          <input
            type="date"
            style={inputStyle}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <button style={buttonStyle} onClick={handleBookAppointment}>
          Book Appointment
        </button>
      </div>

      {appointments.length > 0 && (
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Your Appointments
          </h2>
          <ul>
            {appointments.map(
              (appointment) => (
                console.log("Appointments found:", appointments),
                (
                  <li
                    key={appointment.id}
                    style={{
                      border: "1px solid #d1d5db",
                      padding: "8px",
                      borderRadius: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    <p>
                      <strong>Doctor:</strong> {appointment.doctorId}
                    </p>
                    {/* <p><strong>Specialty:</strong> {appointment.doctor.specialization}</p> */}
                    <p>
                      <strong>Date:</strong> {appointment.appointmentDate}
                    </p>

                    {/* Feedback Form */}
                    <div style={{ marginTop: "8px" }}>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                        Give Feedback
                      </h3>
                      <input
                        type="text"
                        placeholder="Comments"
                        style={feedbackInputStyle}
                        value={newFeedback.comments}
                        onChange={(e) =>
                          setNewFeedback({
                            ...newFeedback,
                            comments: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Rating (1-10)"
                        style={feedbackInputStyle}
                        value={newFeedback.rating}
                        onChange={(e) =>
                          setNewFeedback({
                            ...newFeedback,
                            rating: e.target.value,
                          })
                        }
                      />
                      <button
                        style={feedbackButtonStyle}
                        onClick={() => handleSubmitFeedback(appointment.id)}
                      >
                        Submit Feedback
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      Delete Appointment
                    </button>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      )}

      {feedback.length > 0 && (
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Your Feedback
          </h2>
          <ul>
            {feedback.map((feedbackItem) => (
              <li
                key={feedbackItem.id}
                style={{
                  border: "1px solid #d1d5db",
                  padding: "8px",
                  borderRadius: "6px",
                  marginBottom: "8px",
                }}
              >
                <p>
                  <strong>Doctor:</strong>{" "}
                  {feedbackItem.appointment.doctor.name}
                </p>
                <p>
                  <strong>Specialty:</strong>{" "}
                  {feedbackItem.appointment.doctor.specialization}
                </p>
                <p>
                  <strong>Appointment Date:</strong>{" "}
                  {feedbackItem.appointment.appointmentDate}
                </p>
                <p>
                  <strong>Comments:</strong> {feedbackItem.comments}
                </p>
                <p>
                  <strong>Rating:</strong> {feedbackItem.rating}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default PatientDashboard;

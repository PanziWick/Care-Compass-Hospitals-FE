import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json(); // Use response.text() instead of response.json()

        console.log("Raw response:", data);

        // Hardcode user role based on username
        let role;
        if (formData.username === "admin") {
          role = "ADMIN";
        } else if (formData.username === "staff") {
          role = "STAFF";
        } else if (formData.username === "doctor") {
          role = "DOCTOR";
        } else {
          role = "PATIENT";
        }

        // Store user details in localStorage
        const user = { ...data.user, role };
        const token = data.token;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("User logged in:", user);

        // Navigate based on hardcoded role
        if (role === "ADMIN") {
          navigate("/admindashboard");
        } else if (role === "STAFF") {
          navigate("/doctordashboard");
        } else if (role === "DOCTOR") {
          navigate("/doctordashboard");
        } else {
          // call the getPatientByUserId endpoint to get the patient and set it in local storage
          const patientResponse = await fetch(
            `http://localhost:8080/api/patients/user/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!patientResponse.ok) {
            console.error("Error fetching patient data");
            return;
          }
          const data = await patientResponse.json();
          console.log("Patient data:", data);

          localStorage.setItem("patient", JSON.stringify(data));

          navigate("/patientdashboard");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    height: "100vh",
    flexWrap: "wrap",
    color: "#1e293b",
  };

  const leftPanelStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  };

  const logoStyle = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "48px",
  };

  const logoLinkStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2563eb",
    textDecoration: "none",
  };

  const formContainerStyle = {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "24px",
    maxWidth: "448px",
  };

  const headingStyle = {
    fontSize: "2.25rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
  };

  const subHeadingStyle = {
    marginTop: "24px",
    textAlign: "center",
    fontWeight: "500",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingTop: "32px",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "0.875rem",
  };

  const buttonStyle = {
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "8px 16px",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "#2563eb",
    textDecoration: "none",
  };

  const rightPanelStyle = {
    display: "none",
    position: "relative",
    height: "100vh",
    width: "50%",
    backgroundColor: "#2563eb",
    backgroundImage: "linear-gradient(to bottom right, #2563eb, #1e40af)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div style={containerStyle}>
      <div style={leftPanelStyle}>
        <div style={logoStyle}>
          <a href="#" style={logoLinkStyle}>
            Care Compass Hospitals
          </a>
        </div>
        <div style={formContainerStyle}>
          <h1 style={headingStyle}>
            Welcome <br />
            to <span style={{ color: "#2563eb" }}>Care Compass Hospitals</span>
          </h1>
          <p style={subHeadingStyle}>Sign in to your account below.</p>

          <form style={formStyle} onSubmit={handleSubmit}>
            <div style={inputContainerStyle}>
              <input
                type="text"
                required
                style={inputStyle}
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div style={inputContainerStyle}>
              <input
                type="password"
                required
                style={inputStyle}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <a
              href="#"
              style={{
                textAlign: "center",
                fontSize: "0.875rem",
                color: "#4b5563",
              }}
            >
              Forgot password?
            </a>
            <button type="submit" style={buttonStyle}>
              Sign in
            </button>
          </form>
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <p style={{ color: "#4b5563" }}>
              Don't have an account?{" "}
              <a href="/register" style={linkStyle}>
                Sign up for free.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div style={rightPanelStyle}>
        <img
          style={imageStyle}
          src="https://marketplace.canva.com/EAGS_jwHgMU/1/0/1600w/canva-blue-and-white-illustrative-medical-healthcare-presentation-PdjF3CCiHLs.jpg"
          alt="Healthcare Background"
        />
      </div>
    </div>
  );
};

export default Login;

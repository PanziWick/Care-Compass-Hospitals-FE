import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "PATIENT",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      return;
    }

    try {
      console.log("formData", formData);
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response", response);
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    background: "linear-gradient(to right, #1e3a8a, #2563eb)",
    minHeight: "100vh",
    padding: "24px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "32px",
    backgroundColor: "white",
    maxWidth: "1200px",
    width: "100%",
    boxShadow: "0 2px 10px -3px rgba(6, 81, 237, 0.3)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const leftPanelStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px",
    background: "linear-gradient(to right, #2563eb, #1e40af)",
    width: "100%",
    height: "100%",
  };

  const contentStyle = {
    maxWidth: "448px",
    margin: "0 auto",
  };

  const headingStyle = {
    color: "white",
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const paragraphStyle = {
    color: "#e5e7eb",
    fontSize: "0.8125rem",
    marginTop: "8px",
  };

  const formStyle = {
    padding: "32px",
    width: "100%",
  };

  const formHeadingStyle = {
    color: "#1e293b",
    fontSize: "1.875rem",
    fontWeight: "bold",
    marginBottom: "32px",
  };

  const inputContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    color: "#1e293b",
    fontSize: "0.875rem",
    marginBottom: "8px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "8px 16px",
    border: "1px solid #2563eb",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <div style={leftPanelStyle}>
          <div style={contentStyle}>
            <div>
              <h4 style={headingStyle}>Create Your Account</h4>
              <p style={paragraphStyle}>
                Welcome to our registration page! Get started by creating your
                account.
              </p>
            </div>
            <div>
              <h4 style={headingStyle}>Simple & Secure Registration</h4>
              <p style={paragraphStyle}>
                Our registration process is designed to be straightforward and
                secure. We prioritize your privacy and data security.
              </p>
            </div>
            <div>
              <h4 style={headingStyle}>Terms and Conditions Agreement</h4>
              <p style={paragraphStyle}>
                Require users to accept the terms and conditions of your service
                during registration.
              </p>
            </div>
          </div>
        </div>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "48px" }}>
            <h3 style={formHeadingStyle}>Register Care Compass</h3>
          </div>

          <div style={inputContainerStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>User Name</label>
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

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
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
          </div>

          <div style={{ marginTop: "24px" }}>
            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

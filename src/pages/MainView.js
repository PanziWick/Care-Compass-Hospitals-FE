import React from "react";
import { Link } from "react-router-dom";

function MainView() {
  const headerStyle = {
    backgroundColor: "#1E3A8A",
    padding: "80px 0",
    position: "relative",
    overflow: "hidden",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    color: "white",
    fontSize: "2.25rem",
    fontWeight: "bold",
    fontFamily: "serif",
  };

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 16px",
  };

  const buttonStyle = {
    backgroundColor: "#F97316",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    textDecoration: "none",
  };

  const heroStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const heroTextStyle = {
    color: "white",
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "16px",
  };

  const heroImageStyle = {
    width: "100%",
    height: "auto",
  };

  const sectionStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 16px",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const footerStyle = {
    backgroundColor: "#1E3A8A",
    padding: "48px 16px",
    color: "white",
  };

  return (
    <div style={{ fontFamily: "serif" }}>
      <div style={headerStyle}>
        <div style={containerStyle}>
          <div style={logoStyle}>Care Compass Hospitals</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#" style={navLinkStyle}>
              Home
            </a>
            <a href="#" style={navLinkStyle}>
              Product
            </a>
            <a href="#" style={navLinkStyle}>
              Pricing
            </a>
            <a href="#" style={navLinkStyle}>
              Contact
            </a>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link to="/login" style={buttonStyle}>
              Login
            </Link>
            <Link to="/register" style={buttonStyle}>
              Sign Up
            </Link>
          </div>
        </div>

        <div style={heroStyle}>
          <div style={{ color: "white", textAlign: "center" }}>
            <h1 style={heroTextStyle}>Meet the Best Doctors</h1>
            <p style={{ marginBottom: "32px" }}>
              We are always fully focused on helping your child and you
            </p>
            {/*Inorder to book an appointment, the user needs to be logged in*/}
            <Link to="/login" style={buttonStyle}>
              Book Now
            </Link>
          </div>
          <div>
            <img
              src="https://assets.codepen.io/3617690/hero-doctor.png"
              alt="Hero Doctor"
              style={heroImageStyle}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            left: "0",
            width: "100%",
          }}
        >
          <svg viewBox="0 0 1440 320" style={{ width: "100%", height: "auto" }}>
            <path
              fill="#ffffff"
              d="M0,128L48,160C96,192,192,256,288,240C384,224,480,128,576,122.7C672,117,768,203,864,208C960,213,1056,139,1152,117.3C1248,96,1344,128,1392,144L1440,160L1440,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div style={sectionStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <img
            src="https://assets.codepen.io/3617690/hooli-logo.png"
            alt="Hooli"
          />
          <img
            src="https://assets.codepen.io/3617690/lyat-logo.png"
            alt="Lyat"
          />
          <img
            src="https://assets.codepen.io/3617690/logo-3.png"
            alt="Logo 3"
          />
          <img
            src="https://assets.codepen.io/3617690/stripe-logo.png"
            alt="Stripe"
          />
          <img src="https://assets.codepen.io/3617690/aws-logo.png" alt="AWS" />
          <img
            src="https://assets.codepen.io/3617690/logo-6.png"
            alt="Logo-6"
          />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div>
            <div
              style={{
                width: "48px",
                height: "4px",
                backgroundColor: "#F97316",
                marginBottom: "16px",
              }}
            ></div>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "#1F2937",
                marginBottom: "16px",
              }}
            >
              Our Department
            </h2>
            <p
              style={{
                color: "#4B5563",
                maxWidth: "448px",
                marginBottom: "24px",
              }}
            >
              Care Compass Hospitals is a leading healthcare provider that
              offers a wide range of medical services to patients.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1F2937",
                }}
              >
                Cancer Care
              </h3>
              <div
                style={{
                  width: "48px",
                  height: "4px",
                  backgroundColor: "#EF4444",
                  margin: "4px 0 12px 0",
                }}
              ></div>
              <p style={{ color: "#4B5563" }}>
                The gradual accumulation of information about cancer care.
              </p>
            </div>
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1F2937",
                }}
              >
                Online Appointment
              </h3>
              <div
                style={{
                  width: "48px",
                  height: "4px",
                  backgroundColor: "#EF4444",
                  margin: "4px 0 12px 0",
                }}
              ></div>
              <p style={{ color: "#4B5563" }}>
                The gradual accumulation of information about online
                appointment.
              </p>
            </div>
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1F2937",
                }}
              >
                Book now
              </h3>
              <div
                style={{
                  width: "48px",
                  height: "4px",
                  backgroundColor: "#EF4444",
                  margin: "4px 0 12px 0",
                }}
              ></div>
              <p style={{ color: "#4B5563" }}>
                The gradual accumulation of information about booking.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}
        >
          <h3
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Our Doctors Specialize in you
          </h3>
          <p
            style={{
              color: "#D1D5DB",
              maxWidth: "448px",
              marginBottom: "32px",
            }}
          >
            Care Compass Hospitals is a leading healthcare provider that offers
            a wide range of medical services to patients.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            <div style={cardStyle}>
              <img
                src="https://assets.codepen.io/3617690/cancer-care.png"
                alt="Cancer Care"
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#1F2937",
                    marginBottom: "16px",
                  }}
                >
                  Cancer Care
                </h3>
                <p style={{ color: "#4B5563", marginBottom: "16px" }}>
                  We focus on ergonomics and meeting you where you work. It's
                  only a keystroke away.
                </p>
                <a
                  href="#"
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "white",
                    color: "#3B82F6",
                    border: "1px solid #3B82F6",
                    borderRadius: "9999px",
                    padding: "8px 16px",
                    textDecoration: "none",
                  }}
                >
                  Book Now
                </a>
              </div>
            </div>
            <div style={cardStyle}>
              <img
                src="https://assets.codepen.io/3617690/health-queries.png"
                alt="Health Queries"
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#1F2937",
                    marginBottom: "16px",
                  }}
                >
                  Health Queries
                </h3>
                <p style={{ color: "#4B5563", marginBottom: "16px" }}>
                  We focus on ergonomics and meeting you where you work. It's
                  only a keystroke away.
                </p>
                <a
                  href="#"
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "white",
                    color: "#3B82F6",
                    border: "1px solid #3B82F6",
                    borderRadius: "9999px",
                    padding: "8px 16px",
                    textDecoration: "none",
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
            <div style={cardStyle}>
              <img
                src="https://assets.codepen.io/3617690/quick-examination.png"
                alt="Quick Examination"
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#1F2937",
                    marginBottom: "16px",
                  }}
                >
                  Quick examination
                </h3>
                <p style={{ color: "#4B5563", marginBottom: "16px" }}>
                  We focus on ergonomics and meeting you where you work. It's
                  only a keystroke away.
                </p>
                <a
                  href="#"
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "white",
                    color: "#3B82F6",
                    border: "1px solid #3B82F6",
                    borderRadius: "9999px",
                    padding: "8px 16px",
                    textDecoration: "none",
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainView;

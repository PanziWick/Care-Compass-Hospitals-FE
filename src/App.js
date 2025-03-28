import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainView from "./pages/MainView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

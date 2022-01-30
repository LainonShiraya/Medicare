import LoginPage from "../src/logging_page/logging_page";
import Dashboard from "../src/dashboard/dashboard";
import Navbar from "../src/navbar/navbar";
import Patients from "../src/patients/patients";
import PatientAdd from "../src/patients_add/patients_add";
import PatientDetail from "../src/patient_detail/patient_detail";
import EditProfilePatient from "../src/edit_profile_patient/edit_profile_patient";
import AddAppointment from "../src/add_appointment/add_appointment";
import PrescriptionAdd from "../src/prescription_add/prescriptions_add";
import Register from "../src/register/register";
import "../src/root.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [Auth, setAuth] = useState(localStorage.getItem("loggedKey"));
  const [Role, setRole] = useState(localStorage.getItem("loggedRole"));

  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "pl");
  }
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<LoginPage setAuth={setAuth} setRole={setRole} />}
          />
          {Auth && Role === "Admin" && (
            <Route
              path="/dashboard/:id"
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />
          )}
          {Auth && Role === "Admin" && (
            <Route
              path="/patients"
              element={
                <>
                  <Navbar />
                  <Patients />
                </>
              }
            />
          )}
          {Auth && <Route path="/logout" element={<Navigate to="../" />} />}
          {Auth && Role === "Admin" && (
            <Route
              path="/patients/add"
              element={
                <>
                  <Navbar />
                  <PatientAdd />
                </>
              }
            />
          )}
          {Auth && (
            <Route
              path="/patients/patient/:id"
              element={
                <>
                  <Navbar />
                  <PatientDetail />
                </>
              }
            />
          )}
          {Auth && (
            <Route
              path="/patients/patient/:id/edit"
              element={
                <>
                  <Navbar />
                  <EditProfilePatient />
                </>
              }
            />
          )}
          {Auth && Role === "Admin" && (
            <Route
              path="/patients/patient/:id/appointments/add"
              element={
                <>
                  <Navbar />
                  <AddAppointment />
                </>
              }
            />
          )}
          {Auth && Role === "Admin" && (
            <Route
              path="/patients/patient/:id/referrals/add"
              element={
                <>
                  <Navbar />
                  <PrescriptionAdd />
                </>
              }
            />
          )}
          {Auth && Role === "Admin" && (
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />
          )}
          <Route path="*" element={<Navigate to="../" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

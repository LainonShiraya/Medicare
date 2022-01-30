import "../dashboard/dashboard.css";
import "../general_styles/popout_window/popout_window.css";
import Patient from "../patient/patient";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import axios from "axios";
function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    axios.get("http://localhost:3000/dashboard").then(function (response) {
      if (response.data.error) {
        setError(response.data.error);
      }
      if (response.data[0]) {
        setPatients(response.data);
      }
    });
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-title">
        <h2>{t("translate.Next Appointments")}</h2>
        <hr className="title-underline" />
      </div>
      {error}
      <div className="patients-list user-description">
        {patients.length > 0 &&
          patients.map(patient => (
            <Patient
              key={patient.pesel}
              Pesel={patient.pesel}
              Imie={patient.name}
              Nazwisko={patient.lastName}
              Email={patient.email}
              Wizyta={patient.Visit}
              Godzina={patient.hour}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;

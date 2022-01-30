import React, { useEffect, useState, useRef } from "react";
import "../patients/patients.css";
import Patient from "../patient/patient";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const patientList = useRef(null);
  const input = useRef(null);
  const filterPatients = () => {
    const list = patientList.current.children;
    Array.from(list).forEach(child => {
      if (
        child.innerText
          .toLowerCase()
          .includes(input.current.value.toLowerCase())
      ) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
    });
  };
  useEffect(() => {
    axios.get("http://localhost:3000/patients").then(function (response) {
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
        <div className="dashboard-title-upper">
          <Link to="/patients/add">
            <img
              src="/assets/images/plus.png"
              alt="Add a Patient"
              className="plus-icon"
            />
          </Link>
          <h2>{t("translate.Patients")}</h2>
        </div>
        <hr className="title-underline prescriptions-title-upper-underline" />
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder={t("translate.Search...")}
          onKeyUp={filterPatients}
          ref={input}
        />
      </div>
      <div className="patients-list user-description" ref={patientList}>
        {error}
        {patients.length > 0 &&
          patients.map(patient => (
            <Patient
              key={patient.pesel}
              Pesel={patient.pesel}
              Imie={patient.name}
              Nazwisko={patient.lastName}
              Email={patient.email}
              Wizyta={patient.lastVisit}
            />
          ))}
      </div>
    </div>
  );
};

export default Patients;

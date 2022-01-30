import React, { useEffect, useState } from "react";
import "../patient_detail/patient.detail.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Appointment from "../patient_detail/patient_appointments/patient_appointments";
import Prescription from "../patient_detail/patient_prescriptions/patient_prescriptions";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
const Patient_detail = () => {
  const params = useParams();
  const patientId = params.id;
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [Patient, setPatient] = useState({});
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/patient/${patientId}`)
      .then(function (response) {
        if (response.data.error) {
        }
        if (response.data.appointments) {
          setAppointments(response.data.appointments);
        }
        if (response.data.prescriptions) {
          setPrescriptions(response.data.prescriptions);
        }
        if (response.data) {
          setPatient(response.data);
        }
      });
  }, []);

  const deleteUser = () => {
    swal({
      title: `${t("translate.Are you sure?")}`,
      text: `${t("translate.Are you sure Delete")} ${t("translate.Patient")} ${
        Patient.name
      } ${Patient.lastName} ?`,
      icon: "warning",
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        axios
          .get(`http://localhost:3000/patients/patient/${patientId}/delete`, {
            patient_Id: patientId,
          })
          .then(function (response) {
            if (response.data.error) {
              swal(
                `${t("translate.Error")}`,
                `${response.data.error}`,
                "error"
              );
            } else {
              swal(
                `${t("translate.Deleted")}`,
                ` ${t("translate.Deleted")}  ${Patient.name} ${
                  Patient.lastName
                } !`,
                "success"
              );
              navigate(`/patients`);
            }
          });
      }
    });
  };
  return (
    <div className="main-container">
      <div className="dashboard">
        <div className="dashboard-title">
          <div className="dashboard-title-upper">
            <h2>{t("translate.Pacient")}</h2>
          </div>
          <hr className="title-underline prescriptions-title-upper-underline" />
        </div>
        <div className="dashboard-upper-container">
          <div className="patient-info">
            <div className="image">
              <img
                src={`/assets/images/${patientId}.png`}
                alt={t("translate.Loading...")}
                className="image-avatar"
                onError={e => {
                  e.target.src = "/assets/images/title-logo.png";
                }}
              />
            </div>
            <div className="details">
              <h3>{Patient.name}</h3>
              <h3>{Patient.lastName}</h3>
              <div className="update-button">
                {localStorage.getItem("loggedRole") === "Admin" && (
                  <>
                    <input
                      type="submit"
                      className="button-text button-main button-delete"
                      value={t("translate.Delete")}
                      onClick={deleteUser}
                    />
                  </>
                )}
                <input
                  type="submit"
                  className="button-text button-main"
                  value={t("translate.Update")}
                  onClick={() => navigate(`edit`)}
                />
              </div>
            </div>
          </div>
          <div className="prescriptions-container">
            <div className="dashboard-title">
              <div className="dashboard-title-upper">
                {localStorage.getItem("loggedRole") === "Admin" && (
                  <Link to="appointments/add">
                    <img
                      src="/assets/images/plus.png"
                      alt="Add a Patient"
                      className="plus-icon"
                    />
                  </Link>
                )}
                <h2> {t("translate.Appointments")}</h2>
              </div>
              <hr className="title-underline prescriptions-title-upper-underline" />
            </div>
            {appointments.length > 0 &&
              appointments.map(appointment => (
                <Appointment
                  id={appointment.idBadanie}
                  title={appointment.tytul}
                  visit={appointment.dataWystawienia}
                  hour={appointment.godzina}
                />
              ))}
          </div>
        </div>
        <div className="dashboard-bottom-container">
          <div className="information-container">
            <div className="dashboard-title">
              <h2>Information</h2>
              <hr className="title-underline" />
            </div>
            <div className="patient-information-detail">
              <h4>
                {t("translate.Gender")}:{Patient.gender}
              </h4>
              <h4>
                {t("translate.Blood Type")}: {Patient.blood}
              </h4>
              <h4>
                {t("translate.Allergies")}: {Patient.allergies}
              </h4>
              <h4>
                {t("translate.Diseases")}: {Patient.diseases}
              </h4>
              <h4>
                {t("translate.Height")}:{Patient.height > 0 && Patient.height}
                {Patient.height < 1 && "unknown"}
              </h4>
              <h4>
                {t("translate.Weight")}: {Patient.weight > 0 && Patient.weight}
                {Patient.weight < 1 && "unknown"}
              </h4>
              <h4>
                {t("translate.Last Visit")}: {Patient.lastVisit}
              </h4>
              <h4>
                {t("translate.Email")}:{Patient.email}
              </h4>
              <h4>
                {t("translate.Pesel")}: {Patient.pesel}
              </h4>
            </div>
          </div>
          <div className="appointments-container">
            <div className="dashboard-title">
              <div className="dashboard-title-upper">
                {localStorage.getItem("loggedRole") === "Admin" && (
                  <Link to={`/patients/patient/${patientId}/referrals/add`}>
                    <img
                      src="/assets/images/plus.png"
                      alt="Add a Patient"
                      className="plus-icon"
                      onError={e => {
                        e.target.src = "/assets/images/title-logo.png";
                      }}
                    />
                  </Link>
                )}
                <h2>{t("translate.Receptions")}</h2>
              </div>
              <hr className="title-underline prescriptions-title-upper-underline" />
            </div>
            {prescriptions.length > 0 &&
              prescriptions.map(prescription => (
                <Prescription
                  title={prescription.tytul}
                  visit={prescription.dataWaznosci}
                  expire={prescription.wygasa}
                  description={prescription.opis}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient_detail;

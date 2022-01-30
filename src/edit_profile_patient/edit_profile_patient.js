import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";

const Edit_profile_patient = () => {
  const params = useParams();
  const patientId = params.id;
  const [Errors, setErrors] = useState("");
  const [Patient, setPatient] = useState({});
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3000/patients/patient/${patientId}`)
      .then(function (response) {
        if (response.data.error) {
          setErrors(response.data.error);
        }
        if (response.data) {
          delete response.data.appointments;
          delete response.data.prescriptions;
          setPatient(response.data);
        }
      });
  }, []);

  const updatePatient = () => {
    if (
      Patient.name.length > 0 &&
      Patient.lastName.length > 0 &&
      Patient.email.length > 0 &&
      Patient.email.includes("@") &&
      Patient.email.includes(".")
    ) {
      if (Patient.weight === "") {
        setPatient({ ...Patient, weight: 0 });
      }
      if (Patient.height === "") {
        setPatient({ ...Patient, height: 0 });
      }
      swal({
        title: `${t("translate.Are you sure?")}`,
        text: `${t("translate.Are you sure to Edit")}  ${Patient.name} ${
          Patient.lastName
        } ?`,
        icon: "warning",
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          axios
            .post(`http://localhost:3000/patients/edit/${patientId}`, {
              Patient,
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
                  `${t("translate.Edited")}`,
                  `${t("translate.Edited")} ${Patient.Name} !`,
                  "success"
                );
                navigate(`/patients/patient/${patientId}`);
              }
            });
        }
      });
    } else {
      swal("Oops!", `${t("translate.ErrorData")}`, "error");
    }
  };
  return (
    <div className="edit-profile-container">
      <div className="dashboard-title">
        {Errors}
        <h2 className="edit-profile-text">{t("translate.Edit Profile")}</h2>
        <hr className="title-underline" />
        <div className="update-container">
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.Name")}</span>
            </div>
            <input
              type="text"
              className="input-data"
              name="name"
              placeholder={Patient.name}
              onChange={e => {
                setPatient({ ...Patient, name: e.target.value });
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.LastName")}
              </span>
            </div>
            <input
              type="text"
              className="input-data"
              name="lastName"
              placeholder={Patient.lastName}
              onKeyUp={e => {
                if (
                  !/^[0-9\b]/.test(e.target.value) ||
                  Patient.lastName === ""
                ) {
                  setPatient({ ...Patient, lastName: e.target.value });
                } else {
                  e.target.value = "";
                  swal(
                    `${t("translate.Error")}`,
                    `${t("translate.NoNumbers")}`,
                    "error"
                  );
                }
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.E-mail")}</span>
            </div>
            <input
              type="email"
              className="input-data"
              name="email"
              placeholder={Patient.email}
              onChange={e => {
                setPatient({ ...Patient, email: e.target.value });
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label diseases-container">
              <span className="input-label-text">
                {t("translate.Allergies")}
              </span>
            </div>
            <input
              type="text"
              className="input-data"
              name="allergies"
              placeholder={Patient.allergies}
              onChange={e => {
                setPatient({ ...Patient, allergies: e.target.value });
              }}
            ></input>
          </div>
          <div className="input-container">
            <div className="decorative-label diseases-container">
              <span className="input-label-text">
                {t("translate.Diseases")}
              </span>
            </div>
            <input
              type="text"
              className="input-data"
              name="diseases"
              placeholder={Patient.diseases}
              onChange={e => {
                setPatient({ ...Patient, diseases: e.target.value });
              }}
            ></input>
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.Weight")}</span>
            </div>
            <input
              type="number"
              className="input-data"
              name="waga"
              placeholder={Patient.weight}
              onKeyUp={e => {
                if (/^[0-9\b]/.test(e.target.value) || Patient.weight === "") {
                  setPatient({ ...Patient, weight: e.target.value });
                } else {
                  e.target.value = "";
                  swal(
                    `${t("translate.Error")}`,
                    `${t("translate.NumbersOnly")}`,
                    "error"
                  );
                }
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.Height")}</span>
            </div>
            <input
              type="number"
              className="input-data"
              name="height"
              placeholder={Patient.height}
              onKeyUp={e => {
                if (/^[0-9\b]/.test(e.target.value) || Patient.height === "") {
                  setPatient({ ...Patient, height: e.target.value });
                } else {
                  e.target.value = "";
                  swal(
                    `${t("translate.Error")}`,
                    `${t("translate.NumbersOnly")}`,
                    "error"
                  );
                }
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Blood Type")}
              </span>
            </div>
            <div className="box">
              <select
                onChange={e => {
                  setPatient({ ...Patient, blood: e.target.value });
                }}
              >
                <option>{t("translate.Unknown")}</option>
                <option>A+</option>
                <option>B+</option>
                <option>AB+</option>
                <option>0+</option>
                <option>A-</option>
                <option>B-</option>
                <option>AB-</option>
                <option>0-</option>
              </select>
            </div>
          </div>
          <button className="button-text button-main" onClick={updatePatient}>
            {t("translate.Edit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit_profile_patient;

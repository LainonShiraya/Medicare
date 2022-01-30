import React, { useState } from "react";
import "../patients_add/patients.add.css";
import axios from "axios";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

const Patients_add = () => {
  const [Pesel, setPesel] = useState(0);
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Allergies, setAllergies] = useState("");
  const [Diseases, setDiseases] = useState("");
  const [Weight, setWeight] = useState(0);
  const [Height, setHeight] = useState(0);
  const [Blood, setBlood] = useState("");
  const [Gender, setGender] = useState("");
  const [Error, setError] = useState([]);
  const { t } = useTranslation();

  const submitPatient = () => {
    axios.defaults.withCredentials = true;
    setError([]);
    if (
      LastName.length > 0 &&
      Name.length > 0 &&
      Email.length > 0 &&
      Pesel.length > 0
    ) {
      if (Weight === "") {
        setWeight(0);
      }
      if (Height === "") {
        setHeight(0);
      }
      if (!(Email.includes("@") && Email.includes("."))) {
        swal(
          `${t("translate.Error")}`,
          `${t("translate.EmailCorrect")}`,
          "error"
        );
      } else {
        axios
          .post("http://localhost:3000/patients/add", {
            pesel: Pesel,
            name: Name,
            lastName: LastName,
            email: Email,
            gender: Gender,
            blood: Blood,
            allergies: Allergies,
            diseases: Diseases,
            weight: Weight,
            height: Height,
          })
          .then(function (response) {
            if (response.data.error) {
              swal(
                `${t("translate.Error")}`,
                response.data.error.code,
                "error"
              );
            }
            if (response.data[0]) {
              swal(
                `${t("translate.Added")}`,
                `${LastName} ${LastName} `,
                "success"
              );
            }
          });
      }
    } else {
      if (!(LastName.length > 0)) {
        setError(oldArray => [
          ...oldArray,
          "Proszę uzupełnić kolumnę LastName",
        ]);
      }
      if (!(LastName.length > 0)) {
        setError(oldArray => [
          ...oldArray,
          "Proszę uzupełnić kolumnę LastName",
        ]);
      }
      if (!(Email.length > 0)) {
        setError(oldArray => [...oldArray, "Proszę uzupełnić kolumnę Email"]);
      }
      if (!(Pesel.length > 0)) {
        setError(oldArray => [...oldArray, "Proszę uzupełnić kolumnę Pesel"]);
      }
      console.log(Error);
    }
  };
  return (
    <div className="main-container">
      <div className="edit-profile-container">
        <div className="dashboard-title">
          <h2 className="edit-profile-text"> {t("translate.Add Profile")}</h2>
          <hr className="title-underline" />
          <div className="image">
            <img
              src="/assets/images/lady.png"
              alt="Loading..."
              className="image-avatar-edit"
            />
          </div>
          <div className="update-container">
            <div className="input-container">
              <div className="decorative-label">
                <span className="input-label-text">{t("translate.Pesel")}</span>
              </div>
              <input
                type="number"
                className="input-data"
                onKeyUp={e => {
                  if (/^[0-9\b]/.test(e.target.value) || Pesel === "") {
                    setPesel(e.target.value);
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
                  {t("translate.LastName")}
                </span>
              </div>
              <input
                type="text"
                className="input-data"
                onKeyUp={e => {
                  if (!/^[0-9\b]/.test(e.target.value) || Name === "") {
                    setName(e.target.value);
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
                <span className="input-label-text">
                  {t("translate.LastName")}
                </span>
              </div>
              <input
                type="text"
                className="input-data"
                onKeyUp={e => {
                  if (!/^[0-9\b]/.test(e.target.value) || LastName === "") {
                    setLastName(e.target.value);
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
                <span className="input-label-text">
                  {t("translate.E-mail")}
                </span>
              </div>
              <input
                type="email"
                className="input-data"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <div className="decorative-label diseases-container">
                <span className="input-label-text">
                  {t("translate.Allergies")}
                </span>
              </div>
              <textarea
                className="input-data"
                onChange={e => setAllergies(e.target.value)}
              ></textarea>
            </div>
            <div className="input-container">
              <div className="decorative-label diseases-container">
                <span className="input-label-text">
                  {t("translate.Diseases")}
                </span>
              </div>
              <textarea
                className="input-data"
                onChange={e => setDiseases(e.target.value)}
              ></textarea>
            </div>
            <div className="input-container">
              <div className="decorative-label">
                <span className="input-label-text">
                  {t("translate.Weight")}
                </span>
              </div>
              <input
                type="number"
                className="input-data"
                onKeyUp={e => {
                  if (/^[0-9\b]/.test(e.target.value) || Weight === "") {
                    setWeight(e.target.value);
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
                  {t("translate.Height")}
                </span>
              </div>
              <input
                type="number"
                className="input-data"
                onKeyUp={e => {
                  if (/^[0-9\b]/.test(e.target.value) || Height === "") {
                    setHeight(e.target.value);
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
                  {t("translate.Gender")}
                </span>
              </div>
              <div className="box">
                <select onChange={e => setGender(e.target.value)}>
                  <option>{t("translate.Prefer not to share")}</option>
                  <option>{t("translate.Male")}</option>
                  <option>{t("translate.Female")}</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <div className="decorative-label">
                <span className="input-label-text">
                  {t("translate.Blood Type")}
                </span>
              </div>
              <div className="box">
                <select onChange={e => setBlood(e.target.value)}>
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
            <input
              type="submit"
              className="button-text button-main button-edit-profile"
              value="Add Patient"
              onClick={submitPatient}
            />
            {Error.length > 0 && Error.map(patient => <h4>{patient}</h4>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients_add;

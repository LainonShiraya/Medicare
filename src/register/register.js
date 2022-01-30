import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";

const Register = () => {
  const [workerId, setWorkerId] = useState(0);
  const [Imie, setImie] = useState("");
  const [Email, setEmail] = useState("");
  const [Nazwisko, setNazwisko] = useState("");
  const [Haslo, setHaslo] = useState("");
  let navigate = useNavigate();
  const { t } = useTranslation();
  const submitAccount = () => {
    if (
      !/^[0-9\b]+$/.test(Imie) &&
      !/^[0-9\b]+$/.test(Nazwisko) &&
      /^[0-9\b]+$/.test(workerId) &&
      Email.includes("@")
    ) {
      axios
        .post("http://localhost:3000/addUser", {
          workerId: workerId,
          name: Imie,
          lastName: Nazwisko,
          email: Email,
          password: Haslo,
        })
        .then(response => {
          if (!response.data.err) {
            swal(`${t("translate.Added")}`, response.data, "success");
            navigate(`../}`);
          } else {
            swal(`${t("translate.Error")}`, response.data.err.code, "error");
          }
        });
    } else {
      swal(
        `${t("translate.Error")}`,
        `${t("translate.ProperInputs")}`,
        "error"
      );
    }
  };

  return (
    <div className="main-container">
      <div className="edit-profile-container">
        <div className="dashboard-title">
          <h2 className="edit-profile-text">{t("translate.Register")}</h2>
          <hr className="title-underline" />
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
                if (/^[0-9\b]/.test(e.target.value) || workerId === "") {
                  setWorkerId(e.target.value);
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
              <span className="input-label-text">{t("translate.Name")}</span>
            </div>
            <input
              type="text"
              className="input-data"
              onKeyUp={e => {
                setImie(e.target.value);
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
                setNazwisko(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.Email")}</span>
            </div>
            <input
              type="text"
              className="input-data"
              onKeyUp={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Password")}
              </span>
            </div>
            <input
              type="password"
              className="input-data"
              placeholder="Title"
              value={Haslo}
              onChange={e => {
                setHaslo(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="button-text button-main"
            onClick={submitAccount}
          >
            {t("translate.Register")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

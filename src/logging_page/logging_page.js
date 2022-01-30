import "../logging_page/logging_page.css";
import "../general_styles/popout_window/popout_window.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "../i18n";
const UserURL = "http://localhost:3000";
function LoggingPage({ setAuth, setRole }) {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [usernamePassword, setUsernamePassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const { t } = useTranslation();
  let navigate = useNavigate();
  useEffect(() => {
    setUsernameLogin("");
    setUsernamePassword("");
    setUsernameError("");
    localStorage.clear();
    setAuth(false);
    setRole("unknown");
  }, []);

  const ChangeLanguage = language => {
    localStorage.setItem("lang", language);
    try {
      i18n.changeLanguage(localStorage.getItem("lang"));
    } catch (error) {
      alert("Nie mozna zmienic języka");
    }
  };
  const login = () => {
    axios
      .post(UserURL, {
        username: usernameLogin,
        password: usernamePassword,
      })
      .then(response => {
        if (!response.data.err) {
          localStorage.setItem("loggedKey", true);
          setAuth(localStorage.getItem("loggedKey"));
          localStorage.setItem("loggedUsernameImie", response.data[0].Name);
          localStorage.setItem(
            "loggedUsernameNazwisko",
            response.data[0].Last_name
          );
          localStorage.setItem("loggedRole", response.data[0].Role);
          setRole(localStorage.getItem("loggedRole"));
          if (localStorage.getItem("loggedRole") === "patient") {
            localStorage.setItem(
              "loggedUsernameId",
              response.data[0].Id_patient
            );
            navigate(`/patients/patient/${response.data[0].Id_patient}`);
          } else {
            localStorage.setItem(
              "loggedUsernameId",
              response.data[0].Id_doctor
            );
            navigate(`/dashboard/${response.data[0].Id_doctor}`);
          }
        } else {
          setUsernameError(response.data.err);
          console.log(response.data.err);
        }
      });
  };

  return (
    <div className="login-page-container">
      <div className="main-container">
        <div className="welcome-container">
          <div className="image-container">
            <img
              src="/assets/images/MEDICARE.png"
              alt="Loading..."
              className="logo"
            />
          </div>
          <div className="welcome-container-text">
            <h3 className="title-primary">{t("translate.Welcome Back")}</h3>
            <h5 className="sub-title-basic">
              {t("translate.Login to check the Appointments")}
            </h5>
          </div>
        </div>
        <div className="menu-container">
          <div className="menu">
            <h3 className="description-secondary">{t("translate.Pesel")}</h3>
            <input
              className="login-input"
              type="text"
              name="login"
              onChange={e => {
                setUsernameLogin(e.target.value);
              }}
              required
            />
            <h3 className="description-secondary">{t("translate.Password")}</h3>
            <input
              className="login-input"
              type="password"
              name="password"
              onChange={e => {
                setUsernamePassword(e.target.value);
              }}
              required
            />
            <input
              type="submit"
              className="button-text button-main"
              value="Login"
              onClick={login}
            />
            <h3 className="sub-title-basic">{usernameError}</h3>
            <Link to="/register">
              <h3 className="sub-title-basic"> {t("translate.Register")} </h3>
            </Link>
            <input
              type="submit"
              className="button-text button-main"
              value={t("translate.ChangeLanguagePolish")}
              onClick={() => {
                ChangeLanguage("pl");
              }}
            />
            <input
              type="submit"
              className="button-text button-main"
              value={t("translate.ChangeLanguageEnglish")}
              onClick={() => {
                ChangeLanguage("en");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggingPage;

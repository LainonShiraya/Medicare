import "../navbar/navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Navbar() {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [Uzytkownik, setUzytkownik] = useState({
    Imie: "",
    Nazwisko: "",
    Id: "",
  });

  const ChangeLanguage = language => {
    localStorage.setItem("lang", language);
    try {
      i18n.changeLanguage(localStorage.getItem("lang"));
    } catch (error) {
      alert("Nie mozna zmienic języka");
    }
  };
  useEffect(() => {
    setUzytkownik({
      Imie: localStorage.getItem("loggedUsernameImie"),
      Nazwisko: localStorage.getItem("loggedUsernameNazwisko"),
      Id: localStorage.getItem("loggedUsernameId"),
    });
  }, []);
  const logout = () => {
    axios.get("http://localhost:3000/logout").then(function (response) {
      if (response.data) {
        navigate(`../`);
      }
    });
  };
  return (
    <div className="dashboard-container">
      <div className="user-menu">
        <div className="avatar">
          <div className="image-circle">
            <img
              src={`/assets/images/${Uzytkownik.Id}.png`}
              alt="Loading..."
              className="image-avatar"
              onError={e => {
                e.target.src = "/assets/images/title-logo.png";
              }}
            />
          </div>
          <div className="image-description">
            <h3 className="name-primary">{Uzytkownik.Imie}</h3>
            <h3 className="name-primary">{Uzytkownik.Nazwisko}</h3>
          </div>
        </div>
        <div className="menu-container">
          <h3 className="sub-title-basic menu-hide">MENU</h3>
          <div className="menu-list">
            {localStorage.getItem("loggedRole") === "Admin" && (
              <ul className="list">
                <li className="list-item">
                  <a
                    href={`/dashboard/${Uzytkownik.Id}`}
                    className="sub-title-basic"
                  >
                    {t("translate.Dashboard")}
                  </a>
                </li>
                <li className="list-item">
                  <a href="/patients" className="sub-title-hover">
                    {t("translate.Patients")}
                  </a>
                </li>
              </ul>
            )}
            {localStorage.getItem("loggedRole") === "patient" && (
              <ul className="list">
                <li className="list-item">
                  <a
                    href={`/patients/patient/${Uzytkownik.Id}`}
                    className="sub-title-basic"
                  >
                    {t("translate.Dashboard")}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="dashboard-bottom">
          <hr className="full-line" />
          <input
            type="submit"
            className="button-text button-main"
            value={t("translate.Log out")}
            onClick={logout}
          />
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
  );
}

export default Navbar;

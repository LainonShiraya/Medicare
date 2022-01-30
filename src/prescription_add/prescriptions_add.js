import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import swal from "sweetalert";
const Referrals = () => {
  const params = useParams();
  const { t } = useTranslation();
  const patientId = params.id;
  const [expireDate, setExpireDate] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [extendedDate, setExtendedDate] = useState(0);
  let navigate = useNavigate();
  const submitAppointment = () => {
    if (
      title.length > 0 &&
      extendedDate.length > 0 &&
      notes.length > 0 &&
      expireDate.length > 0
    ) {
      swal({
        title: `${t("translate.Are you sure?")}`,
        text: `${t("translate.Are you sure to Add")}  ${t(
          "translate.Prescription"
        )} ${title}?`,
        icon: "warning",
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          axios
            .post("http://localhost:3000/addreception", {
              patientId: patientId,
              doctorId: localStorage.getItem("loggedUsernameId"),
              expireDate: expireDate,
              title: title,
              notes: notes,
              extendedDate: extendedDate,
            })
            .then(function (response) {
              if (response.data.err) {
                swal(
                  `${t("translate.Error")}`,
                  `${response.data.err.code}`,
                  "error"
                );
              } else {
                swal(
                  `${t("translate.Added")}`,
                  `${t("translate.Added")} ${title}`,
                  "success"
                );
                navigate(`/patients`);
              }
            });
        }
      });
    } else {
      swal(`${t("translate.Error")}`, `${t("translate.ErrorFiled")}`, "error");
    }
  };

  return (
    <div className="main-container">
      <div className="edit-profile-container">
        <div className="dashboard-title">
          <h2 className="edit-profile-text">{t("translate.Add Reception")}</h2>
          <hr className="title-underline" />
        </div>
        <div className="update-container">
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Patient Pesel")}
              </span>
            </div>
            <input
              type="text"
              className="input-data"
              placeholder={patientId}
              disabled
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Doctor ID")}
              </span>
            </div>
            <input
              type="text"
              className="input-data"
              placeholder={localStorage.getItem("loggedUsernameId")}
              disabled
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Visit Date")}
              </span>
            </div>
            <input
              type="date"
              className="input-data input-data-date"
              value={expireDate}
              onChange={e => {
                setExpireDate(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Expire in (days)")}
              </span>
            </div>
            <input
              type="number"
              className="input-data input-data-date"
              onKeyUp={e => {
                if (/^[0-9\b]/.test(e.target.value) || extendedDate === "") {
                  setExtendedDate(e.target.value);
                } else {
                  e.target.value = "";
                  swal(
                    `${t("translate.Error")}  : ${t(
                      "translate.Expire in (days)"
                    )}`,
                    `${t("translate.NumbersOnly")}`,
                    "error"
                  );
                }
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.Title")}</span>
            </div>
            <input
              type="text"
              className="input-data"
              placeholder="Title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">{t("translate.Note")}</span>
            </div>
            <textarea
              className="input-data"
              placeholder="Note"
              value={notes}
              onChange={e => {
                setNotes(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="button-text button-main"
            onClick={submitAppointment}
          >
            {t("translate.Add")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Referrals;

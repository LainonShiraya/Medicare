import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";

const Add_appointment = () => {
  const params = useParams();
  const patientId = params.id;
  const { t } = useTranslation();

  const [visitDate, setVisitDate] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [hour, setHour] = useState("");
  let navigate = useNavigate();
  const submitAppointment = () => {
    console.log(visitDate);
    console.log(title);
    console.log(notes);
    if (
      visitDate.length > 0 &&
      title.length > 0 &&
      notes.length > 0 &&
      hour.length > 0
    ) {
      swal({
        title: `${t("translate.Are you sure?")}`,
        text: `${t("translate.Are you sure to Add")}  ${t(
          "translate.Appointment"
        )} ${title}?`,
        icon: "warning",
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          axios
            .post("http://localhost:3000/addappointment", {
              patientId: patientId,
              doctorId: localStorage.getItem("loggedUsernameId"),
              visitDate: visitDate,
              title: title,
              notes: notes,
              Hour: hour,
            })
            .then(function (response) {
              console.log(response.data);
              if (response.data.err) {
                swal(
                  `${t("translate.Error")}`,
                  `${response.data.err.sqlMessage}`,
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
      alert("Nie mozna zostawic pustych okien ");
    }
  };

  return (
    <div className="main-container">
      <div className="edit-profile-container">
        <div className="dashboard-title">
          <h2 className="edit-profile-text">
            {t("translate.Add Appointment")}
          </h2>
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
              value={visitDate}
              onChange={e => {
                setVisitDate(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <div className="decorative-label">
              <span className="input-label-text">
                {t("translate.Visit Date")}
              </span>
            </div>
            <input
              type="time"
              className="input-data input-data-date"
              onChange={e => {
                setHour(e.target.value.toString());
                console.log(hour);
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

export default Add_appointment;

import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
const Patient_appointments = ({ id, title, visit, hour }) => {
  const role = localStorage.getItem("loggedRole");
  let navigate = useNavigate();

  const deleteUser = () => {
    swal({
      title: `${t("translate.Are you sure?")}`,
      text: `${t("translate.Are you sure Delete")}  ${title} ${t(
        "translate.Appointment"
      )} ?`,
      icon: "warning",
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        axios
          .get(`http://localhost:3000/appointment/delete/${id}`, {
            id,
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
                `${t("translate.Deleted")} ${title}`,
                "success"
              );
              navigate(`/patients`);
            }
          });
      }
    });
  };

  const { t } = useTranslation();
  return (
    <div className="shorten-information">
      <div className="shorten-information-text">
        <h4>
          {t("translate.Tytul")}: {title}
        </h4>
        <h4>
          {" "}
          {t("translate.Data")}: {visit.toString()}
        </h4>
        <h4>
          {" "}
          {t("translate.Hour")}: {hour}
        </h4>
        {role === "Admin" && (
          <button
            className="button-text button-main button-delete"
            onClick={deleteUser}
          >
            {t("translate.Delete")}
          </button>
        )}
      </div>
      <div className="shorten-information-line">
        <hr />
      </div>
    </div>
  );
};

export default Patient_appointments;

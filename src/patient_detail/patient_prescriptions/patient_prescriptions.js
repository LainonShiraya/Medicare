import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../patient_prescriptions/patient_prescriptions.css";

const Patient_prescriptions = ({ title, visit, expire, description }) => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState(false);
  const expandDiv = useRef(null);
  const expand = () => {
    if (!clicked) {
      setClicked(true);
      expandDiv.current.style.display = "block";
    } else {
      setClicked(false);
      expandDiv.current.style.display = "none";
    }
  };
  return (
    <div className="shorten-information" onClick={expand}>
      <div className="shorten-information-text">
        <h4>
          {t("translate.Tytul")}:{title}
        </h4>
        <h4>
          {t("translate.Visit")}:{visit}
        </h4>
        <h4>
          {t("translate.Expire")}:{expire} {t("translate.Days")}
        </h4>
      </div>
      <div className="shorten-information-line">
        <hr />
        <div className="shorten-information-text hide" ref={expandDiv}>
          <span className="shorten-information-text">{description}</span>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Patient_prescriptions;

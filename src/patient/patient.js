import "../patient/patient.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Patient({ Pesel, Imie, Nazwisko, Email, Wizyta, Godzina }) {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const patientInfo = () => {
    navigate(`/patients/patient/${Pesel}`);
  };

  return (
    <div className="patient" onClick={patientInfo}>
      <div className="image">
        <img
          src={`/assets/images/${Pesel}.png`}
          alt={t("translate.Loading...")}
          className="image-avatar"
          onError={e => {
            e.target.src = "/assets/images/title-logo.png";
          }}
        />
      </div>
      <hr />
      <div className="details">
        <h3>{Imie}</h3>
        <h3>{Nazwisko}</h3>
        <div className="time">
          <h3>{Email}</h3>
          <h3>{Wizyta}</h3>
          <h3>{Godzina}</h3>
        </div>
      </div>
    </div>
  );
}

export default Patient;

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../css/UpdateDoctor.css";
import Header from "../Header/Header";
import ViewHealthWorker from "./viewHealthWorker";
import SupervisorService from "../../Services/SupervisorService";
import LoadingComponent from "../Loading/LoadingComponent";

const UpdateHealthWorker = ({action}) => {
  const [village, setVillage] = useState("");
  //   const [subdistrictcode, setSubDistrictcode] = useState("");
  const [villageOptions, setVillageOptions] = useState([]);
  //   const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [allHealWorker, setAllHealthWorker] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("global");
  const valueToPass = action === "Delete" ? "Delete" : "Update";


  useEffect(() => {
    // Fetch district options
    setLoading(true);
    SupervisorService.getVillageWorker(true)
      .then((response) => {
        console.log("Villages: ",response.data);
        setVillageOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
        setLoading(false);
      });
  }, []);

  const handleVillageChange = (e) => {
    const selectedVillage = e.target.value;
    setVillage(selectedVillage);
  };
  if(loading)return <LoadingComponent/>
  return (
    <div>
      <Header />

      <div className="udcon">
        <h4> Choose Village:</h4>
        <div className="form-container">
          <div>
            <label htmlFor="village">{t("UpdateHealthworker.Village")}:</label>
            <select id="village" value={village} onChange={handleVillageChange}>
              <option value="">Select</option>
              {villageOptions.map((village, index) => (
                <option key={index} value={village.code}>
                  {village.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ViewHealthWorker allHealWorker={allHealWorker} village={village} action={valueToPass} />
    </div>
  );
};

export default UpdateHealthWorker;

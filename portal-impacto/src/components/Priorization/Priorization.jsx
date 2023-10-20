// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PriorizationTable from "./PriorizationTable";
import PriorizationFilters from "./PriorizationFilters";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate } from "react-router-dom";

function Priorization() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    week: "",
    vulnerability: "",
    technicalUnit: "",
    equipmentSystem: "",
    description: "",
    status: "",
  });

  const handleFilterChange = (fieldName, value) => {
    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  const handleUploadClick = () => {
    navigate("/upload-priorization");
  };

  return (
    <>
      <h1 className="my-2 text-center">PRIORIZACIÓN</h1>
      <div className="row">
        <div className="col text-start mb-3">
          <ButtonUI
            text="CARGAR PRIORIZACIÓN"
            icon="bi bi-plus-lg"
            onClick={handleUploadClick}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <PriorizationFilters
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <PriorizationTable filters={filters} />
    </>
  );
}

export default Priorization;

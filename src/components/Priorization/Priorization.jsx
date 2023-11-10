// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../UI/ButtonUI";
import PriorizationFilters from "./PriorizationFilters";
import PriorizationTable from "./PriorizationTable";

function Priorization() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    week: "",
    vulnerability: "",
    technicalUnit: "",
    equipmentSystem: "",
    description: "",
    impactoStatus: "",
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
      <h1 className="my-2 text-center mt-3">PRIORIZACIÓN</h1>
      <div className="row">
        <div className="col text-start mb-3">
          <ButtonUI
            text="CARGAR PRIORIZACIÓN"
            icon="bi bi-plus-lg"
            btnClassName="btn-dark"
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

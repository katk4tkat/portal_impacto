import React from "react";
import PriorizationTable from "./PriorizationTable";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate } from "react-router-dom";
import PriorizationFilters from "./PriorizationFilters";

function Priorization() {
  const navigate = useNavigate();

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
          <PriorizationFilters />
        </div>
      </div>
      <PriorizationTable />
    </>
  );
}

export default Priorization;

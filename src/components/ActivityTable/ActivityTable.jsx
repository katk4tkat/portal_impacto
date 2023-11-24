// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../UI/ButtonUI";
import Filters from "./Filters";
import Table from "./Table";

function ActivityTable() {
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
    navigate("/upload-activities");
  };

  return (
    <>
      <section id="week">
        <h1 className="my-2 text-center mt-3">PRIORIZACIÓN DE ACTIVIDADES</h1>
        <div className="row">
          <div className="col text-start mb-3">
            <ButtonUI
              text="CARGAR PRIORIZACIÓN"
              icon="bi bi-upload"
              btnClassName="btn-dark"
              onClick={handleUploadClick}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <Filters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
        <Table filters={filters} />
      </section>
    </>
  );
}

export default ActivityTable;

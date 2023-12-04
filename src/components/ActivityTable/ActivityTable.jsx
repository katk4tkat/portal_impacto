import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../UI/ButtonUI";
import Filters from "./Filters";
import Table from "./Table";

function ActivityTable() {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState("");

  const getWeekNumber = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return (
      Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7) ||
      1
    );
  };

  useEffect(() => {
    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    setCurrentWeek(`semana ${weekNumber}`);
  }, []);

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

  const handleUploadPriorizationClick = () => {
    navigate("/upload-activities");
  };

  const handleCreateActivityClick = () => {
    navigate("/create-activity");
  };

  return (
    <>
      <section id="week">
        <h1 className="my-2 text-center mt-3">PRIORIZACIÓN DE ACTIVIDADES</h1>
        <div className="container-sm bg-info p-3 text-white text-center mb-3">
          <p className="m-0">Actualmente estamos en la {currentWeek}</p>
        </div>
        <div className="row">
          <div className="col d-flex mb-3 justify-content-start gap-3">
            <ButtonUI
              text="CARGAR PRIORIZACIÓN"
              icon="bi bi-upload"
              btnClassName="btn-dark"
              onClick={handleUploadPriorizationClick}
            />
            <ButtonUI
              text="CREAR ACTIVIDAD"
              icon="bi bi-plus-circle"
              btnClassName="btn-dark"
              onClick={handleCreateActivityClick}
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

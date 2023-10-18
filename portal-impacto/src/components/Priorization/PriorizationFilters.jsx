// eslint-disable-next-line no-unused-vars
import React from "react";

function PriorizationFilters() {
  return (
    <>
      <form className="row gx-3 gy-1 align-items-center">
        <div className="col-sm-1">
          <label className="visually-hidden" htmlFor="week-input">
            Semana
          </label>
          <input
            type="text"
            className="form-control"
            id="week-input"
            placeholder="Semana"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="vulnerability-input">
            Vulnerabilidad
          </label>
          <input
            type="text"
            className="form-control"
            id="vulnerability-input"
            placeholder="Vulnerabilidad"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="technical-unit-input">
            Unidad Técnica
          </label>
          <input
            type="text"
            className="form-control"
            id="technical-unit-input"
            placeholder="Unidad Técnica"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="equipment-system-input">
            Equipo Sistema
          </label>
          <input
            type="text"
            className="form-control"
            id="equipment-system-input"
            placeholder="Equipo Sistema"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="impacto-status">
            Estado Impacto
          </label>
          <input
            type="text"
            className="form-control"
            id="impacto-status"
            placeholder="Estado Impacto"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="final-status">
            Estado Final
          </label>
          <input
            type="text"
            className="form-control"
            id="final-status"
            placeholder="Estado Final"
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-secondary">
            Buscar
          </button>
        </div>
      </form>
    </>
  );
}

export default PriorizationFilters;

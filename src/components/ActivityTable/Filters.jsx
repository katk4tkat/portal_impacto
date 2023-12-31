// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function Filters({ handleFilterChange }) {
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
            onChange={(e) => handleFilterChange("week_name", e.target.value)}
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
            onChange={(e) =>
              handleFilterChange("vulnerabilidad_1", e.target.value)
            }
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
            onChange={(e) => handleFilterChange("u_tecnica", e.target.value)}
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
            onChange={(e) =>
              handleFilterChange("equipo_o_sistema", e.target.value)
            }
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="description">
            Descripción
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Descripción"
            onChange={(e) => handleFilterChange("description", e.target.value)}
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="current-status">
            Estado
          </label>
          <input
            type="text"
            className="form-control"
            id="current-status"
            placeholder="Estado"
            onChange={(e) =>
              handleFilterChange("current_status", e.target.value)
            }
          />
        </div>
      </form>
    </>
  );
}

Filters.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filters;

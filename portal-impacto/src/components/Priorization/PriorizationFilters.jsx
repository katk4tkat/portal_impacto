import React from "react";

function PriorizationFilters() {
  return (
    <>
      <form className="row gx-3 gy-1 align-items-center">
        <div className="col-sm-1">
          <label className="visually-hidden" htmlFor="specificSizeInputName">
            Semana
          </label>
          <input
            type="text"
            className="form-control"
            id="specificSizeInputName"
            placeholder="Semana"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="specificSizeInputName">
            Vulnerabilidad
          </label>
          <input
            type="text"
            className="form-control"
            id="specificSizeInputName"
            placeholder="Vulnerabilidad"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="specificSizeInputName">
            Unidad Técnica
          </label>
          <input
            type="text"
            className="form-control"
            id="specificSizeInputName"
            placeholder="Unidad Técnica"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="specificSizeInputName">
            Equipo Sistema
          </label>
          <input
            type="text"
            className="form-control"
            id="specificSizeInputName"
            placeholder="Equipo Sistema"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="specificSizeInputName">
            Estado Impacto
          </label>
          <input
            type="text"
            className="form-control"
            id="specificSizeInputName"
            placeholder="Estado Impacto"
          />
        </div>
        <div className="col-sm-2">
          <label className="visually-hidden" htmlFor="specificSizeInputName">
            Estado Final
          </label>
          <input
            type="text"
            className="form-control"
            id="specificSizeInputName"
            placeholder="Estado Final"
          />
        </div>
        {/* <div className="col-sm-3">
          <label className="visually-hidden" htmlFor="specificSizeSelect">
            Estado Impacto
          </label>
          <select className="form-select" id="specificSizeSelect">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="1">Two</option>
            <option value="3">Three</option>
          </select>
        </div> */}
        {/* <div className="col-auto">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="autoSizingCheck1"
            />
            <label className="form-check-label" htmlFor="autoSizingCheck1">
              Remember me
            </label>
          </div>
        </div> */}
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

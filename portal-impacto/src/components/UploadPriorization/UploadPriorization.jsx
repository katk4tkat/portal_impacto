import React from "react";
import "./upload-priorization.css";
import Navbar from "../Navbar/Navbar"

function UploadPriorization() {
  return (
    <>
    <Navbar/>
    <form className="divlogin">
      <h2>CARGAR PRIORIZACIÓN</h2>
        <input
          type="week"
          id="week"
          placeholder="Semana"
        />
        <select id="team" name="Equipo">
        <option value="impacto">Impacto</option>
        <option value="impacto-acido">Impacto Acido</option>
      </select>
      <input type="file" required/>
      <button>Seleccionar Archivo</button>
        <button>CARGAR PRIOPRIZACIÓN</button>
        </form>
    </>
  );
}

export default UploadPriorization;

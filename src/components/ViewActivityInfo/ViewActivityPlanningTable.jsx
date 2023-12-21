// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";

function ViewActivityPlanningTable({ isLoading, activityPlanningDocument }) {

  console.log(activityPlanningDocument)

  const document = activityPlanningDocument && activityPlanningDocument.length > 0 ? activityPlanningDocument[0].data : {};


  console.log(document);

  return (
    <>
      {activityPlanningDocument && Object.keys(activityPlanningDocument).length !== 0 ? (
        isLoading ? (
          <Spinner />
        ) : (
          <div className="table-responsive">
            <h1 className="my-2 text-center mt-3 mb-3">Planificación de la Actividad</h1>
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th scope="row">N° OT</th>
                  <td colSpan={3}>{document.OT}</td>
                </tr>
                <tr>
                  <th scope="row">Inicio programa</th>
                  <td>{document.program_start}</td>
                  <th scope="row">Inicio real</th>
                  <td>{document.real_program_start}</td>
                </tr>
                <tr>
                  <th scope="row">Fin programa</th>
                  <td>{document.program_end}</td>
                  <th scope="row">Fin real</th>
                  <td>{document.real_program_end}</td>
                </tr>
                <tr>
                  <th scope="row">Duración programa</th>
                  <td>{document.program_duration}</td>
                  <th scope="row">Duración real</th>
                  <td>{document.real_program_duration}</td>
                </tr>
                <tr>
                  <th scope="row">Alcances programa</th>
                  <td>{document.program_scope}</td>
                  <th scope="row">Alcance real</th>
                  <td>{document.real_program_scope}</td>
                </tr>
                <tr>
                  <th scope="row">Descripción detallada de la actividad</th>
                  <td colSpan={3}>{document.detailed_activity_description}</td>
                </tr>
                <tr>
                  <th scope="row">Especificaciones técnicas relevantes</th>
                  <td colSpan={3}>{document.relevant_technical_specifications}</td>
                </tr>
                <tr>
                  <th scope="row">Paso a paso general</th>
                  <td colSpan={3}>{document.general_step_by_step}</td>
                </tr>
                <tr>
                  <th scope="row">Materiales e insumos requeridos</th>
                  <td colSpan={3}>{document.required_material}</td>
                </tr>
                <tr>
                  <th scope="row">Equipos de apoyo requeridos</th>
                  <td colSpan={3}>{document.required_support_equipment}</td>
                </tr>
                <tr>
                  <th scope="row">Estándar técnico</th>
                  <td colSpan={3}>{document.technical_standard}</td>
                </tr>
                <tr>
                  <th scope="row">Procedimiento de trabajo</th>
                  <td colSpan={3}>{document.work_procedure}</td>
                </tr>
                <tr>
                  <th scope="row">Riesgos críticos y controles aplicados</th>
                  <td colSpan={3}>{document.risks_and_controls}</td>
                </tr>
                <tr>
                  <th scope="row">Analálisis de riesgos (¿Qué pasa sí?)</th>
                  <td colSpan={3}>{document.risk_analysis}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="table-responsive">
          <h1 className="my-2 text-center mt-3 mb-3">Planificación de la Actividad</h1>
          <table className="table table-hover table-bordered"></table>
          <p>Sin planificaciones disponibles</p>
        </div>
      )}
    </>
  );
}


ViewActivityPlanningTable.propTypes = {
  isLoading: PropTypes.bool,
  activityPlanningDocument: PropTypes.array,
};
export default ViewActivityPlanningTable;
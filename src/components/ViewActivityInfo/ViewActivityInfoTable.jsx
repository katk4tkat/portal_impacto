// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";

function ViewActivityInfoTable({ weekDocument, activityDocument }) {

  return (
    <>
      <div className="table-responsive">
        <h1 className="my-2 text-center mt-3 mb-3">Información de Actividad</h1>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Empresa:</th>
              <td>
                {weekDocument?.data.team === "impacto_acido"
                  ? "Impacto Ácido"
                  : weekDocument?.data.team === "impacto"
                    ? "Impacto"
                    : weekDocument?.data.team}
              </td>
              <th scope="row">Semana:</th>
              <td> {weekDocument?.data.week_name} </td>
            </tr>
            <tr>
              <th scope="row">Fecha de creación:</th>
              <td> {weekDocument.data.created_at.toDate().toLocaleString()} </td>
              <th scope="row">Creado por:</th>
              <td> {weekDocument.data.created_by}
              </td>
            </tr>
            <tr>
              <th scope="row">Prioridad:</th>
              <td colSpan={3}>{activityDocument.data?.prioridad}</td>
            </tr>
            <tr>
              <th scope="row">N° Aviso:</th>
              <td colSpan={3}>{activityDocument.data?.n_aviso}</td>
            </tr>
            <tr>
              <th scope="row">Equipo o Sistema: </th>
              <td colSpan={3}>{activityDocument.data?.equipo_o_sistema}</td>
            </tr>
            <tr>
              <th scope="row">Unidad Técnica:</th>
              <td colSpan={3}>{activityDocument.data?.u_tecnica}</td>
            </tr>
            <tr>
              <th scope="row">Descripción del Trabajo:</th>
              <td colSpan={3}>{activityDocument.data?.descripcion_del_trabajo}</td>
            </tr>
            <tr>
              <th scope="row">Descripción del Aviso:</th>
              <td colSpan={3}>{activityDocument.data?.descripcion_del_aviso}</td>
            </tr>
            <tr>
              <th scope="row">Vulnerabilidad</th>
              <td colSpan={3}>{activityDocument.data?.vulnerabilidad_1} </td>
            </tr>
          </tbody>
        </table>
      </div >
    </>
  );
}

ViewActivityInfoTable.propTypes = {
  weekDocument: PropTypes.object,
  activityDocument: PropTypes.object,
  activityStatusDocument: PropTypes.object,
  activityLogDocument: PropTypes.object,
};
export default ViewActivityInfoTable;

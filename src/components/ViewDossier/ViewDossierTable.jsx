// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";

function ViewDossierTable({ isLoading, document }) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <tbody>
              <tr>
                <th scope="row">Empresa</th>
                <td>Data 1</td>
                <th scope="row">N° OT</th>
                <td>Data 1</td>
              </tr>
              <tr>
                <th scope="row">Inicio programa</th>
                <td>Data 1</td>
                <th scope="row">Inicio real</th>
                <td>Data 1</td>
              </tr>
              <tr>
                <th scope="row">Fin programa</th>
                <td>Data 1</td>
                <th scope="row">Fin real</th>
                <td>Data 1</td>
              </tr>
              <tr>
                <th scope="row">Duración programa</th>
                <td>Data 1</td>
                <th scope="row">Duración real</th>
                <td>Data 1</td>
              </tr>
              <tr>
                <th scope="row">Alcances programa</th>
                <td>Data 1</td>
                <th scope="row">Alcance real</th>
                <td>Data 1</td>
              </tr>
              <tr>
                <th scope="row">Descripción detallada de la actividad</th>
                <td colSpan={3}>{document.data?.descripcion_del_aviso}</td>
              </tr>
              <tr>
                <th scope="row">Especificaciones técnicas relevantes</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Paso a paso general</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Materiales e insumos requeridos</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Equipos de apoyo requeridos</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Estándar técnico</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Procedimiento de trabajo</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Riesgos críticos y controles aplicados</th>
                <td colSpan={3}>Data 2</td>
              </tr>
              <tr>
                <th scope="row">Analálisis de riesgos (¿Qué pasa sí?)</th>
                <td colSpan={3}>Data 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

ViewDossierTable.propTypes = {
  isLoading: PropTypes.bool,
  document: PropTypes.object,
};
export default ViewDossierTable;

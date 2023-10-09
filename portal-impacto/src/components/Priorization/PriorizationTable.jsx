import React from "react";

function PriorizationTable() {
  return (
    <>
      <div className="table-responsive-xxl">
        <table className="table table-hover">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Semana</th>
              <th scope="col">Vulnerabilidad</th>
              <th scope="col">Unidad Técnica</th>
              <th scope="col">Equipo Sistema</th>
              <th scope="col">Estado Impacto</th>
              <th scope="col">Estado Final</th>
              <th scope="col" colSpan="3" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">07/06/2023</th>
              <td>34</td>
              <td>Cuadrilla 1</td>
              <td>COXI-PSX-EBS-B07</td>
              <td>MOTOBOMBA n°7</td>
              <td>*documento*</td>
              <td>*documento*</td>
              <td>
                <a href="#">Ver Dossier</a>
              </td>
              <td>
                <a href="#">Estado Impacto</a>
              </td>
              <td>
                <a href="#">Ingreso de Registro</a>
              </td>
            </tr>
            <tr>
              <th scope="row">-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <a href="#">Ver Dossier</a>
              </td>
              <td>
                <a href="#">Estado Impacto</a>
              </td>
              <td>
                <a href="#">Ingreso de Registro</a>
              </td>
            </tr>
            <tr>
              <th scope="row">-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <a href="#">Ver Dossier</a>
              </td>
              <td>
                <a href="#">Estado Impacto</a>
              </td>
              <td>
                <a href="#">Ingreso de Registro</a>
              </td>
            </tr>
            <tr>
              <th scope="row">-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <a href="#">Ver Dossier</a>
              </td>
              <td>
                <a href="#">Estado Impacto</a>
              </td>
              <td>
                <a href="#">Ingreso de Registro</a>
              </td>
            </tr>
            <tr>
              <th scope="row">-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <a href="#">Ver Dossier</a>
              </td>
              <td>
                <a href="#">Estado Impacto</a>
              </td>
              <td>
                <a href="#">Ingreso de Registro</a>
              </td>
            </tr>
            <tr>
              <th scope="row">-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <a href="#">Ver Dossier</a>
              </td>
              <td>
                <a href="#">Estado Impacto</a>
              </td>
              <td>
                <a href="#">Ingreso de Registro</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PriorizationTable;

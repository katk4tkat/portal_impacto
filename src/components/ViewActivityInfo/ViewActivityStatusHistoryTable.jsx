// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function ViewActivityStatusHistoryTable({ activityStatusDocument }) {
  const sortedDocuments = activityStatusDocument.sort(
    (a, b) => b.data.created_at.toMillis() - a.data.created_at.toMillis()
  );

  const mostRecentDocument = sortedDocuments[0];

  return (
    <>
      <div className="table-responsive">
        <h1 className="my-2 text-center mt-3 mb-3">Estado Impacto Actual</h1>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Fecha de creación:</th>
              <td>
                {mostRecentDocument?.data.created_at.toDate().toLocaleString()}
              </td>
            </tr>
            <tr>
              <th scope="row">Estado actual:</th>
              <td>{mostRecentDocument?.data.status}</td>
            </tr>
            <tr>
              <th scope="row">Descripción:</th>
              <td>
                {mostRecentDocument?.data.description
                  ? mostRecentDocument.data.description
                  : "Sin descripción."}
              </td>
            </tr>
            <tr>
              <th scope="row">Creado por:</th>
              <td>{mostRecentDocument?.data.created_by}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h2>Historial de Estados:</h2>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="align-middle">
                <th>Fecha de creación</th>
                <th>Estado</th>
                <th>Descripción</th>
                <th>Creado por</th>
              </tr>
            </thead>
            <tbody>
              {sortedDocuments.length >= 1 ? (
                sortedDocuments.slice(1).map((log, index) => (
                  <tr key={index}>
                    <td>{log.data.created_at.toDate().toLocaleString()}</td>
                    <td>{log.data.status}</td>
                    <td>
                      {log.data.description
                        ? log.data.description
                        : "Sin descripción."}
                    </td>
                    <td>{log.data.created_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay historial de estados disponible.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ViewActivityStatusHistoryTable.propTypes = {
  activityStatusDocument: PropTypes.array,
};

export default ViewActivityStatusHistoryTable;

// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function ViewActivityStatusHistoryTable({ activityStatusDocument }) {
  return (
    <div>
      <>
        <div className="table-responsive">
          <h1 className="my-2 text-center mt-3 mb-3">
            Estado Impacto Actual
          </h1>
          <table className="table table-hover table-bordered">
            <tbody>
              <tr>
                <th scope="row">Fecha de creación:</th>
                <td>
                  {activityStatusDocument?.data.created_at
                    .toDate()
                    .toLocaleString()}
                </td>
              </tr>
              <tr>
                <th scope="row">Estado actual:</th>
                <td>{activityStatusDocument?.data.status}</td>
              </tr>
              <tr>
                <th scope="row">Descripción:</th>
                <td>
                  {activityStatusDocument?.data.description
                    ? activityStatusDocument.data.description
                    : "Sin descripción."}
                </td>
              </tr>
              <tr>
                <th scope="row">Creado por:</th>
                <td>{activityStatusDocument?.data.created_by}</td>
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
                {activityStatusDocument?.data?.status_history ? (
                  activityStatusDocument.data.status_history
                    .filter((log) => log && log.previous_created_at)
                    .slice()
                    .sort(
                      (a, b) => b.previous_created_at - a.previous_created_at
                    )
                    .map((log, index) => (
                      <tr key={index}>
                        <td>
                          {log.previous_created_at.toDate().toLocaleString()}
                        </td>
                        <td>{log.previous_status}</td>
                        <td>
                          {log.previous_status_description
                            ? log.previous_status_description
                            : "Sin descripción."}
                        </td>
                        <td>{log.previous_created_by}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      No hay historial de estados disponible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
}

ViewActivityStatusHistoryTable.propTypes = {
  activityStatusDocument: PropTypes.object,
};

export default ViewActivityStatusHistoryTable;

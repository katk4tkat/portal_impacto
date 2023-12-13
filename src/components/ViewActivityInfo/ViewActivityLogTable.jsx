// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewHistoryLogModal from "./ViewHistoryLogModal";

function ViewActivityLogTable({ activityLogDocument }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);

  const sortedDocuments = activityLogDocument.sort(
    (a, b) =>
      b.data.activity_log_created_at.toMillis() -
      a.data.activity_log_created_at.toMillis()
  );

  const openModal = (logId) => {
    setSelectedLogId(logId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedLogId(null);
    setIsModalVisible(false);
  };

  if (!sortedDocuments || sortedDocuments.length === 0) {
    return (
      <>
        <div className="table-responsive">
          <h1 className="my-2 text-center mt-3 mb-3">Registro Actual</h1>
          <table className="table table-hover table-bordered">
            <tbody>
              <tr>
                <td colSpan="2">Sin registros disponibles</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h2>Historial de Registros:</h2>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <td colSpan="2">Sin historial de registros disponible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-4">
        <h2>Historial de Registros:</h2>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="align-middle">
                <th>Fecha de creación</th>
                <th>Descripción de Registro</th>
                <th>Coordenadas GPS</th>
                <th>Creado por</th>
                <th>Descripción de Imagen</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {sortedDocuments.map((log, index) => (
                <tr key={index}>
                  <td>
                    {log?.data.activity_log_created_at
                      ?.toDate()
                      .toLocaleString()}
                  </td>
                  <td>
                    {log?.data.activity_log_description || "Sin descripción."}
                  </td>
                  <td>{log?.data.activity_log_GPS}</td>
                  <td>{log?.data.activity_log_created_by}</td>
                  <td>{log?.data.activity_log_file_description}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => openModal(log.id)}
                    >
                      VER
                    </button>
                    {isModalVisible && selectedLogId === log.id && (
                      <ViewHistoryLogModal
                        activityLogDocument={log}
                        activityLogImage={log?.data.activity_log_file_name}
                        closeModal={closeModal}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ViewActivityLogTable.propTypes = {
  activityLogDocument: PropTypes.array,
  documentId: PropTypes.string,
};

export default ViewActivityLogTable;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewHistoryLogModal from "./ViewHistoryLogModal";

function ViewActivityLogTable({ activityLogDocument }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

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

  const MAX_DESCRIPTION_LENGTH = 50;
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
              {sortedDocuments.length > 1 ? (
                sortedDocuments.map((log, index) => (
                  <tr key={index}>
                    <td>
                      {log?.data.activity_log_created_at
                        ?.toDate()
                        .toLocaleString()}
                    </td>
                    <td className="position-relative" style={{ width: "300px" }}>
                      {log?.data.activity_log_description &&
                        log?.data.activity_log_description.length >
                        MAX_DESCRIPTION_LENGTH ? (
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            {log.data.activity_log_description.slice(
                              0,
                              MAX_DESCRIPTION_LENGTH
                            )}
                          </div>
                          <a
                            className="btns d-flex align-items-center justify-content-center ms-2"
                            role="button"
                            onClick={() => setCollapsed(!collapsed)}
                            data-bs-toggle="collapse"
                            href={`#collapseDescription${index}`}
                            aria-expanded={!collapsed}
                            aria-controls={`collapseDescription${index}`}
                            style={{ height: "30px" }}
                          >
                            <i
                              className={`bi bi-caret-${collapsed ? "up-fill" : "down-fill"
                                }`}
                              style={{ transition: "transform 0.3s ease-in-out" }}
                            ></i>
                          </a>
                        </div>
                      ) : (
                        log?.data.activity_log_description || "Sin descripción."
                      )}
                      <div
                        className="collapse"
                        id={`collapseDescription${index}`}
                      >
                        {log.data.activity_log_description.slice(
                          MAX_DESCRIPTION_LENGTH
                        )}
                      </div>
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
                          activityLogImageDescription={
                            log?.data.activity_log_file_description
                          }
                          closeModal={closeModal}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay historial de registros disponible.</td>
                </tr>
              )}
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

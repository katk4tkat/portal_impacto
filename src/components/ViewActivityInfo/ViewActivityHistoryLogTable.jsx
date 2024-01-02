import React from "react";
import PropTypes from "prop-types";
import { modifiedFieldTranslations } from "../../utils/translations";

function ViewActivityHistoryLogTable({ activityHistoryLogDocument }) {
  const sortedDocuments = activityHistoryLogDocument.sort(
    (a, b) => b.data.modified_at.toMillis() - a.data.modified_at.toMillis()
  );

  return (
    <>
      <div className="mt-4">
        <h2>Historial de Modificaciones:</h2>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="align-middle">
                <th>Fecha de creación</th>
                <th>Campo modificado</th>
                <th>Antes</th>
                <th>Después</th>
                <th>Descripción del cambio</th>
                <th>Modificado por</th>
              </tr>
            </thead>
            <tbody>
              {sortedDocuments.length >= 1 ? (
                sortedDocuments.map((log, index) => (
                  <tr key={index}>
                    <td>{log.data.modified_at.toDate().toLocaleString()}</td>
                    <td>
                      {modifiedFieldTranslations[log.data.modified_field] ||
                        log.data.modified_field}
                    </td>
                    <td>
                      {log.data.old_value
                        ? log.data.old_value
                        : "No hay datos."}
                    </td>
                    <td>
                      {log.data.new_value
                        ? log.data.new_value
                        : "No hay datos."}
                    </td>
                    <td>
                      {log.data.modified_value_description
                        ? log.data.modified_value_description
                        : "Sin descripción."}
                    </td>
                    <td>
                      {log.data.edited_by
                        ? log.data.edited_by
                        : "Sin descripción."}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No hay historial de modificaciones disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ViewActivityHistoryLogTable.propTypes = {
  activityHistoryLogDocument: PropTypes.array,
};

export default ViewActivityHistoryLogTable;

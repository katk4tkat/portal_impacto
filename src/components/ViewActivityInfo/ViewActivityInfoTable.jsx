// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import EditModal from "../EditModal/EditModal";

function ViewActivityInfoTable({ weekDocument, activityDocument, documentId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedFieldName, setEditedFieldName] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (content, fieldName) => {
    setEditedContent(content);
    setEditedFieldName(fieldName);
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="table-responsive">
        <h1 className="my-2 text-center mt-3 mb-3">Información de Actividad</h1>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Empresa:</th>
              <td className="d-flex justify-content-between">
                {weekDocument?.data.team === "impacto_acido"
                  ? "Impacto Ácido"
                  : weekDocument?.data.team === "impacto"
                    ? "Impacto"
                    : weekDocument?.data.team}
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditClick(
                    weekDocument.data.team === "impacto_acido"
                      ? "Impacto Ácido"
                      : weekDocument.data.team === "impacto"
                        ? "Impacto"
                        : weekDocument.data.team,
                    "team"
                  )}
                >
                  <i className="bi bi-pencil" />
                </button>
              </td>
              <th scope="row">Semana:</th>
              <td className="d-flex justify-content-between">
                {activityDocument?.data.week_name}
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() =>
                    handleEditClick(
                      activityDocument.data.week_name,
                      "week_name"
                    )
                  }
                >
                  <i className="bi bi-pencil" />
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Fecha de creación:</th>
              <td>{weekDocument.data.created_at.toDate().toLocaleString()}</td>
              <th scope="row">Creado por:</th>
              <td> {weekDocument.data.created_by}</td>
            </tr>
            <tr>
              <th scope="row">Informado por:</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data.informed_by}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.informed_by,
                        "informed_by"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Prioridad:</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.prioridad}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.prioridad,
                        "prioridad"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">N° Aviso:</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.n_aviso}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(activityDocument.data.n_aviso, "n_aviso")
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Equipo o Sistema: </th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.equipo_o_sistema}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.equipo_o_sistema,
                        "equipo_o_sistema"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Unidad Técnica:</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.u_tecnica}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.u_tecnica,
                        "u_tecnica"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Descripción del Trabajo:</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.descripcion_del_trabajo}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.descripcion_del_trabajo,
                        "descripcion_del_trabajo"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Descripción del Aviso:</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.descripcion_del_aviso}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.descripcion_del_aviso,
                        "descripcion_del_aviso"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Vulnerabilidad</th>
              <td colSpan={3}>
                <div className="d-flex justify-content-between">
                  {activityDocument.data?.vulnerabilidad_1}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleEditClick(
                        activityDocument.data.vulnerabilidad_1,
                        "vulnerabilidad_1"
                      )
                    }
                  >
                    <i className="bi bi-pencil" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalVisible && (
        <EditModal
          fieldName={editedFieldName}
          content={editedContent}
          documentId={documentId}
          setIsModalVisible={setIsModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
}

ViewActivityInfoTable.propTypes = {
  documentId: PropTypes.string,
  weekDocument: PropTypes.object,
  activityDocument: PropTypes.object,
  activityStatusDocument: PropTypes.object,
  activityLogDocument: PropTypes.object,
};
export default ViewActivityInfoTable;

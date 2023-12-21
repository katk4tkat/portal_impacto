import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  createActivityHistoryLogDocument,
  updateFieldInActivity,
  getCurrentActivityInfo,
} from "../../utils/firebase";

function EditModal({
  content,
  setIsModalVisible,
  onClose,
  documentId,
  fieldName,
}) {
  const [editedContent, setEditedContent] = useState(content);
  const [inputChangeDescription, setInputChangeDescription] = useState("");
  const [inputChangeUser, setInputChangeUser] = useState("")

  const handleSave = async (newContent) => {
    const user = localStorage.getItem("userEmail");
    try {
      const previousActivityInfoResult = await getCurrentActivityInfo(
        documentId
      );
      console.log("previousActivityInfoResult:", previousActivityInfoResult);

      if (previousActivityInfoResult && previousActivityInfoResult.data) {
        const historyData = {
          activity: documentId,
          modified_table_name: "Activity",
          modified_field: fieldName,
          modified_at: new Date(),
          modified_by: user,
          edited_by: inputChangeUser,
          old_value: previousActivityInfoResult.data[fieldName],
          modified_value_description: inputChangeDescription,
          status: "",
        };

        createActivityHistoryLogDocument(historyData);

        await updateFieldInActivity(documentId, fieldName, newContent);

        setIsModalVisible(false);
      } else {
        console.error("Datos no disponibles o estructura incorrecta");
      }
    } catch (error) {
      console.error("Error al manejar el guardado: ", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleInputChangeDescription = (e) => {
    setInputChangeDescription(e.target.value);
  };

  const handleInputChangeUser = (e) => {
    setInputChangeUser(e.target.value);
  };

  const handleSaveChanges = () => {
    handleSave(editedContent);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              EDITAR CONTENIDO
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <label htmlFor="editedContent" className="form-label">
              Contenido:
            </label>
            <input
              type="text"
              className="form-control"
              id="editedContent"
              value={editedContent}
              onChange={handleInputChange}
            />
            <label htmlFor="editedBy" className="form-label">
              Editado por:
            </label>
            <input
              type="text"
              className="form-control"
              id="editedBy"
              value={inputChangeUser}
              placeholder="Nombre + Apellido"
              onChange={handleInputChangeUser}
            />
            <label htmlFor="inputChangeDescription" className="form-label">
              Descripción del cambio:
            </label>
            <textarea
              className="form-control"
              id="inputChangeDescription"
              rows="3"
              value={inputChangeDescription}
              onChange={handleInputChangeDescription}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
EditModal.propTypes = {
  documentId: PropTypes.string,
  setIsModalVisible: PropTypes.func,
  onClose: PropTypes.func,
  fieldName: PropTypes.string,
};

export default EditModal;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { createHistoryLogDocument } from "../../utils/firebase";

function EditModal({
  content,
  setIsModalVisible,
  onClose,
  documentId,
  fieldName,
}) {
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = (newContent) => {
    const user = localStorage.getItem("userEmail");

    const newData = {};

    const historyData = {
      // ID del log.
      activity: documentId,
      modified_table_name: "",
      modified_field: fieldName,
      modified_at: new Date(),
      modified_by: user,
      input_change_description: "",
      previous_activity_info: {},
      current_activity_info: newData,
      status: "",
    };

    createHistoryLogDocument(historyData);
    console.log(newContent);
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value);
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
              Edit Content
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
              Edited Content:
            </label>
            <input
              type="text"
              className="form-control"
              id="editedContent"
              value={editedContent}
              onChange={handleInputChange}
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
  content: PropTypes.string,
  setIsModalVisible: PropTypes.func,
  onClose: PropTypes.func,
  fieldName: PropTypes.string,
};

export default EditModal;

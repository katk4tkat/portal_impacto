import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  createActivityHistoryLogDocument,
  updateFieldInActivity,
  getCurrentActivityInfo,
} from "../../utils/firebase";
import Spinner from "../UI/Spinner.jsx";

function EditModal({
  content,
  setIsModalVisible,
  onClose,
  documentId,
  fieldName,
}) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      changeContent: content,
      editedBy: "",
      changeDescription: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const user = localStorage.getItem("userEmail");
      const { changeContent, editedBy, changeDescription } = formData;

      if (!changeContent || !editedBy || !changeDescription) {
        toast.error("Debes completar todos los campos.");
        return;
      }

      const previousActivityInfoResult = await getCurrentActivityInfo(
        documentId
      );

      if (previousActivityInfoResult && previousActivityInfoResult.data) {
        const historyData = {
          activity: documentId,
          modified_table_name: "Activity",
          modified_field: fieldName,
          modified_at: new Date(),
          modified_by: user,
          edited_by: editedBy,
          old_value: previousActivityInfoResult.data[fieldName],
          new_value: changeContent,
          modified_value_description: changeDescription,
          status: "",
        };
        setIsLoading(true);

        createActivityHistoryLogDocument(historyData);
        await updateFieldInActivity(documentId, fieldName, changeContent);

        setIsLoading(false);

        toast.success("Cambios exitosamente guardados!");
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error al manejar el guardado: ", error);
      toast.error("Error al manejar el guardado");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="form-group">
                <label htmlFor="changeContent" className="form-label">
                  Contenido:
                </label>
                <Controller
                  name="changeContent"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="changeContent"
                      type="text"
                      className="form-control"
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editedBy" className="form-label">
                  Modificado por:
                </label>
                <Controller
                  name="editedBy"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      id="editedBy"
                      placeholder="Nombre + Apellido"
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label htmlFor="changeDescription" className="form-label">
                  Descripción del cambio:
                </label>
                <Controller
                  name="changeDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="form-control"
                      id="changeDescription"
                      rows="3"
                    />
                  )}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>

        <ToastContainer
          className="custom-toast"
          position="top-right"
          autoClose={3000}
          hideProgressBar
        />
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

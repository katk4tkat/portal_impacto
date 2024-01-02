import React, { useEffect, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  createActivityHistoryLogDocument,
  updateFieldInActivity,
  getCurrentActivityInfo,
} from "../../utils/firebase";
import { loadOptions } from "../../utils/loadOptions";

import { isRequiredWeekValid } from "../../utils/handleFormErrors.js";
import Spinner from "../UI/Spinner.jsx";

function EditModal({
  fieldName,
  content,
  documentId,
  modalRef,
  isVisible,
  closeModal,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setError, clearErrors, formState, reset } =
    useForm({
      defaultValues: {
        changeContent: content,
        editedBy: "",
        changeDescription: "",
      },
    });

  const [selectedOption, setSelectedOption] = useState({
    label: content,
    value: content,
  });

  useEffect(() => {
    if (isVisible && modalRef.current) {
      // Muestra el modal usando jQuery (Bootstrap)
      window.$(modalRef.current).modal("show");
    } else if (!isVisible && modalRef.current) {
      // Oculta el modal usando jQuery (Bootstrap)
      window.$(modalRef.current).modal("hide");
    }
  }, [isVisible, modalRef]);

  const onSubmit = async (formData) => {
    try {
      const { changeContent, editedBy, changeDescription } = formData;

      // Validations
      if (!changeContent) throw new Error("El contenido no puede estar vacío.");
      if (!editedBy) throw new Error("El campo 'Modificado por' es requerido.");
      if (!changeDescription) {
        throw new Error("El campo 'Descripción del cambio' es requerido.");
      }

      clearErrors("changeContent");
      if (fieldName === "week_name" && !isRequiredWeekValid(changeContent)) {
        setError("changeContent", {
          type: "manual",
          message:
            "El formato de la semana no es válido. Debe ser año-semana ('AAAA-SS').",
        });
        return;
      }

      // Fetch previous activity info
      const previousActivityInfoResult = await getCurrentActivityInfo(
        documentId
      );
      if (!previousActivityInfoResult) {
        throw new Error("Actividad no encontrada.");
      }

      // Prepare Payload
      const user = localStorage.getItem("userEmail");
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

      // Update activity info
      setIsLoading(true);
      await createActivityHistoryLogDocument(historyData);
      await updateFieldInActivity(documentId, fieldName, changeContent);
      setIsLoading(false);

      // Return
      toast.success("Cambios exitosamente guardados!");
      reset({
        changeContent: "",
        editedBy: "",
        changeDescription: "",
      });

      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error al manejar el guardado: ", error);
      toast.error(`Error al manejar el guardado ${error.message}`);
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
      ref={modalRef}
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
                data-bs-toggle="modal"
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
                    <>
                      {fieldName === "u_tecnica" ? (
                        <AsyncCreatableSelect
                          isClearable
                          isSearchable
                          cacheOptions
                          defaultOptions
                          loadOptions={loadOptions}
                          value={selectedOption}
                          placeholder={content}
                          onChange={(newValue) => setSelectedOption(newValue)}
                        />
                      ) : (
                        <>
                          <input
                            {...field}
                            id="changeContent"
                            type="text"
                            className="form-control"
                            placeholder={content}
                          />
                          {formState.errors.changeContent && (
                            <p className="text-danger">
                              {formState.errors.changeContent.message}
                            </p>
                          )}
                        </>
                      )}
                    </>
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
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="form-control"
                        id="editedBy"
                        placeholder="Nombre Apellido"
                      />
                      {formState.errors.editedBy && (
                        <p className="text-danger">
                          {formState.errors.editedBy.message}
                        </p>
                      )}
                    </>
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
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <>
                      <textarea
                        {...field}
                        className="form-control"
                        id="changeDescription"
                        rows="3"
                      />
                      {formState.errors.changeDescription && (
                        <p className="text-danger">
                          {formState.errors.changeDescription.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
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

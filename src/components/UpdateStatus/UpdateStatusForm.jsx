// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { updateData } from "../../utils/firebase.js";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

function UpdateStatusForm({ documentId }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      impactoStatus: "",
      impactoStatusDescription: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const user = localStorage.getItem("userEmail");
      const { impactoStatus, impactoStatusDescription } = formData;

      if (!impactoStatus || !impactoStatusDescription) {
        toast.error(
          "Ha ocurrido un error: Debe completar el estado y la descripción."
        );
        return;
      }

      const updatedStatus = {
        updatedBy: user,
        updatedDate: new Date(),
        impactoStatus,
        impactoStatusDescription,
      };

      updateData(documentId, updatedStatus);

      toast.success("Estado actualizado exitosamente");
      reset({
        impactoStatus: "",
        impactoStatusDescription: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Ha ocurrido un error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xl">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4"> ACTUALIZAR ESTADO IMPACTO</h2>
              <div className="form-group">
                <label htmlFor="impactoStatus">Ingresar Estado:</label>
                <Controller
                  name="impactoStatus"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="form-control"
                      id="impactoStatus"
                    >
                      <option value="" defaultValue>
                        Seleccione un Estado
                      </option>
                      <option value="ACEPTADO">Aceptado</option>
                      <option value="RECHAZADO">Rechazado</option>
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="PROGRAMADO">Programado</option>
                      <option value="EJECUTADO">Ejecutado</option>
                      <option value="REPETIDO">Repetido</option>
                      <option value="OTRO">Otro</option>
                    </select>
                  )}
                />
              </div>
              <div className="form-group">
                <label htmlFor="impactoStatusDescription">
                  Descripción u observación:
                </label>
                <Controller
                  name="impactoStatusDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="impactoStatusDescription"
                      className="form-control"
                      placeholder="Escribe una descripción"
                    />
                  )}
                />
              </div>
              <div className="form-group d-flex text-center justify-content-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block text-center mt-3"
                >
                  AGREGAR ESTADO IMPACTO
                </button>
              </div>
              <ToastContainer
                className="custom-toast"
                position="top-right"
                autoClose={3000}
                hideProgressBar
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

UpdateStatusForm.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default UpdateStatusForm;

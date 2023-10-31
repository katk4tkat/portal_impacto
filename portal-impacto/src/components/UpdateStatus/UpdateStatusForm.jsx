// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateData } from "../../firebase/firebase";

function AddStatusForm() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
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

      toast.success("Estado Impacto guardado exitosamente");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Ha ocurrido un error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">ESTADO IMPACTO</h2>
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
                      <option value="accepted">Aceptado</option>
                      <option value="rejected">Rechazado</option>
                      <option value="pending">Pendiente</option>
                      <option value="scheduled">Programado</option>
                      <option value="executed">Ejecutado</option>
                      <option value="repeated">Repetido</option>
                      <option value="other">Otro</option>
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

export default AddStatusForm;

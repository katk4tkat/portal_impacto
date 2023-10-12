import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useForm, Controller } from "react-hook-form";
import { priorizationData } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadPriorizationForm() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const { control, handleSubmit, reset } = useForm({});

  const onSubmit = async (formData) => {
    console.log(data);
    try {
      const user = localStorage.getItem("userEmail");
      const date = new Date().toISOString();
      const { team, week } = formData;
      const uploadPriorizationObject = {
        date,
        week,
        team,
        user,
        data: data,
      };
      await priorizationData(uploadPriorizationObject);

      console.log("Datos a enviar a Firestore:", uploadPriorizationObject);

      toast.success("Priorización importada correctamente");
      reset();
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
              <h2 className="text-center mb-4">CARGAR PRIORIZACIÓN</h2>
              <div className="form-group">
                <label htmlFor="semana">Semana:</label>
                <Controller
                  name="week"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="week"
                      placeholder="Semana"
                      className="form-control"
                      required
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label htmlFor="equipo">Equipo:</label>
                <Controller
                  name="team"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="form-control">
                      <option value="impacto">Impacto</option>
                      <option value="impacto-acido">Impacto Acido</option>
                    </select>
                  )}
                />
              </div>
              <div className="form-group">
                <label htmlFor="file">Archivo:</label>
                <Controller
                  name="file"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="file"
                      className="form-control"
                      onChange={handleFileUpload}
                    />
                  )}
                />
              </div>
              <div className="form-group d-flex text-center justify-content-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block text-center mt-3"
                >
                  CARGAR PRIORIZACIÓN
                </button>
              </div>
              <ToastContainer
                class="custom-toast"
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

export default UploadPriorizationForm;

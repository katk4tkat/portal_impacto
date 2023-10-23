import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useForm, Controller } from "react-hook-form";
import { priorizationData, uploadFile } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./upload-priorization-form.css";
import { isWeekValid } from "./handleFormErrors";

function UploadPriorizationForm() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const { control, handleSubmit, reset } = useForm({});

  const handleExcelFileUploadAndParse = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetNames = ["Impacto", "Impacto ácido"];
      const rawData = {};
      sheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        rawData[sheetName] = XLSX.utils.sheet_to_json(sheet);
      });
      const preProcessedData = Object.values(rawData).map((thisTeam) => {
        const values = Object.values(thisTeam).map((thisValue) =>
          Object.values(thisValue)
        );
        return values;
      });
      const parsedData = [];
      const headers = preProcessedData[0][0];
      const dataByTeam = preProcessedData;
      dataByTeam.forEach((sheetData) => {
        sheetData.forEach((thisRow) => {
          const currentObject = {};
          thisRow.forEach((thisValue, index) => {
            const currentHeader = headers[index];
            currentObject[currentHeader] = thisValue;
          });
          parsedData.push(currentObject);
        });
      });
      console.log(parsedData);

      //TODO
      // Pasar todos los headers a minuscula, sin caracteres especiales, sin espacios
      // la tabla debe renderear directamente los datos de la base de datos, sin tener que parsear nada
      // Antes de subir los datos a firebase, hay que verificar que el formulario haya pasado ANTES, sino rebotar si o si el archivo

      setData(parsedData);
    };
  };

  const onSubmit = async (formData) => {
    try {
      const user = localStorage.getItem("userEmail");
      const date = new Date().toISOString();
      const { week, team } = formData;

      if (team !== undefined && isWeekValid(week)) {
        const fileName = `${week}`;

        const uploadPriorizationObject = {
          date,
          week,
          team,
          user,
          data,
          fileName,
        };

        uploadFile(file, week);
        await priorizationData(uploadPriorizationObject);

        console.log("Datos a enviar a Firestore:", uploadPriorizationObject);

        toast.success("Priorización importada correctamente");
        reset();
      } else {
        toast.error(
          "Ha ocurrido un error: Debe completar campos de team, week (en formato 'YYYY-WWW'), year y seleccionar un archivo."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Ha ocurrido un error: ${error.message}`);
      // Este catch deberia eliminar el archivo excel si es que lo guardo
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
                <label htmlFor="week">Semana:</label>
                <Controller
                  name="week"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="week"
                      placeholder="Ejemplo: 2023-W37"
                      className="form-control"
                      required
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label htmlFor="team">Equipo:</label>
                <Controller
                  name="team"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="form-control" id="team">
                      <option disabled selected>
                        Selecciona un equipo
                      </option>
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
                      id="file"
                      className="form-control"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        handleExcelFileUploadAndParse(e);
                      }}
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

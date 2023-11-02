// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { addPriorization, uploadFile } from "../../utils/firebase.js";
import { isWeekValid } from "./handleFormErrors";
import { formatHeader } from "../../utils/formatHeader";
import "./upload-priorization-form.css";
import "react-toastify/dist/ReactToastify.css";

function UploadPriorizationForm() {
  const [dataContent, setDataContent] = useState([]);
  const [file, setFile] = useState(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      week: "",
      team: "",
    },
  });

  const handleExcelFileUploadAndParse = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const parsedData = [];

      const relevantSheets = ["Impacto", "Impacto ácido"];

      relevantSheets.forEach((sheetName) => {
        if (workbook.SheetNames.includes(sheetName)) {
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
          const headers = data.length > 0 ? Object.keys(data[0]) : [];

          const formattedData = data.map((row) => {
            const newRow = {};
            headers.forEach((header) => {
              newRow[formatHeader(header)] = row[header];
            });
            return newRow;
          });

          parsedData.push({
            sheetName,
            data: formattedData,
          });
        }
      });
      setDataContent(parsedData);
    };
  };

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const user = localStorage.getItem("userEmail");
      const impactoStatus = "RECIBIDO-MSMIN";
      const { week, team } = formData;

      if (!team || !isWeekValid(week)) {
        toast.error(
          "Ha ocurrido un error: Debe completar campos de equipo, semana y seleccionar un archivo."
        );
        return;
      }

      const activities = dataContent.filter((thisTeam) => {
        return formatHeader(thisTeam.sheetName) === team;
      });

      const parsedData = [];
      const table = activities[0].data;
      const headers = Object.values(table[0]).map((header) =>
        formatHeader(header)
      );
      const rows = table.slice(1);
      rows.forEach((thisRow) => {
        const newRow = {};
        headers.forEach((thisHeader, index) => {
          newRow[thisHeader] = Object.values(thisRow)[index] || null;
        });
        newRow.fileName = `${week}.xlsx`;
        newRow.weekName = week;
        newRow.uploadedBy = user;
        newRow.createdAt = new Date();
        newRow.team = team;
        newRow.impactoStatus = impactoStatus;
        parsedData.push(newRow);
      });
      setDataContent(parsedData);

      const addPriorizationPromises = parsedData.map((data) =>
        addPriorization(data)
      );
      await Promise.all(addPriorizationPromises);

      uploadFile(file, week);

      toast.success("Priorización importada correctamente");
      reset({
        week: "",
        team: "",
      });

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
                      <option value="" defaultValue>
                        Seleccione un equipo
                      </option>
                      <option value="impacto">Impacto</option>
                      <option value="impacto_acido">Impacto Acido</option>
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

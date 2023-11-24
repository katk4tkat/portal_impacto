// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  createWeekDocument,
  createActivityDocument,
  createActivityStatusHistoryDocument,
  uploadPriorizationFile,
} from "../../utils/firebase.js";
import { isWeekValid } from "./handleFormErrors.js";
import { formatHeader } from "../../utils/formatHeader.js";
import "./upload-activities-form.css";
import "react-toastify/dist/ReactToastify.css";

function UploadActivitiesForm() {
  const [dataContent, setDataContent] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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

  const onSubmit = async (formData) => {
    try {
      const user = localStorage.getItem("userEmail");
      const impactoStatusDefault = "RECIBIDO-MSMIN";
      const { week, team } = formData;

      if (!team || !isWeekValid(week)) {
        toast.error(
          "Ha ocurrido un error: Debe completar campos de equipo, semana y seleccionar un archivo."
        );
        return;
      }

      // Select the proper sheet by "team"
      const rawActivities = dataContent.filter((thisTeam) => {
        return formatHeader(thisTeam.sheetName) === team;
      });

      // Create a new Week document in firebase
      const newWeek = {
        created_at: new Date(),
        created_by: user,
        team: team,
        week_name: week,
        file_name: `${week}.xlsx`,
      };
      const weekRef = await createWeekDocument(newWeek);

      // Parse data from sheet, and save documents
      const table = rawActivities[0].data;
      const headers = Object.values(table[0]).map((header) =>
        formatHeader(header)
      );
      const rows = table.slice(1);

      // Generate activities from sheet data to an array of activity promises
      const activityPromises = rows.map((thisRow) => {
        const activity = {};
        headers.forEach((thisHeader, index) => {
          activity[thisHeader] = Object.values(thisRow)[index] || null;
        });
        activity.week_id = weekRef.id;
        activity.week_name = week;
        activity.created_by = user;
        activity.created_at = new Date();
        activity.current_status = impactoStatusDefault;

        return createActivityDocument(activity);
      });
      const activities = await Promise.all(activityPromises);

      // Create ActivityStatusHistoryPromises with newly created activities
      // This return a promise of a createActivityStatusHistoryDocument in order to save every ActivityStatusHistory
      const activityStatusHistoryPromises = activities.map((thisActivity) => {
        const newHistoryRecord = {
          created_at: new Date(),
          created_by: user,
          status: impactoStatusDefault,
          description: "",
          activity: thisActivity.id,
        };
        return createActivityStatusHistoryDocument(newHistoryRecord);
      });
      await Promise.all(activityStatusHistoryPromises);

      // Save assets
      uploadPriorizationFile(file, week);

      // Set state data & done
      setDataContent(activities);

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
      <div className="d-flex justify-content-center">
        <div className="col-md-7">
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
                      className="form-control mb-3"
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
                    <select {...field} className="form-control mb-3" id="team">
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
                      className="form-control mb-3"
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

export default UploadActivitiesForm;

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  uploadActivityLogFile,
  createActivityLogDocument,
} from "../../utils/firebase.js";
import { getCurrentLocation } from "../../utils/getGPS.js";
import Spinner from "../UI/Spinner.jsx";
import "react-toastify/dist/ReactToastify.css";

function UploadActivityLog({ documentId }) {
  const [currentGPS, setCurrentGPS] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      activity_log_description: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activity_log_files",
  });

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      toast.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  const isSpeechRecognitionSupported = () => {
    return (
      "SpeechRecognition" in window ||
      "webkitSpeechRecognition" in window ||
      "mozSpeechRecognition" in window ||
      "msSpeechRecognition" in window
    );
  };

  const handleGetGPS = async () => {
    try {
      const gps = await getCurrentLocation();
      setCurrentGPS(gps);
    } catch (error) {
      console.error("Error getting GPS coordinates:", error);
      toast.error(`Error getting GPS coordinates: ${error.message}`);
    }
  };

  const handleFileChange = (index, file) => {
    setValue(`activity_log_files[${index}]`, file);
    const newDescriptions = [...imageDescriptions];
    newDescriptions[index] = "";
    setImageDescriptions(newDescriptions);
  };

  const startListening = () => {
    if (!isListening) {
      try {
        const SpeechRecognition =
          window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;

        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setDescriptionInput(text);
          stopListening();
          console.log(descriptionInput);
        };

        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast.error(`Error starting speech recognition: ${error.message}`);
      }
    } else {
      stopListening();
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const renderButtonText = isListening ? (
    <>
      <i className="bi bi-mic-mute align-middle"></i>
      &nbsp;DETENER GRABACIÓN POR VOZ
    </>
  ) : (
    <>
      <i className="bi bi-mic align-middle"></i>
      &nbsp;INICIAR GRABACIÓN POR VOZ
    </>
  );

  const onSubmit = async (data) => {
    try {
      const user = localStorage.getItem("userEmail");

      if (!currentGPS || !descriptionInput) {
        toast.error(
          "Ha ocurrido un error: Debe completar las coordenadas GPS y la descripción del registro."
        );
        return;
      }

      setIsLoading(true);

      if (data.activity_log_files && data.activity_log_files.length > 0) {
        for (let i = 0; i < data.activity_log_files.length; i++) {
          const file = data.activity_log_files[i];
          const uploadedFile = await uploadActivityLogFile([file]);

          const fileDocument = {
            activity: documentId,
            activity_log_created_by: user,
            activity_log_created_at: new Date(),
            activity_log_GPS: currentGPS,
            activity_log_description: descriptionInput,
            activity_log_file_name: file.name,
            activity_log_file_description: imageDescriptions[i] || "",
          };

          await createActivityLogDocument(fileDocument);
        }
      }

      setIsLoading(false);

      toast.success("Registro ingresado exitosamente");
      reset({
        activity_log_GPS: "",
        activity_log_description: "",
        activity_log_files: [],
        activity_log_file_description: "",
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Ha ocurrido un error: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4"> INGRESAR REGISTRO</h2>
                <div className="form-group">
                  <label htmlFor="activity_log_GPS">GPS:</label>
                  <Controller
                    name="activity_log_GPS"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        id="activity_log_GPS"
                        className="form-control"
                        placeholder="Ingrese las coordenadas GPS."
                        value={currentGPS}
                      />
                    )}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-dark mt-2 mb-3"
                      type="button"
                      onClick={handleGetGPS}
                    >
                      <i className="bi bi-geo-alt align-middle"></i>
                      &nbsp;OBTENER GPS
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="activity_log_description">
                    Descripción del registro:
                  </label>
                  <Controller
                    name="activity_log_description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <textarea
                        {...field}
                        id="activity_log_description"
                        className="form-control"
                        placeholder="Ingrese descripción del registro."
                        value={descriptionInput}
                        onChange={(e) => {
                          setDescriptionInput(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-dark mt-2 mb-3"
                    onClick={startListening}
                  >
                    {renderButtonText}
                  </button>
                </div>
                <div className="form-group mt-2 mb-3">
                  <label>
                    Imagen/es <span className="text-muted">(opcional)</span>:
                  </label>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="d-flex align-items-start mb-2"
                    >
                      <div className="flex-grow-1 me-2">
                        <Controller
                          name={`activity_log_files_${index}`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="file"
                              className="form-control"
                              onChange={(e) =>
                                handleFileChange(index, e.target.files[0])
                              }
                            />
                          )}
                        />
                        <textarea
                          className="form-control mt-2"
                          placeholder="Descripción de la imagen"
                          value={imageDescriptions[index] || ""}
                          onChange={(e) => {
                            const newDescriptions = [...imageDescriptions];
                            newDescriptions[index] = e.target.value;
                            setImageDescriptions(newDescriptions);
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => remove(index)}
                      >
                        <i className="bi bi-x-circle align-middle"></i>
                      </button>
                    </div>
                  ))}
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => append({})}
                    >
                      <i className="bi bi-plus-circle align-middle"></i>
                      &nbsp;AGREGAR
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group d-flex text-center justify-content-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                    </>
                  ) : (
                    "INGRESAR REGISTRO"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        className="custom-toast"
        position="top-right"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}

UploadActivityLog.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default UploadActivityLog;

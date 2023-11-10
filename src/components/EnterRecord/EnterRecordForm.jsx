// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { uploadRecordFile, createNewRecord } from "../../utils/firebase.js";
import { getCurrentLocation } from "../../utils/getGPS.js";
import Spinner from "../UI/Spinner.jsx";
import "react-toastify/dist/ReactToastify.css";

function EnterRecordForm({ documentId }) {
  const [currentGPS, setCurrentGPS] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      record_description: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "record_files",
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
      <i className="bi bi-mic-mute"></i> DETENER GRABACIÓN POR VOZ
    </>
  ) : (
    <>
      <i className="bi bi-mic"></i> INICIAR GRABACIÓN POR VOZ
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

      const newRecord = {
        record_written_by: user,
        record_creation_date: new Date(),
        record_GPS: currentGPS,
        record_description: descriptionInput,
        record_file_names: [],
      };
      setIsLoading(true);
      if (data.record_files && data.record_files.length > 0) {
        for (let i = 0; i < data.record_files.length; i++) {
          const file = data.record_files[i];
          await uploadRecordFile([file]);
          newRecord.record_file_names.push(file.name);
        }
      }
      setIsLoading(false);

      createNewRecord(documentId, newRecord);

      toast.success("Registro ingresado exitosamente");
      reset({
        record_GPS: "",
        record_description: "",
        record_files: [],
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      toast.error(`Ha ocurrido un error: ${error.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4"> INGRESAR REGISTRO</h2>
              <div className="form-group">
                <label htmlFor="record_GPS">GPS:</label>
                <Controller
                  name="record_GPS"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="record_GPS"
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
                    <i className="bi bi-geo-alt"></i> OBTENER GPS
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="record_description">
                  Descripción del registro:
                </label>
                <Controller
                  name="record_description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="record_description"
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
              <div className="form-group mt-2 mb-3 d-flex flex-column ">
                <label>
                  Imagen/es <span className="text-muted">(opcional)</span>:
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="d-flex mb-2">
                    <Controller
                      name={`record_files_${index}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="file"
                          className="form-control"
                          onChange={(e) => {
                            setValue(
                              `record_files[${index}]`,
                              e.target.files[0]
                            );
                          }}
                        />
                      )}
                    />
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => remove(index)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </button>
                  </div>
                ))}
                <div>
                  <button
                    type="button"
                    className="btn btn-success mt-2"
                    onClick={() => append({})}
                  >
                    <i className="bi bi-plus-circle"></i> AGREGAR
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
            <ToastContainer
              className="custom-toast"
              position="top-right"
              autoClose={3000}
              hideProgressBar
            />
          </div>
        </div>
      </div>
    </form>
  );
}

EnterRecordForm.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default EnterRecordForm;

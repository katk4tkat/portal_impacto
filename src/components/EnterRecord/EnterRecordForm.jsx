// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { uploadRecordFile, createNewRecord } from "../../utils/firebase.js";
import { getCurrentLocation } from "../../utils/getGPS.js";

function EnterRecordForm({ documentId }) {
    const [currentGPS, setCurrentGPS] = useState("");
    const [recordIMG, setRecordIMG] = useState(null);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [isListening, setIsListening] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            record_description: "",
        },
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
                    console.log(descriptionInput)
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

    const renderButtonText = isListening ? "Detener Grabación de Voz" : "Iniciar Grabación de Voz";

    const stopListening = () => {
        setIsListening(false);
    };

    const isImageSelected = recordIMG && recordIMG.length > 0;

    const onSubmit = async () => {
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

            if (isImageSelected) {
                for (let i = 0; i < recordIMG.length; i++) {
                    const file = recordIMG[i];
                    await uploadRecordFile([file]);
                    newRecord.record_file_names.push(file.name);
                }
            }

            createNewRecord(documentId, newRecord);

            toast.success("Registro ingresado exitosamente");
            reset({
                record_GPS: "",
                record_description: "",
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
                                        Obtener GPS
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="record_description">Descripción del registro:</label>
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
                            <div className="form-group mt-2 mb-3">
                                <label htmlFor="record_files">Imagen/es (opcional):</label>
                                <Controller
                                    name="record_files"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="file"
                                            id="record_files"
                                            className="form-control"
                                            multiple
                                            onChange={(e) => {
                                                setRecordIMG(e.target.files);
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
                                    INGRESAR REGISTRO
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

EnterRecordForm.propTypes = {
    documentId: PropTypes.string.isRequired,
};

export default EnterRecordForm;

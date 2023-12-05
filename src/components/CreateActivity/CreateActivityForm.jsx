// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { createWeekDocument, createActivityDocument, createActivityStatusHistoryDocument } from "../../utils/firebase"
import { isWeekValid } from "../../utils/handleFormErrors"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner.jsx";



function CreateActivityForm() {

    const [isLoading, setIsLoading] = useState(false);
    const [isListeningNotice, setIsListeningNotice] = useState(false);
    const [isListeningJob, setIsListeningJob] = useState(false);
    const [isListeningStatus, setIsListeningStatus] = useState(false);
    const [descriptionNoticeInput, setDescriptionNoticeInput] = useState("");
    const [descriptionJobInput, setDescriptionJobInput] = useState("");
    const [descriptionStatusInput, setDescriptionStatusInput] = useState("");

    const navigate = useNavigate();

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            week: "",
            informed_by: "",
            team: "",
            current_status: "",
            description: "",
            u_tecnica: "",
            equipo_o_sistema: "",
            descripcion_del_trabajo: "",
            descripcion_del_aviso: "",
            vulnerabilidad: "",
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

    const startListeningNotice = () => {
        if (!isListeningNotice) {
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
                    setDescriptionNoticeInput(text);
                    stopListening();
                    console.log(descriptionNoticeInput);
                };

                recognition.start();
                setIsListeningNotice(true);
            } catch (error) {
                console.error("Error starting speech recognition:", error);
                toast.error(`Error starting speech recognition: ${error.message}`);
            }
        } else {
            stopListening();
        }
    };

    const startListeningJob = () => {
        if (!isListeningJob) {
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
                    setDescriptionJobInput(text);
                    stopListening();
                    console.log(descriptionJobInput);
                };

                recognition.start();
                setIsListeningJob(true);
            } catch (error) {
                console.error("Error starting speech recognition:", error);
                toast.error(`Error starting speech recognition: ${error.message}`);
            }
        } else {
            stopListening();
        }
    };

    const startListeningStatus = () => {
        if (!isListeningStatus) {
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
                    setDescriptionStatusInput(text);
                    stopListening();
                    console.log(descriptionStatusInput);
                };

                recognition.start();
                setIsListeningStatus(true);
            } catch (error) {
                console.error("Error starting speech recognition:", error);
                toast.error(`Error starting speech recognition: ${error.message}`);
            }
        } else {
            stopListening();
        }
    };

    const stopListening = () => {
        setIsListeningNotice(false);
        setIsListeningJob(false);
        setIsListeningStatus(false);
    };
    const renderButtonTextJob = isListeningJob ? (
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

    const renderButtonTextNotice = isListeningNotice ? (
        <>
            <i className="bi bi-mic-mute align-middle"></i>
            &nbsp;DETENER GRABACIÓN POR VOZ
        </>
    ) : (
        <>
            <i className="bi bi-mic align-middle"></i>
            &nbsp;INICIAR GRABACIÓN POR VOZ
        </>
    )

    const renderButtonTextStatus = isListeningStatus ? (
        <>
            <i className="bi bi-mic-mute align-middle"></i>
            &nbsp;DETENER GRABACIÓN POR VOZ
        </>
    ) : (
        <>
            <i className="bi bi-mic align-middle"></i>
            &nbsp;INICIAR GRABACIÓN POR VOZ
        </>
    )
    const onSubmit = async (formData) => {
        try {
            const user = localStorage.getItem("userEmail");
            const { week, informed_by, team, current_status, description, equipo_o_sistema, descripcion_del_aviso, descripcion_del_trabajo, vulnerabilidad } = formData;

            if (!isWeekValid(week)) {
                toast.error(
                    "Por favor: completar semana en el formato correspondiente o dejar vacía, si corresponde."
                );
                return;
            }
            setIsLoading(true);
            const newWeek = {
                created_at: new Date(),
                created_by: user,
                file_name: "",
                team: team,
                week_name: week || "N/A",
            }

            const weekRef = await createWeekDocument(newWeek)
            console.log(weekRef.id)


            const newActivity = {
                created_at: new Date(),
                created_by: user,
                team: team,
                informed_by: informed_by,
                current_status: current_status,
                equipo_o_sistema: equipo_o_sistema,
                n_aviso: "",
                descripcion_del_trabajo: descripcion_del_trabajo,
                descripcion_del_aviso: descripcion_del_aviso,
                vulnerabilidad_1: vulnerabilidad,
                prioridad: "",
                week_id: weekRef.id,
                week_name: week
            };

            const activityRef = await createActivityDocument(newActivity)
            console.log(activityRef.id)


            const newStatus = {
                created_at: new Date(),
                created_by: user,
                informed_by: informed_by,
                activity: activityRef.id,
                status: current_status,
                description: description,
            }

            await createActivityStatusHistoryDocument(newStatus)

            setIsLoading(false);
            toast.success("Priorización importada correctamente");
            reset({
                week: "",
                informed_by: "",
                team: "",
                current_status: "",
                description: "",
                u_tecnica: "",
                equipo_o_sistema: "",
                descripcion_del_trabajo: "",
                descripcion_del_aviso: "",
                vulnerabilidad: "",
            });

            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Ha ocurrido un error: ${error.message}`);
            setIsLoading(false);

        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">NUEVA ACTIVIDAD</h2>
                            <h5>INFORMACIÓN GENERAL DE ACTIVIDAD</h5>
                            <div className="form-group">
                                <label htmlFor="week">Semana:</label>
                                <p className='text-muted'>(opcional)</p>
                                <Controller
                                    name="week"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="week"
                                            placeholder="Ejemplo: 2023-37 (AAAA-SS)"
                                            className="form-control mb-3"
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="informed_by">Informado por:</label>
                                <Controller
                                    name="informed_by"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="informed_by"
                                            className="form-control mb-3"
                                            placeholder='Nombre + Apellido'
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
                                    rules={{ required: 'Debe seleccionar equipo' }}
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
                                <label htmlFor="current_status">Ingresar Estado:</label>
                                <Controller
                                    name="current_status"
                                    control={control}
                                    rules={{ required: 'Debe seleccionar un estado inicial.' }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="form-control mb-3"
                                            id="current_status"
                                        >
                                            <option value="" defaultValue>
                                                Seleccione un Estado
                                            </option>
                                            <option value="HALLAZGO">Hallazgo</option>
                                            <option value="NO PROGRAMADA">No programada</option>
                                            <option value="URGENCIA">Urgencia</option>
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
                                <label htmlFor="description">
                                    Descripción del Estado:
                                </label>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="description"
                                            className="form-control"
                                            placeholder="Ingrese descripción del estado."
                                            required
                                            value={descriptionStatusInput}
                                            onChange={(e) => {
                                                setDescriptionStatusInput(e.target.value);
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
                                    onClick={startListeningStatus}
                                >
                                    {renderButtonTextStatus}
                                </button>
                            </div>
                            <h5>DETALLES DE ACTIVIDAD</h5>
                            <p className='text-muted'>(opcional)</p>
                            <div className="form-group">
                                <label htmlFor="u_tecnica">Unidad Técnica:</label>
                                <Controller
                                    name="u_tecnica"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="u_tecnica"
                                            className="form-control mb-3"
                                            placeholder='Ej: COXI-LIX-LIS-LSR'
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipo_o_sistema">Equipo o Sistema:</label>
                                <Controller
                                    name="equipo_o_sistema"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="equipo_o_sistema"
                                            className="form-control mb-3"
                                            placeholder='Ej: LINEAS DE SOLUCIÓN DE REFINO'
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion_del_trabajo">
                                    Descripción del Trabajo:
                                </label>
                                <Controller
                                    name="descripcion_del_trabajo"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="descripcion_del_trabajo"
                                            className="form-control"
                                            placeholder="Ingrese descripción del trabajo."
                                            value={descriptionJobInput}
                                            onChange={(e) => {
                                                setDescriptionJobInput(e.target.value);
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
                                    onClick={startListeningJob}
                                >
                                    {renderButtonTextJob}
                                </button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion_del_aviso">
                                    Descripción del Aviso:
                                </label>
                                <Controller
                                    name="descripcion_del_aviso"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="descripcion_del_aviso"
                                            className="form-control"
                                            placeholder="Ingrese descripción del aviso."
                                            value={descriptionNoticeInput}
                                            onChange={(e) => {
                                                setDescriptionNoticeInput(e.target.value);
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
                                    onClick={startListeningNotice}
                                >
                                    {renderButtonTextNotice}
                                </button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="vulnerabilidad">Vulnerabilidad:</label>
                                <Controller
                                    name="vulnerabilidad"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="vulnerabilidad"
                                            className="form-control mb-3"
                                            placeholder='Ej: HDPE'
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group d-flex text-center justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-dark btn-block text-center mt-3"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spinner /> : "CREAR ACTIVIDAD"}
                                </button>
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
            </div>
        </form>
    )
}

export default CreateActivityForm;

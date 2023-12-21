// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    createActivityPlanningDocument, getActivityInfoDocuments, getWeekDocuments
} from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner.jsx";
import PropTypes from "prop-types";


function ActivityPlanningForm({ documentId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [detailedActivitydescriptionInput, setDetailedActivitydescriptionInput] = useState("");
    const [weekDocument, setWeekDocument] = useState({});


    const navigate = useNavigate();

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            OT: "",
            program_start: "",
            real_program_start: "",
            program_end: "",
            real_program_end: "",
            program_duration: "",
            real_program_duration: "",
            program_scope: "",
            real_program_scope: "",
            detailed_activity_description: "",
            relevant_technical_specifications: "",
            general_step_by_step: "",
            required_material: "",
            required_support_equipment: "",
            technical_standard: "",
            work_procedure: "",
            risks_and_controls: "",
            risk_analysis: "",
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

    const startListeningDetailedActivityDescription = () => {
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
                    setDetailedActivitydescriptionInput(text);
                    stopListening();
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


    const renderButtonDetailedActivityDescription = isListening ? (
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

    getWeekDocuments

    useEffect(() => {
        const getCurrentActivityInfoDocument = async () => {
            try {
                const weekDocuments = await getWeekDocuments();
                const activityDocuments = await getActivityInfoDocuments();
                const activityDoc = activityDocuments.find(
                    (doc) => doc.id === documentId
                );
                const weekDoc = weekDocuments.find(
                    (doc) => doc.id === activityDoc?.data.week_id
                );
                if (weekDoc) {
                    const documentData = weekDoc.data;
                    console.log("Datos del documento:", documentData);
                    setWeekDocument(documentData);

                } else {
                    console.log("El documento no existe.");
                    return null;
                }
            } catch (error) {
                console.error("Error al obtener la información del documento:", error);
                throw error;
            }
        };

        getCurrentActivityInfoDocument();

    }, [documentId]);

    const onSubmit = async (formData) => {
        try {
            const user = localStorage.getItem("userEmail");
            const {
                OT,
                program_start,
                real_program_start,
                program_end,
                real_program_end,
                program_duration,
                real_program_duration,
                program_scope,
                real_program_scope,
                detailed_activity_description,
                relevant_technical_specifications,
                general_step_by_step,
                required_material,
                required_support_equipment,
                technical_standard,
                work_procedure,
                risks_and_controls,
                risk_analysis,
            } = formData;

            setIsLoading(true);

            const newActivityPlanning = {
                created_at: new Date(),
                created_by: user,
                activity: documentId,
                OT: OT,
                program_start: program_start,
                real_program_start: real_program_start,
                program_end: program_end,
                real_program_end: real_program_end,
                program_duration: program_duration,
                real_program_duration: real_program_duration,
                program_scope: program_scope,
                real_program_scope: real_program_scope,
                detailed_activity_description: detailed_activity_description,
                relevant_technical_specifications: relevant_technical_specifications,
                general_step_by_step: general_step_by_step,
                required_material: required_material,
                required_support_equipment: required_support_equipment,
                technical_standard: technical_standard,
                work_procedure: work_procedure,
                risks_and_controls: risks_and_controls,
                risk_analysis: risk_analysis,
            };

            createActivityPlanningDocument(newActivityPlanning);


            setIsLoading(false);
            toast.success("Priorización importada correctamente");
            reset({
                OT: "",
                program_start: "",
                real_program_start: "",
                program_end: "",
                real_program_end: "",
                program_duration: "",
                real_program_duration: "",
                program_scope: "",
                real_program_scope: "",
                detailed_activity_description: "",
                relevant_technical_specifications: "",
                general_step_by_step: "",
                required_material: "",
                required_support_equipment: "",
                technical_standard: "",
                work_procedure: "",
                risks_and_controls: "",
                risk_analysis: "",
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
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">PLANIFICAR ACTIVIDAD</h2>
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
                                            placeholder={weekDocument.week_name}
                                            className="form-control mb-3"
                                            disabled
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="team">Empresa:</label>
                                <Controller
                                    name="team"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="team"
                                            placeholder={weekDocument.team}
                                            className="form-control mb-3"
                                            disabled
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="OT">OT:</label>
                                <Controller
                                    name="OT"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="OT"
                                            placeholder="12345"
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="program_start">Inicio de Programa:</label>
                                <Controller
                                    name="program_start"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="program_start"
                                            placeholder="01/01/2000"
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="real_program_start">Inicio Real:</label>
                                <Controller
                                    name="real_program_start"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="real_program_start"
                                            placeholder="01/02/2000"
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="program_end">Fin Programa:</label>
                                <Controller
                                    name="program_end"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="program_end"
                                            placeholder="01/01/2000"
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="real_program_end">Fin Real:</label>
                                <Controller
                                    name="real_program_end"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="real_program_end"
                                            placeholder="01/02/2000"
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="program_duration">Duración del Programa:</label>
                                <Controller
                                    name="program_duration"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="program_duration"
                                            placeholder="3 semanas."
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="real_program_duration"> Duración real:</label>
                                <Controller
                                    name="real_program_duration"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="real_program_duration"
                                            placeholder="6 semanas."
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="program_scope">Alcances Programa:</label>
                                <Controller
                                    name="program_scope"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="program_scope"
                                            placeholder="Detallar alcance por carta Gantt."
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="real_program_scope">Alcance Real:</label>
                                <Controller
                                    name="real_program_scope"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            type="text"
                                            id="real_program_scope"
                                            placeholder="Detallar si alcance programado correspondía al alcance real de las actividades a realizar. Indicar si hubo cambio de alcance por definición de terreno, declarar detalle de cambio alcance y justificación técnica."
                                            className="form-control mb-3"
                                            rows={4}
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="detailed_activity_description">Descripción detallada de la actividad:</label>
                                <Controller
                                    name="detailed_activity_description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="detailed_activity_description"
                                            className="form-control"
                                            placeholder="Ingrese descripción del estado."
                                            required
                                            value={detailedActivitydescriptionInput} onChange={(e) => {
                                                setDetailedActivitydescriptionInput(e.target.value);
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
                                    onClick={startListeningDetailedActivityDescription}
                                >
                                    {renderButtonDetailedActivityDescription}
                                </button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="relevant_technical_specifications">Especificaciones técnicas relevantes:</label>
                                <Controller
                                    name="relevant_technical_specifications"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            type="text"
                                            id="relevant_technical_specifications"
                                            placeholder="Equipo a intervenir, características técnicas, parámetros relevantes, mediciones y referencias, presiones, torques, voltajes, corrientes, flujos, tipo de pernos, tipos de soldadura, juegos, interferencias, rodamientos, motor, reductor, etc.
                                            "
                                            className="form-control mb-3"
                                            rows={4}
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="general_step_by_step">Paso a paso general:</label>
                                <Controller
                                    name="general_step_by_step"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            type="text"
                                            id="general_step_by_step"
                                            placeholder=""
                                            className="form-control mb-3"
                                            rows={4}
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="required_material">Materiales e insumos requeridos:</label>
                                <Controller
                                    name="required_material"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            type="text"
                                            id="required_material"
                                            placeholder="Tipos y cantidad de aceite, dieléctrico, grasas, pernos, cables, sensores, rodamientos, etc."
                                            className="form-control mb-3"
                                            rows={4}
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="required_support_equipment">Equipos de apoyo requeridos:</label>
                                <Controller
                                    name="required_support_equipment"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            type="text"
                                            id="required_support_equipment"
                                            placeholder="Si necesito equipos de apoyo, grúa, camión pluma, camión grúa, alza hombre, andamios, camión, instrumentos especiales, requiere equipos/herramientas específicos, otros."
                                            className="form-control mb-3"
                                            rows={4}
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="technical_standard">Estándar técnico:</label>
                                <Controller
                                    name="technical_standard"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="technical_standard"
                                            placeholder="Procedimiento y estándar utilizados, etc."
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="work_procedure">Procedimiento de trabajo:</label>
                                <Controller
                                    name="work_procedure"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="work_procedure"
                                            placeholder="Procedimiento de trabajo utilizados, etc."
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="risks_and_controls">Riesgos críticos y controles aplicados:</label>
                                <Controller
                                    name="risks_and_controls"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="risks_and_controls"
                                            placeholder="RC1, RC4, control preventivo CCP1, control mitigador CCM1, etc."
                                            className="form-control mb-3"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="risk_analysis">Análisis de riesgos (¿Qué pasa sí?):</label>
                                <Controller
                                    name="risk_analysis"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            type="text"
                                            id="risk_analysis"
                                            placeholder="Indicar la existencia de riesgos (no solo de seguridad, sino también de recursos o hallazgos de terreno) que pudieron amenazar o que amenazaron la actividad y tuvimos que resolver y/o tomar una decisión in situ o de ultima hora para corregir una desviación"
                                            className="form-control mb-3"
                                            rows={4}
                                            required
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
                                    {isLoading ? <Spinner /> : "PLANIFICAR ACTIVIDAD"}
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
    );
}

ActivityPlanningForm.propTypes = {
    documentId: PropTypes.string,
}

export default ActivityPlanningForm;

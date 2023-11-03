// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { uploadRecordFile, createNewRecord } from "../../utils/firebase.js"

function EnterRecordForm({ documentId }) {
    const [recordIMG, setRecordIMG] = useState(null);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            recordGPS: "",
            recordDescription: "",
        },
    });

    const onSubmit = async (formData) => {
        try {
            const user = localStorage.getItem("userEmail");
            const { record_GPS, record_description } = formData;

            if (!record_GPS || !record_description) {
                toast.error(
                    "Ha ocurrido un error: Debe completar las coordenadas GPS y la descripción del registro."
                );
                return;
            }

            const newRecord = {
                record_written_by: user,
                record_creation_date: new Date(),
                record_GPS,
                record_description,
                record_file_names: [],
            };

            for (let i = 0; i < recordIMG.length; i++) {
                const file = recordIMG[i];
                await uploadRecordFile([file]);
                newRecord.record_file_names.push(file.name);
            }

            createNewRecord(documentId, newRecord)

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
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="record_description">Descripción del registro:</label>
                                <Controller
                                    name="record_description"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="record_description"
                                            className="form-control"
                                            placeholder="Ingrese descripción del registro."
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="record_files">Imagen:</label>
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

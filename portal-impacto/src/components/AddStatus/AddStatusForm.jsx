// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { get, getDatabase, ref, update } from "firebase/database";

function AddStatusForm() {

    const db = getDatabase();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            status: "",
            description: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {

            const objectKey = "a0jzaH4OpEoaFGT7DTWk";
            const existingDataRef = ref(db, `/PriorizationObject/${objectKey}`);
            const existingDataSnapshot = await get(existingDataRef);
            const existingData = existingDataSnapshot.val();

            const user = localStorage.getItem("userEmail");
            const { status, description } = formData;

            if (!status || !description) {
                toast.error(
                    "Ha ocurrido un error: Debe completar el estado y la descripción."
                );
                return;
            }

            const updatedStatus = {
                updatedBy: user,
                updatedDate: new Date(),
                status,
                description
            };

            existingData.newKey = updatedStatus;

            await update(ref(db), { [`/PriorizationObject/${objectKey}`]: existingData });


            toast.success("Estado Impacto guardado exitosamente");
            setTimeout(() => {
                navigate("/home");
            }, 2000);
            console.log("console de update:", updates)
            console.log("data actualizada:", updatedStatus)


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
                            <h2 className="text-center mb-4">ESTADO IMPACTO</h2>
                            <div className="form-group">
                                <label htmlFor="team">Ingresar Estado:</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <select {...field} className="form-control" id="impact-status">
                                            <option value="" defaultValue>
                                                Seleccione un Estado
                                            </option>
                                            <option value="acepted">Aceptado</option>
                                            <option value="rejected">Rechazado</option>
                                            <option value="pending">Pendiente</option>
                                            <option value="scheduled">Programado</option>
                                            <option value="executed">Ejecutado</option>
                                            <option value="repeated">Repetido</option>
                                            <option value="other">Otro</option>
                                        </select>
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción u observación:</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="description"
                                            className="form-control"
                                            placeholder="Escribe una descripción"
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group d-flex text-center justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-dark btn-block text-center mt-3"
                                >
                                    AGREGAR ESTADO IMPACTO
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

export default AddStatusForm;


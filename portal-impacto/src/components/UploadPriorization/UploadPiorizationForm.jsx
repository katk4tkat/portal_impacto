import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { priorizationData } from "../../firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UploadPriorizationForm() {
    const { control, handleSubmit, reset, setValue, getValues } = useForm({
        defaultValues: {
            week: "",
            team: "",
            file: null,
        },
    });

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValue("file", file);
    };

    const onSubmit = async (data) => {
        try {
            const user = localStorage.getItem("userEmail");
            const date = new Date().toISOString();
            const UploadPriorizationObject = {
                ...data,
                user,
                date,
            };
            await priorizationData(UploadPriorizationObject);
            console.log(UploadPriorizationObject);
            toast.success("Priorización importada correctamente");
            reset();
        } catch (error) {
            console.log(error)
            toast.error(`There has been an error: ${error.message}`);
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
                                <label htmlFor="semana">Semana:</label>
                                <Controller
                                    name="week"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="week"
                                            placeholder="Semana"
                                            className="form-control"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipo">Equipo:</label>
                                <Controller
                                    name="team"
                                    control={control}
                                    render={({ field }) => (
                                        <select {...field} className="form-control">
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
                                            type="file"
                                            className="form-control"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group d-flex text-center justify-content-center">
                                <button type="submit" className="btn btn-dark btn-block text-center mt-3">
                                    CARGAR PRIORIZACIÓN
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

export default UploadPriorizationForm;

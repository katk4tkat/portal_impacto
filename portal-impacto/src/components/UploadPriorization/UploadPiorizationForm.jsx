import React from "react";
import { useForm, Controller } from "react-hook-form";
import { priorizationData } from "../../firebase/firebase";

function UploadPriorizationForm() {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const user = localStorage.getItem("userEmail");
        const date = new Date().toISOString();
        const UploadPriorizationObject = {
            ...data,
            user,
            date,
        };

        priorizationData(UploadPriorizationObject); // Llama a priorizationData con el objeto
        console.log(UploadPriorizationObject);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="mb-4">CARGAR PRIORIZACIÓN</h2>
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
                                            required
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
                                            className="form-control"
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-dark">
                                    CARGAR PRIORIZACIÓN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default UploadPriorizationForm;



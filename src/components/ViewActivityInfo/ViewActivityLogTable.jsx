import React from "react";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";
import ViewCurrentLogGallery from "./ViewCurrentLogGallery";

function ViewActivityLogTable({ isLoading, activityLogDocument }) {
    const hasCurrentLog = Boolean(activityLogDocument?.data?.activity_log_GPS);

    if (!activityLogDocument || !activityLogDocument.data) {
        return (
            <div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="table-responsive">
                            <h1 className="my-2 text-center mt-3 mb-3">Registro Actual</h1>
                            <table className="table table-hover table-bordered">
                                <tbody>
                                    <tr>
                                        <td colSpan="2">Sin registros disponibles</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4">
                            <h2>Historial de Registros:</h2>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">Sin historial de registros disponible</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    const hasHistory = activityLogDocument.data.history && activityLogDocument.data.history.length > 0;

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="table-responsive">
                        <h1 className="my-2 text-center mt-3 mb-3">Registro Actual</h1>
                        <table className="table table-hover table-bordered">
                            <tbody>
                                {hasCurrentLog && (
                                    <>
                                        <tr>
                                            <th scope="row">Coordenadas GPS:</th>
                                            <td>{activityLogDocument?.data?.activity_log_GPS}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Descripción de Registro:</th>
                                            <td>{activityLogDocument?.data?.activity_log_description || "Sin descripción."}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Creado por:</th>
                                            <td>{activityLogDocument?.data?.activity_log_written_by}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Fecha de creación:</th>
                                            <td>{activityLogDocument?.data?.activity_log_creation_date?.toDate().toLocaleString() || "Sin fecha"}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <ViewCurrentLogGallery
                        isLoading={isLoading}
                        activityLogDocument={activityLogDocument}
                    />

                    <div className="mt-4">
                        <h2>Historial de Registros:</h2>
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered">
                                <tbody>
                                    {!hasHistory ? (
                                        <tr>
                                            <td colSpan="2">Sin historial de registros disponible.</td>
                                        </tr>
                                    ) : (
                                        activityLogDocument.data.history
                                            .filter(log => log && log.activity_log_creation_date)
                                            .slice()
                                            .sort((a, b) => b.activity_log_creation_date - a.activity_log_creation_date)
                                            .map((log, index) => (
                                                <tr key={index}>
                                                    <th scope="col">GPS:</th>
                                                    <td>{log?.activity_log_GPS}</td>
                                                    <th scope="col">Descripción:</th>
                                                    <td>{log?.activity_log_description || "Sin descripción."}</td>
                                                    <th scope="col">Creado por:</th>
                                                    <td>{log?.activity_log_written_by}</td>
                                                    <th scope="col">Fecha de creación:</th>
                                                    <td>{log?.activity_log_creation_date?.toDate().toLocaleString()}</td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

ViewActivityLogTable.propTypes = {
    isLoading: PropTypes.bool,
    activityLogDocument: PropTypes.object,
    documentId: PropTypes.string,
};

export default ViewActivityLogTable;

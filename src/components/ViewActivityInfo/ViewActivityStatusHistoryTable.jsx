// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";

function ViewActivityStatusHistoryTable({ isLoading, activityStatusDocument }) {

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="table-responsive">
                        <h1 className="my-2 text-center mt-3 mb-3">Estado Impacto Actual</h1>
                        <table className="table table-hover table-bordered">
                            <h1 className="my-2 text-center mt-3 mb-3">Estado Impacto Actual</h1>
                            <tbody>
                                <tr>
                                    <th scope="row">Estado actual:</th>
                                    <td>{activityStatusDocument?.data.status}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Descripción:</th>
                                    <td>{activityStatusDocument?.data.description ? activityStatusDocument.data.description : "Sin descripción."}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Creado por:</th>
                                    <td>{activityStatusDocument?.data.created_by}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Fecha de creación:</th>
                                    <td>{activityStatusDocument?.data.created_at.toDate().toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <h2>Historial de Estados:</h2>
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered">
                                <tbody>
                                    {activityStatusDocument?.data?.status_history ? (
                                        activityStatusDocument.data.status_history
                                            .filter(log => log && log.previous_created_at)
                                            .slice()
                                            .sort((a, b) => b.previous_created_at - a.previous_created_at)
                                            .map((log, index) => (
                                                <tr key={index}>
                                                    <th scope="col">Estado:</th>
                                                    <td>{log?.previous_status}</td>
                                                    <th scope="col">Descripción:</th>
                                                    <td>{log?.previous_status_description || "Sin descripción."}</td>
                                                    <th scope="col">Creado por:</th>
                                                    <td>{log?.previous_created_by}</td>
                                                    <th scope="col">Fecha de creación:</th>
                                                    <td>{log?.previous_created_at?.toDate().toLocaleString()}</td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">Sin historial de estados disponible.</td>
                                        </tr>
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

ViewActivityStatusHistoryTable.propTypes = {
    isLoading: PropTypes.bool,
    activityStatusDocument: PropTypes.object,
};

export default ViewActivityStatusHistoryTable;

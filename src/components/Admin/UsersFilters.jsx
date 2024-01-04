// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function UsersFilters({ handleFilterChange }) {
    return (
        <>
            <form className="row gx-3 gy-1 align-items-center">
                <div className="col-sm-2">
                    <label className="visually-hidden" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nombre"
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                    />
                </div>
                <div className="col-sm-2">
                    <label className="visually-hidden" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Correo electrónico"
                        onChange={(e) =>
                            handleFilterChange("email", e.target.value)
                        }
                    />
                </div>
                <div className="col-sm-2">
                    <label className="visually-hidden" htmlFor="role">
                        Rol
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="role"
                        placeholder="Rol"
                        onChange={(e) => handleFilterChange("role", e.target.value)}
                    />
                </div>
            </form>
        </>
    );
}

UsersFilters.propTypes = {
    handleFilterChange: PropTypes.func.isRequired,
};

export default UsersFilters;

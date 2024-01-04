import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'
import UsersTable from "../Admin/UsersTable"
import UsersFilters from "../Admin/UsersFilters"
import { useNavigate } from "react-router-dom";
import ButtonUI from "../UI/ButtonUI";


function Admin() {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        user: "",
        email: "",
        role: "",
    });

    const handleFilterChange = (fieldName, value) => {
        setFilters({
            ...filters,
            [fieldName]: value,
        });

    };

    const handleNewUser = () => {
        navigate("/create-user");
    };

    const handleReturnClick = () => {
        navigate("/home");
    }

    return (
        <>
            <Navbar />
            <h1 className="my-2 text-center mt-3">ADMINISTRACIÓN DE USUARIOS</h1>
            <ButtonUI
                text="CREAR USUARIO"
                icon="bi bi-plus-circle"
                btnClassName="btn-dark"
                onClick={handleNewUser}
            />
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <UsersFilters
                            filters={filters}
                            handleFilterChange={handleFilterChange} />
                    </div>
                    <UsersTable filters={filters} />
                </div>
                <ButtonUI
                    text="VOLVER"
                    icon="bi bi-arrow-return-left"
                    marginClassName="mb-5"
                    btnClassName="btn-link"
                    onClick={handleReturnClick}
                />
            </div>
        </>
    )
}


export default Admin

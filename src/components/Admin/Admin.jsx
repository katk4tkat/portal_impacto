import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import UsersTable from "../Admin/UsersTable";
import UsersFilters from "../Admin/UsersFilters";
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

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <section id="admin">
        <h1 className="my-2 text-center mt-3">ADMINISTRACIÓN DE USUARIOS</h1>
        <div className="container">
          <ButtonUI
            text="CREAR USUARIO"
            icon="bi bi-plus-circle"
            btnClassName="btn-dark mb-3"
            onClick={handleCreateUser}
          />
          <div className="row mb-3">
            <div className="col mb-3">
              <UsersFilters
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
            </div>
            <UsersTable filters={filters} />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <ButtonUI
              text="VOLVER"
              icon="bi bi-arrow-return-left"
              marginClassName="mb-5"
              btnClassName="btn-link"
              onClick={handleReturnClick}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;

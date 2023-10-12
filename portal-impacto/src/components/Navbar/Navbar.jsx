// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-white">PORTAL IMPACTO</a>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              className="btn text-white"
              data-bs-toggle="button"
              onClick={handleLogout}
            >
              CERRAR SESIÓN
              <i className="bi bi-box-arrow-right custom-icon"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

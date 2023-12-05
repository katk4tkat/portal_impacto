import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/firebase.js";

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
    <nav
      className="navbar navbar-expand-md navbar-dark"
      style={{ backgroundColor: "#4b4a4a" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand">PORTAL IMPACTO</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                type="button"
                className="btn text-white"
                onClick={handleLogout}
              >
                CERRAR SESIÓN
                <i
                  className="bi bi-box-arrow-right"
                  style={{ fontSize: "24px", marginLeft: "8px" }}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

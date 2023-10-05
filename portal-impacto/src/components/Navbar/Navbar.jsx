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
    <div className="navbar">
      <h1>PORTAL IMPACTO</h1>
      <div className="logoutbtn">
        <h3> Cerrar Sesión</h3>
        <button onClick={handleLogout}>
          <img src="/Assets/logout.png" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;

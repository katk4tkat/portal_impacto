import React from "react";
import "./navbar.css"

function Navbar({ setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <h1>PORTAL IMPACTO</h1>
      <div className="logoutbtn">
      <h3> Cerrar Sesión</h3>
      <button onClick={handleLogout}><img src="public\Assets\logout.png"/></button>
      </div>
    </div>
  );
}

export default Navbar;

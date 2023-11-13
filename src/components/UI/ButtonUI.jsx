import React from "react";
import PropTypes from "prop-types";

function ButtonUI({ onClick, text, icon, marginClassName, btnClassName }) {
  return (
    <button
      type="button"
      className={`btn ${btnClassName} ${marginClassName}`}
      onClick={onClick}
    >
      {text}{" "}
      {icon && <i className={`bi ${icon}`} style={{ marginLeft: "4px" }}></i>}
    </button>
  );
}

ButtonUI.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  marginClassName: PropTypes.string,
  btnClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ButtonUI;

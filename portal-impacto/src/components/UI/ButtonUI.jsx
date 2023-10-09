import React from "react";
import PropTypes from "prop-types";

function ButtonUI({ onClick, text, icon }) {
  return (
    <button type="button" className="btn btn-dark" onClick={onClick}>
      {text}{" "}
      {icon && <i className={`bi ${icon}`} style={{ marginLeft: "4px" }}></i>}
    </button>
  );
}

ButtonUI.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default ButtonUI;

import React from "react";
import { useNavigate } from "react-router-dom";

import "./upload-button.css";

function UploadButton() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload-priorization");
  };

  return (
    <>
      <div className="uploadbtn">
        <button onClick={handleUploadClick}> + Cargar Priorización</button>
      </div>
    </>
  );
}

export default UploadButton;

import React from "react";
import Navbar from "../Navbar/Navbar";
import UploadPriorizationForm from "../UploadPriorization/UploadPiorizationForm";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate } from "react-router-dom";

function UploadPriorization() {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-auto">
            <ButtonUI
              text="Volver a Priorización"
              icon="bi bi-arrow-return-left"
              onClick={handleReturnClick}
            />
          </div>
        </div>
      </div>
      <UploadPriorizationForm />
    </>
  );
}

export default UploadPriorization;

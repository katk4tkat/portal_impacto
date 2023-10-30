// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UploadPriorizationForm from "../UploadPriorization/UploadPiorizationForm";
import ButtonUI from "../UI/ButtonUI";

function UploadPriorization() {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <UploadPriorizationForm />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto mt-5">
            <ButtonUI
              text="VOLVER A PRIORIZACIÓN"
              icon="bi bi-arrow-return-left"
              onClick={handleReturnClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadPriorization;

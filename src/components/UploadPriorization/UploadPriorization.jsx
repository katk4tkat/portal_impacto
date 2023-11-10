// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UploadPriorizationForm from "./UploadPiorizationForm";
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
      <div className="d-flex justify-content-center mt-5">
        <ButtonUI
          text="VOLVER A PRIORIZACIÓN"
          icon="bi bi-arrow-return-left"
          marginClassName="mb-5"
          btnClassName="btn-link"
          onClick={handleReturnClick}
        />
      </div>
    </>
  );
}

export default UploadPriorization;

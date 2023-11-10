// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import EnterRecordForm from "./EnterRecordForm";

function EnterRecord() {
  const navigate = useNavigate();
  const { documentId } = useParams();

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <EnterRecordForm documentId={documentId} />
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

export default EnterRecord;

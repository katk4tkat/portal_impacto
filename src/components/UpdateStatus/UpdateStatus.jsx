import React from "react";
import Navbar from "../Navbar/Navbar";
import UpdateStatusForm from "./UpdateStatusForm";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import ShowStatus from "./ShowStatus/ShowStatus";

function AddStatus() {
  const navigate = useNavigate();
  const { documentId } = useParams();

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5">
            <ShowStatus documentId={documentId} />
          </div>
          <div className="col-md-6">
            <UpdateStatusForm documentId={documentId} />
          </div>
        </div>
      </div>
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

export default AddStatus;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowStatus from "./ShowStatus";
import UpdateStatusForm from "./UpdateStatusForm";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";

function UpdateActivityStatus() {
  const navigate = useNavigate();
  const { documentId } = useParams();

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <section id="update-activity-status">
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
        <div className="d-flex justify-content-center mt-5">
          <ButtonUI
            text="VOLVER"
            icon="bi bi-arrow-return-left"
            marginClassName="mb-5"
            btnClassName="btn-link"
            onClick={handleReturnClick}
          />
        </div>
      </section>
    </>
  );
}

export default UpdateActivityStatus;

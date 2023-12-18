// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivityPlanningForm from "./ActivityPlanningForm";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";


function ActivityPlanning() {
  const { documentId } = useParams()
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <ActivityPlanningForm documentId={documentId} />
      <div className="d-flex justify-content-center mt-5">
        <ButtonUI
          text="VOLVER"
          icon="bi bi-arrow-return-left"
          marginClassName="mb-5"
          btnClassName="btn-link"
          onClick={handleReturnClick}
        />
      </div>
    </>
  )
}

export default ActivityPlanning;

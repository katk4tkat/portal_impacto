import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getActivityPlanningDocuments } from "../../utils/firebase.js";
import Navbar from "../Navbar/Navbar";
import ViewActivityDossierTable from "./ViewActivityDossierTable";
import ButtonUI from "../UI/ButtonUI.jsx";

function ViewActivityDossier() {
  const { documentId } = useParams();
  const [activityPlanningDocument, setActivityPlanningDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActivityPlanningDocuments(documentId);
        setActivityPlanningDocument(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching activity planning documents:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-3">DOSSIER DE ACTIVIDAD</h1>
          </div>
        </div>
        <ViewActivityDossierTable
          activityPlanningDocument={activityPlanningDocument}
          isLoading={isLoading}
        />
        <div className="d-flex justify-content-center mt-5">
          <ButtonUI
            text="VOLVER"
            icon="bi bi-arrow-return-left"
            marginClassName="mb-5"
            btnClassName="btn-link"
            onClick={handleReturnClick}
          />
        </div>
      </div>
    </>
  );
}

export default ViewActivityDossier;

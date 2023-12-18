import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDossierDocuments } from "../../utils/firebase.js";
import Navbar from "../Navbar/Navbar.jsx";
import ViewDossierTable from "./ViewActivityPlanningTable.jsx";
import ViewDossierGallery from "../ViewDossierRespaldo/ViewDossierGallery.jsx";
import ButtonUI from "../UI/ButtonUI.jsx";

function ViewDossier() {
  const { documentId } = useParams();
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const documents = await getDossierDocuments();
        const thisDocument = documents.find(
          (document) => document.id === documentId
        );
        setDocument(thisDocument);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };
    fetchDocument();
  }, [documentId]);

  const handleReturnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <section id="view-dossier">
        <h1 className="my-2 text-center mt-3 mb-3">Nombre de la actividad?</h1>
        <div className="container">
          <ViewDossierTable isLoading={isLoading} document={document} />
          <ViewDossierGallery document={document} />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <ButtonUI
            text="VOLVER A PRIORIZACIÓN"
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

export default ViewDossier;

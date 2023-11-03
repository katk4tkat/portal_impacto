// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDocuments } from "../../../utils/firebase.js";
import Spinner from "../../UI/Spinner";

function ShowStatus({ documentId }) {
  const [document, setDocument] = useState({
    defaultValues: {
      impacto_status: "",
      impacto_status_description: "Sin descripción",
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(documentId);
    const fetchData = async () => {
      const documents = await getDocuments();
      console.log(documents);
      const thisDocument = documents.find(
        (document) => document.id === documentId
      );
      setDocument(thisDocument);
      setIsLoading(false);
    };

    fetchData();
  }, [documentId]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="row justify-content-center">
      <div className="col-xl">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">ESTADO IMPACTO</h2>
            <div className="d-flex">
              <p className="fw-bolder">Estado: </p>
              <p>{document.data?.impacto_status}</p>
            </div>
            <div>
              <p className="fw-bolder">Descripción:</p>
              <p>{document.data?.impacto_status_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ShowStatus.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default ShowStatus;
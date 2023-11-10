// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentPriorizationStatus } from "../../../utils/firebase.js";
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
    const fetchData = async () => {
      const documents = await getCurrentPriorizationStatus();
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
            <dl className="dl-horizontal">
              <dt>Estado:</dt>
              <dd>{document.data?.impacto_status}</dd>
            </dl>

            <dt>Descripción:</dt>
            <dd>{document.data?.impacto_status_description}</dd>
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

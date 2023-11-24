// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getActivityStatusHistory } from "../../utils/firebase.js";
import Spinner from "../UI/Spinner.jsx";

function ShowStatus({ documentId }) {
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getActivityStatusHistory();
        console.log(documents);
        const thisDocument = documents.find(
          (doc) => doc?.data.activity === documentId
        );
        setDocument(thisDocument);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener datos: ", error);
      }
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
              <dd>{document?.data?.status}</dd>
            </dl>

            <dt>Descripción:</dt>
            <dd>{document?.data?.description}</dd>
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

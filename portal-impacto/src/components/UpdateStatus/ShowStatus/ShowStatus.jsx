// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { getDocuments } from "../../../firebase/firebase"
import Spinner from "../../UI/Spinner";

function ShowStatus({ documentId }) {

    const [document, setDocument] = useState({ data: { impactoStatus: "", impactoStatusDescription: "Sin descripción" } });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(documentId)
        const fetchData = async () => {

            const documents = await getDocuments();
            console.log(documents)
            const thisDocument = documents.find(document => document.id === documentId)
            setDocument(thisDocument)
            setIsLoading(false);
        }

        fetchData()
    }, [documentId, document]);

    return (
        isLoading ? (
            <Spinner />
        ) : (
            <div className="row justify-content-center">
                {console.log(document)}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">ESTADO IMPACTO</h2>
                            <p>Estado: </p>
                            <p>{document.data?.impactoStatus}</p>
                            <p>Descripción:</p>
                            <p>{document.data?.impactoStatusDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

ShowStatus.propTypes = {
    documentId: PropTypes.string.isRequired,
};

export default ShowStatus;

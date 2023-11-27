
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";
import ViewActivityInfoTable from "../ViewActivityInfo/ViewActivityInfoTable.jsx"
import ViewActivityStatusHistoryTable from "./ViewActivityStatusHistoryTable.jsx";
import { getActivityInfoDocuments, getWeekDocuments, getActivityStatusDocuments, getActivityLogDocuments } from "../../utils/firebase.js";

function ViewActivityInfo() {
    const { documentId } = useParams();
    const [weekDocument, setWeekDocument] = useState({});
    const [activityDocument, setActivityDocument] = useState({});
    const [activityStatusDocument, setActivityStatusDocument] = useState({});
    const [activityLogDocument, setActivityLogDocument] = useState({});


    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activityDocuments, weekDocuments, activityStatusDocuments, activityLogDocuments] = await Promise.all([
                    getActivityInfoDocuments(),
                    getWeekDocuments(),
                    getActivityStatusDocuments(),
                    getActivityLogDocuments(),
                ]);
                const activityDoc = activityDocuments.find((doc) => doc.id === documentId);
                const weekDoc = weekDocuments.find((doc) => doc.id === activityDoc?.data.week_id);
                const activityStatusDoc = activityStatusDocuments.find((doc) => doc?.data.activity === documentId);
                const activityLogDoc = activityLogDocuments.find((doc) => doc.id === documentId);
                setWeekDocument(weekDoc)
                setActivityDocument(activityDoc)
                setActivityStatusDocument(activityStatusDoc)
                setActivityLogDocument(activityLogDoc)

                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener documentos: ", error);
            }
        };
        fetchData();
    }, [documentId]);

    const handleReturnClick = () => {
        navigate("/home");
    };

    return (
        <>
            <Navbar />
            <section id="view-dossier">
                <div className="container">
                    <h1 className="my-2 text-center mt-3 mb-3">Información de Actividad</h1>
                    {<ViewActivityInfoTable isLoading={isLoading} weekDocument={weekDocument} activityDocument={activityDocument} />}
                </div>
                <div className="container">
                    <h1 className="my-2 text-center mt-3 mb-3">Estado Impacto Actual</h1>
                    {<ViewActivityStatusHistoryTable isLoading={isLoading} activityStatusDocument={activityStatusDocument} activityLogDocument={activityLogDocument} />}
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

export default ViewActivityInfo;

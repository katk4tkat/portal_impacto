// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";
import ViewActivityInfoTable from "../ViewActivityInfo/ViewActivityInfoTable.jsx";
import ViewActivityStatusHistoryTable from "./ViewActivityStatusHistoryTable.jsx";
import ViewActivityPlanningTable from "./ViewActivityPlanningTable.jsx";
import ViewActivityLogTable from "./ViewActivityLogTable.jsx";
import ViewActivityHistoryLogTable from "./ViewActivityHistoryLogTable.jsx";
import {
  getActivityInfoDocuments,
  getWeekDocuments,
  getActivityStatusHistory,
  getActivityLogDocuments,
  getActivityPlanningDocuments,
  getActivityHistoryLogDocuments,
} from "../../utils/firebase.js";
import Spinner from "../UI/Spinner";

function ViewActivityInfo() {
  const { documentId } = useParams();
  const [weekDocument, setWeekDocument] = useState({});
  const [activityDocument, setActivityDocument] = useState({});
  const [activityStatusDocument, setActivityStatusDocument] = useState({});
  const [activityLogDocument, setActivityLogDocument] = useState({});
  const [activityPlanningDocument, setActivityPlanningDocument] = useState({});
  const [activityHistoryLogDocument, setActivityHistoryLogDocument] = useState(
    {}
  );

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          activityDocuments,
          weekDocuments,
          activityStatusDocuments,
          activityLogDocuments,
          activityPlanningDocuments,
          activityHistoryLogDocuments,
        ] = await Promise.all([
          getActivityInfoDocuments(),
          getWeekDocuments(),
          getActivityStatusHistory(documentId),
          getActivityLogDocuments(documentId),
          getActivityPlanningDocuments(documentId),
          getActivityHistoryLogDocuments(documentId),
        ]);

        const activityDoc = activityDocuments.find(
          (doc) => doc.id === documentId
        );
        const weekDoc = weekDocuments.find(
          (doc) => doc.id === activityDoc?.data.week_id
        );

        setWeekDocument(weekDoc);
        setActivityDocument(activityDoc);
        setActivityStatusDocument(activityStatusDocuments);
        setActivityLogDocument(activityLogDocuments);
        setActivityPlanningDocument(activityPlanningDocuments);
        setActivityHistoryLogDocument(activityHistoryLogDocuments);

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
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ViewActivityInfoTable
                documentId={documentId}
                isLoading={isLoading}
                weekDocument={weekDocument}
                activityDocument={activityDocument}
              />
              <ViewActivityStatusHistoryTable
                isLoading={isLoading}
                activityStatusDocument={activityStatusDocument}
              />
              <ViewActivityLogTable
                isLoading={isLoading}
                activityLogDocument={activityLogDocument}
              />
              <ViewActivityPlanningTable
                isLoading={isLoading}
                activityPlanningDocument={activityPlanningDocument}
              />
              <ViewActivityHistoryLogTable
                isLoading={isLoading}
                activityHistoryLogDocument={activityHistoryLogDocument}
              />
            </>
          )}
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

export default ViewActivityInfo;

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";
import ViewActivityInfoTable from "../ViewActivityInfo/ViewActivityInfoTable.jsx";
import ViewActivityStatusHistoryTable from "./ViewActivityStatusHistoryTable.jsx";
import ViewActivityLogTable from "./ViewActivityLogTable.jsx";
import {
  getActivityInfoDocuments,
  getWeekDocuments,
  getActivityStatusDocuments,
  getActivityLogDocuments,
} from "../../utils/firebase.js";
import Spinner from "../UI/Spinner";

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
        const [
          activityDocuments,
          weekDocuments,
          activityStatusDocuments,
          activityLogDocuments,
        ] = await Promise.all([
          getActivityInfoDocuments(),
          getWeekDocuments(),
          getActivityStatusDocuments(),
          getActivityLogDocuments(),
        ]);
        const activityDoc = activityDocuments.find(
          (doc) => doc.id === documentId
        );
        const weekDoc = weekDocuments.find(
          (doc) => doc.id === activityDoc?.data.week_id
        );
        const activityStatusDoc = activityStatusDocuments.find(
          (doc) => doc?.data.activity === documentId
        );
        const activityLogDoc = activityLogDocuments.find(
          (doc) => doc.id === documentId
        );
        setWeekDocument(weekDoc);
        setActivityDocument(activityDoc);
        setActivityStatusDocument(activityStatusDoc);
        setActivityLogDocument(activityLogDoc);

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

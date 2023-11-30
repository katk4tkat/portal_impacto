import React, { useState, useEffect } from "react";
import { getImageFromStorage } from "../../utils/firebase.js";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner.jsx";

function ViewHistoryLogModal({ activityLogDocument, activityId, closeModal }) {
  const [recordFileNames, setRecordFileNames] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    console.log(activityId);
    if (activityLogDocument && activityId) {
      const log = activityLogDocument.data.history.find(
        (log) => log.activity_id === activityId
      );

      if (log) {
        setRecordFileNames(log.activity_log_file_names || []);
      } else {
        console.log(`No log found for activityId: ${activityId}`);
      }
    }
  }, [activityLogDocument, activityId]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        setLoadingImages(true);
        const urls = await Promise.all(
          recordFileNames.map(
            async (fileName) => await getImageFromStorage(fileName)
          )
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      } finally {
        setLoadingImages(false);
      }
    };

    if (recordFileNames.length > 0) {
      fetchImageUrls();
    }
  }, [recordFileNames]);

  return (
    <div className="container">
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <h1 className="text-center mb-4">GALERÍA DE IMÁGENES</h1>
              {loadingImages ? (
                <Spinner />
              ) : (
                <div className="row d-flex justify-content-center">
                  {imageUrls.length > 0 ? (
                    imageUrls.map((url, index) => (
                      <div key={index} className="col-md-4 mb-4">
                        <div
                          className="card"
                          style={{ width: "15rem", height: "15rem" }}
                        >
                          <img
                            src={url}
                            alt={`Image ${index}`}
                            className="card-img-top h-100"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Sin imágenes disponibles</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewHistoryLogModal.propTypes = {
  activityLogDocument: PropTypes.object,
  activityId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ViewHistoryLogModal;

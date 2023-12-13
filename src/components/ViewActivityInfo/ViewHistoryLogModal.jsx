// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getImageFromStorage } from "../../utils/firebase.js";
import Spinner from "../UI/Spinner.jsx";

function ViewHistoryLogModal({ activityLogImage, closeModal }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        setLoadingImage(true);
        const url = await getImageFromStorage(activityLogImage);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      } finally {
        setLoadingImage(false);
      }
    };

    if (activityLogImage) {
      fetchImageUrl();
    }
  }, [activityLogImage]);

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
              {loadingImage ? (
                <Spinner />
              ) : (
                <div className="d-flex justify-content-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Image"
                      style={{
                        width: "15rem",
                        height: "15rem",
                        objectFit: "cover",
                      }}
                    />
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
  activityLogImage: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ViewHistoryLogModal;

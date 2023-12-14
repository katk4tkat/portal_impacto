// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { getImageFromStorage } from "../../utils/firebase.js";
import Spinner from "../UI/Spinner.jsx";

function ViewHistoryLogModal({
  activityLogImage,
  activityLogImageDescription,
  closeModal,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const downloadLinkRef = useRef(null);

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

  const handleDownloadClick = () => {
    downloadLinkRef.current.click();
  };

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
            <div className="modal-body d-flex flex-column justify-content-center align-items-center">
              <h1 className="text-center mb-4">IMAGEN</h1>
              {loadingImage ? (
                <Spinner />
              ) : (
                <>
                  {imageUrl ? (
                    <>
                      <img
                        src={imageUrl}
                        alt="Image"
                        style={{
                          width: "15rem",
                          height: "15rem",
                          objectFit: "cover",
                        }}
                      />
                      <p className="mt-2">{activityLogImageDescription}</p>
                      <a
                        ref={downloadLinkRef}
                        href={imageUrl}
                        download="nombre-de-la-imagen.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "none" }}
                      ></a>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={handleDownloadClick}
                      >
                        VER IMAGEN EN TAMAÑO COMPLETO
                      </button>
                    </>
                  ) : (
                    <p>Sin imágenes disponibles</p>
                  )}
                </>
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
  activityLogImageDescription: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ViewHistoryLogModal;

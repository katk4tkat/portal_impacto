// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { getImageFromStorage } from "../../utils/firebase.js";
import PropTypes from "prop-types";

function ViewCurrentLogGallery({ activityLogDocument }) {
  const [recordFileNames, setRecordFileNames] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const downloadLinkRef = useRef(null);
  const [document, setDocument] = useState({});

  useEffect(() => {
    setDocument(activityLogDocument);
  }, [activityLogDocument]);

  useEffect(() => {
    if (document.data && document.data.activity_log_file_names) {
      setRecordFileNames(document.data.activity_log_file_names);
    }
  }, [document]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        recordFileNames.map(
          async (fileName) => await getImageFromStorage(fileName)
        )
      );
      setImageUrls(urls);
    };

    if (recordFileNames.length > 0) {
      fetchImageUrls();
    }
  }, [recordFileNames]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedImage("");
    setIsModalVisible(false);
  };

  const handleDownloadClick = () => {
    downloadLinkRef.current.click();
  };

  return (
    <div className="container">
      <h1>Imágenes:</h1>
      {imageUrls.length === 0 ? (
        <p>Sin imágenes disponibles.</p>
      ) : (
        <div className="row">
          {imageUrls.map((url, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card" style={{ width: "15rem", height: "15rem" }}>
                <img
                  src={url}
                  alt={`Image ${index}`}
                  className="card-img-top h-100"
                  style={{ objectFit: "cover" }}
                  onClick={() => handleImageClick(url)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalVisible && (
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
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  className="img-fluid"
                />
                <div className="d-grid mt-2 mb-2">
                  <a
                    ref={downloadLinkRef}
                    href={selectedImage}
                    download="nombre-de-la-imagen.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "none" }}
                  ></a>
                  <button
                    type="button"
                    className="btn btn-dark mt-2"
                    onClick={handleDownloadClick}
                  >
                    VER IMAGEN EN TAMAÑO COMPLETO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ViewCurrentLogGallery.propTypes = {
  activityLogDocument: PropTypes.object,
};

export default ViewCurrentLogGallery;

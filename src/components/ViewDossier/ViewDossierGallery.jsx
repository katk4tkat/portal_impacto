import React from "react";

function ViewDossierGallery() {
  return (
    <div className="container">
      <h1>Images</h1>
      <div className="row row-cols-4">
        <div className="col">
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder Image"
            className="img-fluid"
          />
        </div>
        <div className="col">
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder Image"
            className="img-fluid"
          />
        </div>
        <div className="col">
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder Image"
            className="img-fluid"
          />
        </div>
        <div className="col">
          <video width="100%" height="auto" controls>
            <source src="https://www.example.com/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default ViewDossierGallery;

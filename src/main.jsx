import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "./utils/firebase.js";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import UploadActivities from "./components/UploadActivities/UploadActivities";
import UpdateActivityStatus from "./components/ActivityStatus/UpdateStatus";
import UploadActivityLog from "./components/UploadActivityLog/UploadActivityLog";
import ViewDossier from "./components/ViewDossier/ViewDossier";

import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root"));

function PrivateRoute({ element }) {
  const isAuthenticated = isUserAuthenticated();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isUserAuthenticated() ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/upload-activities"
          element={<PrivateRoute element={<UploadActivities />} />}
        />
        <Route
          path="/update-activity-status/:documentId"
          element={<PrivateRoute element={<UpdateActivityStatus />} />}
        />
        <Route
          path="/upload-activity-log/:documentId"
          element={<PrivateRoute element={<UploadActivityLog />} />}
        />
        <Route
          path="/view-dossier/:documentId"
          element={<PrivateRoute element={<ViewDossier />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

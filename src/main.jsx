import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "./utils/firebase.js";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import UploadActivities from "./components/UploadActivities/UploadActivities";
import UpdateActivityStatus from "./components/ActivityStatus/UpdateStatus";
import UploadActivityLog from "./components/UploadActivityLog/UploadActivityLog";
import ViewActivityInfo from "./components/ViewActivityInfo/ViewActivityInfo";
import CreateActivity from "./components/CreateActivity/CreateActivity.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ActivityPlanning from "./components/ActivityPlanning/ActivityPlanning.jsx";
import ViewActivityDossier from "./components/ViewActivityDossier/ViewActivityDossier.jsx";
import Admin from "./components/Admin/Admin.jsx";
import CreateUser from "./components/Admin/CreateUser.jsx"

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
          path="/create-activity"
          element={<PrivateRoute element={<CreateActivity />} />}
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
          path="/activity-planning/:documentId"
          element={<PrivateRoute element={<ActivityPlanning />} />}
        />
        <Route
          path="/view-activity-info/:documentId"
          element={<PrivateRoute element={<ViewActivityInfo />} />}
        />
        <Route
          path="/view-activity-dossier/:documentId"
          element={<PrivateRoute element={<ViewActivityDossier />} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute element={<Admin />} />}
        />
        <Route
          path="/create-user"
          element={<PrivateRoute element={<CreateUser />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

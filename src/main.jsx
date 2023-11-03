import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "./utils/firebase.js";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import UploadPriorization from "./components/UploadPriorization/UploadPriorization";
import UpdateStatus from "./components/UpdateStatus/UpdateStatus";
import EnterRecord from "./components/EnterRecord/EnterRecord.jsx"
import "bootstrap/dist/css/bootstrap.min.css";

function PrivateRoute({ element }) {
  const isAuthenticated = isUserAuthenticated();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

const root = createRoot(document.getElementById("root"));
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
          path="/upload-priorization"
          element={<PrivateRoute element={<UploadPriorization />} />}
        />
        <Route
          path="/update-status/:documentId"
          element={<PrivateRoute element={<UpdateStatus />} />}
        />
        <Route
          path="/enter-record/:documentId"
          element={<PrivateRoute element={<EnterRecord />} />}
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

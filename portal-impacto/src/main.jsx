import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import UploadPriorization from "./components/UploadPriorization/UploadPriorization";
import { isUserAuthenticated } from "./firebase/firebase";
import UpdateStatus from "./components/UpdateStatus/UpdateStatus";

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

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

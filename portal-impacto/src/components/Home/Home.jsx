import React from "react";
import Navbar from "../Navbar/Navbar";
import UploadButton from "../UploadButton/UploadButton";
import "./home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1>PRIORIZACIÓN</h1>
      </div>
      <UploadButton />
    </>
  );
}

export default Home;

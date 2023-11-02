import React from "react";
import Navbar from "../Navbar/Navbar";
import Priorization from "../Priorization/Priorization";
import "./home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Priorization />
      </div>
    </>
  );
}

export default Home;

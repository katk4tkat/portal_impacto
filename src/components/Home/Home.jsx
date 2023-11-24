import React from "react";
import Navbar from "../Navbar/Navbar";
import ActivityTable from "../ActivityTable/ActivityTable";
import "./home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <ActivityTable />
      </div>
    </>
  );
}

export default Home;

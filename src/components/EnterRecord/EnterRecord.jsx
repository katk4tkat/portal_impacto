// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Navbar/Navbar";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import EnterRecordForm from "./EnterRecordForm"


function EnterRecord() {
    const navigate = useNavigate();
    const { documentId } = useParams();

    const handleReturnClick = () => {
        navigate("/home");
    };

    return (
        <>
            <Navbar />
            <EnterRecordForm documentId={documentId} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto mt-5">
                        <ButtonUI
                            text="VOLVER A PRIORIZACIÓN"
                            icon="bi bi-arrow-return-left"
                            onClick={handleReturnClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnterRecord;

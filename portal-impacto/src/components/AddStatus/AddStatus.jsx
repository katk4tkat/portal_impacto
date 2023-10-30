// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Navbar/Navbar";
import AddStatusForm from "./AddStatusForm.jsx";
import ButtonUI from "../UI/ButtonUI";
import { useNavigate } from "react-router-dom";

function AddStatus() {
    const navigate = useNavigate();

    const handleReturnClick = () => {
        navigate("/home");
    };

    return (
        <>
            <Navbar />
            <AddStatusForm />
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

export default AddStatus;
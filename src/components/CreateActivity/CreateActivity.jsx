// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ButtonUI from '../UI/ButtonUI';
import CreateActivityForm from "../CreateActivity/CreateActivityForm"

function CreateActivity() {

    const navigate = useNavigate();

    const handleReturnClick = () => {
        navigate("/home");
    };
    return (
        <>
            <Navbar />
            <section id="create-activity">
                <div className="container">
                </div>
                <CreateActivityForm />
                <div className="d-flex justify-content-center mt-5">
                    <ButtonUI
                        text="VOLVER"
                        icon="bi bi-arrow-return-left"
                        marginClassName="mb-5"
                        btnClassName="btn-link"
                        onClick={handleReturnClick}
                    />
                </div>
            </section>
        </>
    );
}

export default CreateActivity

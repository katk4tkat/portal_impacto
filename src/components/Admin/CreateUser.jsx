import React from 'react'
import { createUser, createUserDocument } from '../../utils/firebase'
import { useForm, Controller } from "react-hook-form";
import Navbar from '../Navbar/Navbar';
import ButtonUI from '../UI/ButtonUI';
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const navigate = useNavigate();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            user: "",
            password: "",
        },
    });



    const onSubmit = async (formData) => {
        const { name, email, password, role } = formData;

        const user = localStorage.getItem("userEmail");

        const userCredential = await createUser(email, password);
        const userId = userCredential.uid;

        const newUser = {
            name: name,
            email: email,
            role: role,
            userId: userId,
            created_at: new Date(),
            created_by: user,
        }

        await createUserDocument(newUser)
    }
    const handleReturnClick = () => {
        navigate("/home");
    };

    return (
        <>
            <Navbar />
            <div>
                <h1>CREAR USUARIO</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                    <div className="form-group">
                        <label htmlFor="user">Nombre de usuario:</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="name"
                                    placeholder="Nombre + Apellido"
                                    className="form-control mb-3"
                                    required
                                />)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Nombre de usuario:</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="email"
                                    id="email"
                                    placeholder="correo electrónico"
                                    className="form-control mb-3"
                                    required
                                />)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="password"
                                    id="password"
                                    placeholder="usuario"
                                    className="form-control mb-3"
                                    required
                                />)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Rol:</label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="form-control mb-3" id="role">
                                    <option value="" defaultValue>
                                        Seleccione un Rol
                                    </option>
                                    <option value="admin">Administrador</option>
                                    <option value="user">Usuario</option>
                                </select>
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                    > crear usuario</button>
                </form >
            </div >
            <ButtonUI
                text="VOLVER"
                icon="bi bi-arrow-return-left"
                marginClassName="mb-5"
                btnClassName="btn-link"
                onClick={handleReturnClick}
            />
        </>
    )
}

export default CreateUser

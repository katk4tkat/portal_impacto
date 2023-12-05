// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginEmail } from "../../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { loginErrorHandler } from "./login-error-handler";

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginEmail(data.email, data.password);
      navigate("/home");
    } catch (error) {
      const errorText = loginErrorHandler(error);
      setErrorMessage(errorText);
    }
  };

  return (
    <section
      id="login"
      className="d-flex align-items-center justify-content-center bg-white"
      style={{ height: "100vh" }}
    >
      <div
        className="container p-5 text-center bg-light shadow-sm rounded border"
        style={{ maxWidth: "500px" }}
      >
        <h2>PORTAL IMPACTO</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="needs-validation"
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="ejemplo@mail.com"
              {...register("email", {
                required: "Ingrese su correo electrónico",
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="******"
              {...register("password", { required: "Ingrese su contraseña" })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-dark btn-block w-100">
              INGRESAR
            </button>
          </div>
        </form>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    </section>
  );
}

export default Login;

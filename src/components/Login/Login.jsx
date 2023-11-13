// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { loginEmail } from "../../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { loginErrorHandler } from "./login-error-handler";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginEmail(data.email, data.password);
      localStorage.setItem("userEmail", data.email);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su correo electrónico" }}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  className="form-control mt-5 mb-5 bg-white"
                  placeholder="E-mail"
                  autoComplete="email"
                />
              )}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su contraseña" }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="form-control mb-5 col-8 bg-white"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
              )}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          {errorMessage && <span className="text-danger">{errorMessage}</span>}
          <div className="form-group">
            <button type="submit" className="btn btn-dark btn-block w-100">
              INGRESAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;

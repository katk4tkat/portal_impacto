import React from "react";
import { useForm, Controller } from "react-hook-form";
import { loginEmail } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
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
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="text-center"
        style={{
          backgroundColor: "#EBEBEB",
          padding: "20px",
          borderRadius: "10px",
          width: "500px",
          minHeight: "60vh",
        }}
      >
        <h2 className="mt-5">PORTAL IMPACTO</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Ingrese su correo electrónico" }}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  className="form-control mt-5 mb-5"
                  style={{ backgroundColor: "white" }}
                  placeholder="E-mail"
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
              rules={{ required: "Ingrese su contraseña" }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="form-control mb-5 col-8"
                  style={{ backgroundColor: "white" }}
                  placeholder="Contraseña"
                />
              )}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-dark btn-block mt-3 col-8"
              style={{ width: "100%" }}
            >
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

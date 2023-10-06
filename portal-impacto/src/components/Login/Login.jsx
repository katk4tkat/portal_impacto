import React, { useState } from "react";
import { loginEmail } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await loginEmail(email, password);
      console.log(email, password);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="maindiv">
      <>
      <div className="divlogin">
      <h2>PORTAL IMPACTO</h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
        <button onClick={onSubmit} className="loginbtn">ENTRAR</button>
        </div>
      </>
    </div>
  );
}

export default Login;

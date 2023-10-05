import React, { useState } from "react";
import { loginEmail } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

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
    <div>
      <>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSubmit}>submit</button>
      </>
    </div>
  );
}

export default Login;

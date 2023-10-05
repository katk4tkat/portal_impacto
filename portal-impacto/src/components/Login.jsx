import React, { useState } from "react";
import { loginEmail } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await loginEmail(email, password);
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label for="email">email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label for="username">password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={submit}>submit</button>
    </>
  );
}

export default Login;

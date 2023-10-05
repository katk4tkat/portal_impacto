import React, { useState } from "react";
import { loginEmail } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase-config";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const submit = async () => {
    try {
      await loginEmail(email, password);
      setIsLoggedIn(true);
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const user = auth.currentUser;

  return (
    <div>
      {!isLoggedIn ? (
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
          <button onClick={submit}>submit</button>
        </>
      ) : (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <Home/>
        </>
      )}
    </div>
  );
}

export default Login;

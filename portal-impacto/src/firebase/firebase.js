import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

export const loginEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const isUserAuthenticated = () => {
  return auth.currentUser !== null;
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("logout!");
    })
    .catch((error) => {
      console.log(error);
    });
};

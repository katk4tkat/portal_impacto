import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config.js";

export const loginEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

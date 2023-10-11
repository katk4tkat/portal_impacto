import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase-config.js";
import { collection, addDoc } from "firebase/firestore";

export const loginEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const isUserAuthenticated = () => {
  return auth.currentUser !== null;
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("logout succesful");
  } catch (error) {
    console.error("logout", error);
  }
};

export const priorizationData = async (uploadPriorizationObject) => {
  try {
    const docRef = await addDoc(collection(db, "PriorizationObject"), {
      ...uploadPriorizationObject,
      userId: auth.currentUser.uid,
    });

    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

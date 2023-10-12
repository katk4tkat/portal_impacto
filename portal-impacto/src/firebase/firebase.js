import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "./firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

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


export function uploadFile(file, week) {
  const storageRef = ref(storage, `${week}.xlsx`);
  return uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot);
  }
  )
}

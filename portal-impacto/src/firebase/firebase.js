import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
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

export async function uploadFile(file, week) {
  const storageRef = ref(storage, `${week}.xlsx`);
  const snapshot = await uploadBytes(storageRef, file);
  console.log(snapshot);
}

export const getDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "PriorizationObject"));
    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Obtén los datos del documento
      console.log("ID del documento: ", doc.id);
      console.log("Datos del documento: ", data);
      console.log("Semana: ", data.week);
      console.log("data: ", data.data);
    });
  } catch (error) {
    console.error("Error al obtener documentos: ", error);
  }
};

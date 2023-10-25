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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function uploadFile(file, week) {
  const storageRef = ref(storage, `${week}.xlsx`);
  const snapshot = await uploadBytes(storageRef, file);
}

export const getDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "PriorizationObject"));
    const documents = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({
        id: doc.id,
        data: data,
      });
    });

    return documents;
  } catch (error) {
    console.error("Error al obtener documentos: ", error);
    throw error; // Optionally re-throw the error for handling in the caller.
  }
};

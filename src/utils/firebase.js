import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
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

export const addPriorization = async (uploadPriorizationObject) => {
  try {
    const docRef = await addDoc(collection(db, "PriorizationObject"), {
      ...uploadPriorizationObject,
      userId: auth.currentUser.uid,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function uploadPriorizationFile(file, week) {
  const storageRef = ref(storage, `${week}.xlsx`);
  const snapshot = await uploadBytes(storageRef, file);
}

export const getDocuments = async ({ itemsPerPage }) => {
  try {
    const q = query(collection(db, "PriorizationObject"), orderBy("week_name", "desc"), limit(itemsPerPage));
    const querySnapshot = await getDocs(q);
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
    throw error;
  }
};

export const updatePriorizationStatus = async (documentId, updatedStatus) => {
  const statusDocRef = doc(db, "PriorizationObject", documentId);
  await updateDoc(statusDocRef, updatedStatus);
};

export async function uploadRecordFile(recordIMG) {
  const storageRef = ref(storage, recordIMG[0].name);
  await uploadBytes(storageRef, recordIMG[0]);
}

export const createNewRecord = async (documentId, newRecord) => {
  const statusDocRef = doc(db, "PriorizationObject", documentId);
  await updateDoc(statusDocRef, newRecord);
};
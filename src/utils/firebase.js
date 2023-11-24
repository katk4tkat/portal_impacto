import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

// export const createUserDocument = async (userId, userEmail) => {
//   try {
//     const docRef = await addDoc(collection(db, "User"), {
//       id: userId,
//       username: userEmail,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

export const createWeekDocument = async (weekData) => {
  try {
    const docRef = await addDoc(collection(db, "Week"), {
      ...weekData,
      userId: auth.currentUser.uid,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createActivityDocument = async (activityData) => {
  try {
    const docRef = await addDoc(collection(db, "Activity"), {
      ...activityData,
      userId: auth.currentUser.uid,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getActivitiesPaginated = async ({ itemsPerPage }) => {
  try {
    const q = query(
      collection(db, "Activity"),
      orderBy("week_name", "desc"),
      limit(itemsPerPage)
    );
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
    console.error("Error al obtener actividades: ", error);
    throw error;
  }
};

export const createActivityStatusHistoryDocument = async (
  uploadPriorizationObject
) => {
  try {
    const docRef = await addDoc(collection(db, "ActivityStatusHistory"), {
      ...uploadPriorizationObject,
      userId: auth.currentUser.uid,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getActivityStatusHistory = async () => {
  try {
    const q = query(
      collection(db, "ActivityStatusHistory")
      // orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({
        id: doc.id,
        data: {
          ...data,
          activity: data.activity,
        },
      });
    });
    return documents;
  } catch (error) {
    console.error("Error al obtener estados: ", error);
    throw error;
  }
};

export const updateActivityStatusHistory = async (
  documentId,
  updatedStatus
) => {
  try {
    // Assuming 'activity' is the field you want to match with documentId
    const q = query(
      collection(db, "ActivityStatusHistory"),
      where("activity", "==", documentId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there is only one matching document; adjust if needed
      const statusDocRef = querySnapshot.docs[0].ref;
      const currentData = querySnapshot.docs[0].data();

      if (!currentData.status_history) {
        currentData.status_history = [];
      }

      currentData.status_history.push({
        previous_status: currentData.status || "",
        previous_status_description: currentData.description || "",
        previous_created_by: currentData.created_by || "",
        previous_created_at: currentData.created_at || "",
      });

      const isValidUpdate = Object.keys(updatedStatus).every(
        (key) => updatedStatus[key] !== undefined
      );

      if (isValidUpdate) {
        const payload = {
          ...updatedStatus,
          activity: currentData.activity,
          status_history: currentData.status_history,
        };
        console.log(payload);

        try {
          await setDoc(statusDocRef, payload);
          console.log("Document updated successfully");
        } catch (error) {
          console.error("Error updating the document:", error);
        }
      } else {
        console.error("Error: Update data contains undefined values.");
      }
    } else {
      console.error("Error: Document not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// export const getActivityCurrentStatus = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "Activity"));
//     const documents = [];

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       documents.push({
//         id: doc.id,
//         data: data,
//       });
//     });
//     return documents;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// export const updateActivityStatusHistory = async (
//   activityIdToUpdate,
//   currentStatus
// ) => {
//   const activityDocRef = doc(db, "Activity", activityIdToUpdate);
//   const activityDocSnapshot = await getDoc(activityDocRef);
//   if (activityDocSnapshot.exists()) {
//     const activityData = activityDocSnapshot.data();

//     const updatedActivity = {
//       ...activityData,
//       current_status: currentStatus,
//     };
//     await updateDoc(activityDocRef, updatedActivity);
//     console.log(`Estado actualizado para la actividad ${activityIdToUpdate}`);
//   } else {
//     console.error(`No se encontró la actividad con ID ${activityIdToUpdate}`);
//   }
// };

export async function uploadPriorizationFile(file, week) {
  const storageRef = ref(storage, `${week}.xlsx`);
  const snapshot = await uploadBytes(storageRef, file);
}

export async function uploadRecordFile(recordIMG) {
  const storageRef = ref(storage, recordIMG[0].name);
  await uploadBytes(storageRef, recordIMG[0]);
}

export const createNewRecord = async (documentId, newRecord) => {
  const statusDocRef = doc(db, "PriorizationObject", documentId);
  try {
    const docSnapshot = await getDoc(statusDocRef);
    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();

      if (!currentData.record_history) {
        currentData.record_history = [];
      }
      currentData.record_history.push({
        record_written_by: currentData.record_written_by || "",
        record_creation_date: currentData.record_creation_date || "",
        record_GPS: currentData.record_GPS || "",
        record_description: currentData.record_description || "",
        record_file_names: currentData.record_file_names || "",
      });
      const isValidUpdate = Object.keys(newRecord).every(
        (key) => newRecord[key] !== undefined
      );
      if (isValidUpdate) {
        const payload = {
          ...newRecord,
          record_history: currentData.record_history,
        };
        try {
          const updatedDoc = await updateDoc(statusDocRef, payload);
        } catch (error) {
          console.error("Error al actualizar el documento:", error);
        }
      } else {
        console.error(
          "Error: Los datos de actualización contienen valores indefinidos."
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDossierDocuments = async () => {
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
    throw error;
  }
};

export const getImageFromStorage = async (fileName) => {
  try {
    const imageRef = ref(
      storage,
      "gs://portal-impacto-609ff.appspot.com/" + fileName
    );
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error al obtener la URL de descarga:", error);
    throw error;
  }
};

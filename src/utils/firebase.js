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
  documentId,
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
    const docRef = await addDoc(collection(db, "ActivityStatusHistory", documentId), {
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
    const q = query(
      collection(db, "ActivityStatusHistory"),
      where("activity", "==", documentId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
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

export const updateCurrentStatusInActivity = async (documentId, newStatus) => {
  try {
    const activityDocRef = doc(db, "Activity", documentId);
    const activityDocSnapshot = await getDoc(activityDocRef);

    if (activityDocSnapshot.exists()) {
      const currentData = activityDocSnapshot.data();

      const updatedActivity = {
        ...currentData,
        current_status: newStatus,
      };

      await updateDoc(activityDocRef, updatedActivity);

      console.log(
        "Campo 'current_status' actualizado en la colección 'Activity'"
      );
    } else {
      console.error(
        "Error: Documento no encontrado en la colección 'Activity'"
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function uploadPriorizationFile(file, week) {
  const storageRef = ref(storage, `${week}.xlsx`);
  const snapshot = await uploadBytes(storageRef, file);
}

export const createActivityLogDocument = async (documentId, newActivityLog) => {
  try {
    const activityLogRef = doc(db, "ActivityLog", documentId);
    const docSnapshot = await getDoc(activityLogRef);

    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();
      const existingActivity = existingData.activity || '';

      if (existingActivity === documentId) {
        const history = existingData.history || [];
        const updatedHistory = [
          ...history,
          {
            activity_log_written_by: existingData.activity_log_written_by || "",
            activity_log_creation_date: existingData.activity_log_creation_date || "",
            activity_log_GPS: existingData.activity_log_GPS || "",
            activity_log_description: existingData.activity_log_description || "",
            activity_log_file_names: existingData.activity_log_file_names || "",
          },
        ];

        await updateDoc(activityLogRef, {
          ...newActivityLog,
          userId: auth.currentUser.uid,
          history: updatedHistory,
        });
      } else {
        console.error("El documentId y la actividad existente no coinciden.");
      }
    } else {

      await setDoc(activityLogRef, {
        ...newActivityLog,
        userId: auth.currentUser.uid,
        activity: documentId,
        history: [],
      });
    }
  } catch (error) {
    console.error('Error al agregar documento:', error);
    throw error;
  }
};

export async function uploadActivityLogFile(recordIMG) {
  const storageRef = ref(storage, `ActivityLogFile/${recordIMG[0].name}`);
  await uploadBytes(storageRef, recordIMG[0]);
}

export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error al obtener documentos: ", error);
    throw error;
  }
};

export const getWeekDocuments = async () => {
  return getDocuments("Week");
};

export const getActivityInfoDocuments = async () => {
  return getDocuments("Activity");
};

export const getActivityStatusDocuments = async () => {
  return getDocuments("ActivityStatusHistory");
};

export const getActivityLogDocuments = async () => {
  return getDocuments("ActivityLog");
};


export const getImageFromStorage = async (fileName) => {
  try {
    const imageRef = ref(
      storage,
      "gs://portal-impacto-609ff.appspot.com/ActivityLogFile/" + fileName
    );
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error al obtener la URL de descarga:", error);
    throw error;
  }
};

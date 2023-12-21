import { v4 as uuidv4 } from "uuid";
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

export const loginEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  localStorage.setItem("userToken", idToken);

  return user;
};

export const isUserAuthenticated = () => {
  const authToken = localStorage.getItem("userToken");
  return authToken !== null && authToken !== undefined;
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("userToken");
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

export const createActivityStatusHistoryDocument = async (newHistoryRecord) => {
  try {
    const docRef = await addDoc(collection(db, "ActivityStatusHistory"), {
      ...newHistoryRecord,
      userId: auth.currentUser.uid,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getActivityStatusHistory = async (documentId) => {
  try {
    const q = query(
      collection(db, "ActivityStatusHistory"),
      where("activity", "==", documentId)
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

export const updateActivityStatusHistory = async (updatedStatus) => {
  try {
    const statusCollectionRef = collection(db, "ActivityStatusHistory");

    const updatedStatusData = {
      ...updatedStatus,
      userId: auth.currentUser.uid,
    };

    const docRef = await addDoc(statusCollectionRef, updatedStatusData);

    console.log("Document updated successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error updating the document:", error);
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

export const createActivityLogDocument = async (newActivityLog) => {
  try {
    const activityLogRef = collection(db, "ActivityLog");

    const uploadNewActivityLog = {
      ...newActivityLog,
      userId: auth.currentUser.uid,
    };

    const docRef = await addDoc(activityLogRef, uploadNewActivityLog);

    console.log("Document updated successfully with ID: ", docRef.id);
    return docRef.id; // Devolver el ID del documento creado
  } catch (error) {
    console.error("Error updating the document:", error);
  }
};

export async function uploadActivityLogFile(recordIMG) {
  const storageRef = ref(storage, `activity_logs/${recordIMG[0].name}`);
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

export const getActivityLogDocuments = async (documentId) => {
  try {
    const q = query(
      collection(db, "ActivityLog"),
      where("activity", "==", documentId)
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

export const getActityPlanningDocuments = async (documentId) => {
  try {
    const q = query(
      collection(db, "ActivityPlanning"),
      where("activity", "==", documentId)
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

export const getImageFromStorage = async (fileName) => {
  try {
    const imageRef = ref(
      storage,
      "gs://portal-impacto-609ff.appspot.com/activity_logs/" + fileName
    );
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error al obtener la URL de descarga:", error);
    throw error;
  }
};
export const searchTechnicalUnit = async (searchTerm) => {
  try {
    const activityDocs = await getActivityInfoDocuments(); // Obtener los documentos de actividad
    const filteredUnits = activityDocs.filter((doc) => {
      // Filtrar documentos según el término de búsqueda (ignorando mayúsculas y minúsculas)
      const uTecnica = doc.data.u_tecnica || ""; // Asegúrate de que el campo exista en tus documentos
      const searchTermLowerCase = searchTerm.toLowerCase();
      return uTecnica.toLowerCase().includes(searchTermLowerCase);
    });
    return filteredUnits.map((doc) => doc.data.u_tecnica); // Devolver solo los valores de "u_tecnica"
  } catch (error) {
    console.error("Error al buscar unidad técnica:", error);
    throw error;
  }
};
export const createActivityHistoryLogDocument = async (historyData) => {
  try {
    const docRef = await addDoc(collection(db, "ActivityHistoryLog"), {
      ...historyData,
      userId: auth.currentUser.uid,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getCurrentActivityInfo = async (documentId) => {
  try {
    const activityDocRef = doc(db, "Activity", documentId);
    const activityDocSnapshot = await getDoc(activityDocRef);

    if (activityDocSnapshot.exists()) {
      const currentData = activityDocSnapshot.data();
      const document = {
        data: { ...currentData },
      };
      return document;
    }
  } catch (error) {
    console.error("Error al obtener el documento: ", error);
    throw error;
  }
};

export const updateFieldInActivity = async (
  documentId,
  fieldName,
  newValue
) => {
  try {
    const activityDocRef = doc(db, "Activity", documentId);
    const activityDocSnapshot = await getDoc(activityDocRef);

    if (activityDocSnapshot.exists()) {
      const currentData = activityDocSnapshot.data();
      const updatedActivity = {
        ...currentData,
        [fieldName]: newValue,
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

export const createActivityPlanningDocument = async (newActivityPlanning) => {
  try {
    const docRef = await addDoc(collection(db, "ActivityPlanning"), {
      ...newActivityPlanning,
      userId: auth.currentUser.uid,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

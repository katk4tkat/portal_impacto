// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWCeXvRklPs4YQx0nUsr1kVTwVB4GXBEY",
  authDomain: "portal-impacto.firebaseapp.com",
  projectId: "portal-impacto",
  storageBucket: "portal-impacto.appspot.com",
  messagingSenderId: "198301037428",
  appId: "1:198301037428:web:af93b2a4520510c7c9f221",
  measurementId: "G-W08BWTGTSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db};
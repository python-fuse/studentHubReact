import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG3xx1wq7J8kG1X2j_x8pdNrX7L_Idmj8",
  authDomain: "studenthub-bf9b0.firebaseapp.com",
  projectId: "studenthub-bf9b0",
  storageBucket: "studenthub-bf9b0.appspot.com",
  messagingSenderId: "639898823543",
  appId: "1:639898823543:web:36d5c8c50f630a77b18f72",
  measurementId: "G-CNL2B40TE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };

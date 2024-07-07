// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";



const firebaseConfig = {
  apiKey: "AIzaSyDv_k4aixikEnaIPLVD2HbHeNbQJBsrX68",
  authDomain: "helpamsafe-4e9b4.firebaseapp.com",
  projectId: "helpamsafe-4e9b4",
  storageBucket: "helpamsafe-4e9b4.appspot.com",
  messagingSenderId: "760467686255",
  appId: "1:760467686255:web:be580f035f6e6298bd1e9a",
  measurementId: "G-JWRHJC9EX0"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const auth = getAuth(FIREBASE_APP)

export const firestore = getFirestore(FIREBASE_APP);
// export const analytics = getAnalytics(FIREBASE_APP);

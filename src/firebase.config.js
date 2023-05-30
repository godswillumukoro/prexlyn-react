// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiYwhoszcGspku6LAGbdluANgoOypztU4",
  authDomain: "prexlyn-properties.firebaseapp.com",
  projectId: "prexlyn-properties",
  storageBucket: "prexlyn-properties.appspot.com",
  messagingSenderId: "766581429015",
  appId: "1:766581429015:web:b8887ae65900f767941d52",
  measurementId: "G-H0M932LLZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()
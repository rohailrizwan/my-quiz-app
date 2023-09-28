// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE5kLHfFjepYYjUx064c_NmEph8CGUNYc",
  authDomain: "admin-quiz-b30a5.firebaseapp.com",
  projectId: "admin-quiz-b30a5",
  storageBucket: "admin-quiz-b30a5.appspot.com",
  messagingSenderId: "361714702988",
  appId: "1:361714702988:web:aa324ccf9bad12182e39a9",
  measurementId: "G-KZ6D826NGD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
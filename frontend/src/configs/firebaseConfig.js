// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBP9LDsgagv7eczVx6PjfHZZcp-vG0QmAw",
//   authDomain: "cgforms-99774.firebaseapp.com",
//   projectId: "cgforms-99774",
//   storageBucket: "cgforms-99774.firebasestorage.app",
//   messagingSenderId: "566409358976",
//   appId: "1:566409358976:web:07f41b11af34bd59b20065",
//   measurementId: "G-RLJ55VX1TF"
// };

// export const firebaseAppConfig = initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "cgforms-99774",
  storageBucket: "cgforms-99774.firebasestorage.app",
  messagingSenderId: "566409358976",
  appId: "1:566409358976:web:07f41b11af34bd59b20065",
  measurementId: "G-RLJ55VX1TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

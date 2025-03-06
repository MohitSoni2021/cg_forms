import React from "react";
import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebaseConfig.js"; // Import Firebase Auth
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../configs/firebaseConfig";
import axios from "axios";
import { saveToStorage } from "../utils/encryptStorageutil";

const SignupPage = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      saveToStorage("utilityfunctions", JSON.stringify({name:user.displayName, email:user.email, _id:user.uid}))
      const serverRes = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/user/create`, {name:user.displayName, email:user.email, _id:user.uid})
      alert(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Sign-in failed. Try again!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-72px)] mt-[72px] flex justify-center items-center">
        <div className="standard-max-width px-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center cursor-pointer bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-full shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            <FaGoogle className="text-red-500 mr-3 text-xl" />
            Sign up or Login with Google
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;

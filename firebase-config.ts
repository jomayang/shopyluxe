// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC0L4bjVrv8eM0izz8jqbqHH-Ye6KfEmNY",
//   authDomain: "landing-54760.firebaseapp.com",
//   projectId: "landing-54760",
//   storageBucket: "landing-54760.appspot.com",
//   messagingSenderId: "1090140081949",
//   appId: "1:1090140081949:web:aea814751c4fa6628d5bf4",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAGRc8INmAE6gGc7zhBNgaDsONI8KHlh44",
  authDomain: "baby-75541.firebaseapp.com",
  projectId: "baby-75541",
  storageBucket: "baby-75541.appspot.com",
  messagingSenderId: "32290509616",
  appId: "1:32290509616:web:cdb48998d8f9a252d7aef5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

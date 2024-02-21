// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_KUvTgSF421b9qljbujDg4bwJeTmPzME",
  authDomain: "my-notes-cloud.firebaseapp.com",
  projectId: "my-notes-cloud",
  storageBucket: "my-notes-cloud.appspot.com",
  messagingSenderId: "456386487677",
  appId: "1:456386487677:web:dd1cfaa9d73a10f1e2d814"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
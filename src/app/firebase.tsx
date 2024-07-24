
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Firebase configuration 

const firebaseConfig = {
  apiKey: process.env.GOOGLEAPIKEY,
  authDomain: process.env.GOOGLEAUTHDOMAIN,
  projectId: process.env.GOOGLEPROJECTID,
  storageBucket: process.env.GOOGLESTORAGEBUCKET,
  messagingSenderId: process.env.GOOGLEMESSAGINGSENDERID,
  appId: process.env.GOOGLEAPPID
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
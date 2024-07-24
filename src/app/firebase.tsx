
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Firebase configuration 

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLEAPIKEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLEAUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLEPROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLESTORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLEMESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_GOOGLEAPPID
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
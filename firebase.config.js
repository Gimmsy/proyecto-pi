// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn9xXWMT3rVvQPf2GbSiQgOBD2d_NPPtg",
  authDomain: "proyecto-pi-2e48f.firebaseapp.com",
  projectId: "proyecto-pi-2e48f",
  storageBucket: "proyecto-pi-2e48f.appspot.com",
  messagingSenderId: "124733324806",
  appId: "1:124733324806:web:c469774dbd29bc5a038d87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db=getFirestore(app);
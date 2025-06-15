// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhJBmF_q5wYKTYGyqyFe1j3VEkCmvX_F4",
  authDomain: "whereisit-web.firebaseapp.com",
  projectId: "whereisit-web",
  storageBucket: "whereisit-web.firebasestorage.app",
  messagingSenderId: "136054951202",
  appId: "1:136054951202:web:386452623158f3bfdd297b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
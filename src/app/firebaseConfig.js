// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA5bCLQ6FQOy7k1tGsw-6i6edHBNTFzMxY",
  authDomain: "ap-ace.firebaseapp.com",
  projectId: "ap-ace",
  storageBucket: "ap-ace.appspot.com",
  messagingSenderId: "563753063073",
  appId: "1:563753063073:web:af06384f7bc32844c756e0",
  measurementId: "G-HFJE9RS70P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

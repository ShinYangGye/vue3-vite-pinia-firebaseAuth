import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDmu6bJSJbN02tIlkouJq93_Zod9gJPh8Q",
  authDomain: "vue3-vite-01.firebaseapp.com",
  projectId: "vue3-vite-01",
  storageBucket: "vue3-vite-01.appspot.com",
  messagingSenderId: "385198918162",
  appId: "1:385198918162:web:4ea72887042888389526cb"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };

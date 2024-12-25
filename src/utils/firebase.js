import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBcTbRE0YnvG29iID1MVuyzzBQqaYKc5_8",
  authDomain: "thedevilwebs.firebaseapp.com",
  databaseURL: "https://thedevilwebs-default-rtdb.firebaseio.com",
  projectId: "thedevilwebs",
  storageBucket: "thedevilwebs.firebasestorage.app",
  messagingSenderId: "24678696882",
  appId: "1:24678696882:web:5b6a2f504758b9342e46ab",
  measurementId: "G-2EPC085XG3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, get };
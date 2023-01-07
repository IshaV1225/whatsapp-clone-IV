import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAF6rgtHqZ3ynixwS9k5A_oSXxDJerXlDQ",
  authDomain: "whats-app-clone-145e0.firebaseapp.com",
  databaseURL: "https://whats-app-clone-145e0-default-rtdb.firebaseio.com/",
  projectId: "whats-app-clone-145e0",
  storageBucket: "whats-app-clone-145e0.appspot.com",
  messagingSenderId: "650384716689",
  appId: "1:650384716689:web:a55dc4d126916431896030",
  measurementId: "G-4YENJTX3YN"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};
export default db;
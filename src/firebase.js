import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCVcge4km-Dvh16J3BJHv3grhO1fhJN1lU",
    authDomain: "timeboxing-app-9b1a5.firebaseapp.com",
    projectId: "timeboxing-app-9b1a5",
    storageBucket: "timeboxing-app-9b1a5.appspot.com",
    messagingSenderId: "909931599046",
    appId: "1:909931599046:web:1a4dba49e4a8df642373c7",
    measurementId: "G-M52GBFYRVB"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, provider, db,analytics };
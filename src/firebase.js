import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCI9yU0bFd9AZlh2ZQ1t7dDLdPP7eDe7Wo",
  authDomain: "timebox-776f7.firebaseapp.com",
  projectId: "timebox-776f7",
  storageBucket: "timebox-776f7.appspot.com",
  messagingSenderId: "971430710287",
  appId: "1:971430710287:web:6b55c9e960e303a345277a",
  measurementId: "G-3SSW2C1Y3G"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, provider, db ,analytics };
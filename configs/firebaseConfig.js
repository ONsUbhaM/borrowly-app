import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Import } from "lucide-react";
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "contacts-57d69.firebaseapp.com",
  databaseURL: "https://contacts-57d69.firebaseio.com",
  projectId: "contacts-57d69",
  storageBucket: "contacts-57d69.firebasestorage.app",
  messagingSenderId: "480755222024",
  appId: "1:480755222024:web:79c318fc012d2b198ab3bd",
  measurementId: "G-05XL0YLSDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
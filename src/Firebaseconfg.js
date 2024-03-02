// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1HHnFCSw2BgfsST123aSaPcB9CP6OxaY",
  authDomain: "bawany-gadgets-app.firebaseapp.com",
  projectId: "bawany-gadgets-app",
  storageBucket: "bawany-gadgets-app.appspot.com",
  messagingSenderId: "266477075816",
  appId: "1:266477075816:web:0e109acf444858b9266add",
  measurementId: "G-0TQ8XHV7S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);
// const analytics = getAnalytics(app);





export { app , db , auth , storage };
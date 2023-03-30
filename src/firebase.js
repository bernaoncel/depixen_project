// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNS5C0bv9iMVIJT5yJgkuo2_LXd9ocJ5E",
  authDomain: "depixen-11ed4.firebaseapp.com",
  projectId: "depixen-11ed4",
  storageBucket: "depixen-11ed4.appspot.com",
  messagingSenderId: "371250510243",
  appId: "1:371250510243:web:c4e1f6e8e683701ab1c216",
  measurementId: "G-9S866XKP4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
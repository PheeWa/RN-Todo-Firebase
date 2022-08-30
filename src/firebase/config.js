// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoM1yViQO7iB1wnL6l6TpA0RZ706mGt4M",
  authDomain: "my-todo-app-be.firebaseapp.com",
  projectId: "my-todo-app-be",
  storageBucket: "my-todo-app-be.appspot.com",
  messagingSenderId: "498470646186",
  appId: "1:498470646186:web:a14bcbd496b222475b3bd3",
  measurementId: "G-RMNLHHWE1Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

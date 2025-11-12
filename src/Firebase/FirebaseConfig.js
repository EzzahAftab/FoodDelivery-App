// import { initializeApp } from 'firebase/app';

// import firebase from 'firebase/app';
// import 'firebase/firestore';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {

  // Add Firebase Config Here

  apiKey: "AIzaSyCogA2krjnMPjGXEUE0yAB4illsqTEX0K8",
  authDomain: "easy-eat-15e75.firebaseapp.com",
  projectId: "easy-eat-15e75",
  storageBucket: "easy-eat-15e75.appspot.com",
  messagingSenderId: "106315052603",
  appId: "1:106315052603:web:8b3fcf54e0cda5b47bce1e"
//Intialize Firebase
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


export { firebase }
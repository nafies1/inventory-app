// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Add firebase project config
import firebaseApiConfig from './apiKey-firebase'

// TODO: Replace the following with your app's Firebase project configuration
let firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

//  Firebase project configuration above for information only; what is needed in the config
firebaseConfig = firebaseApiConfig

// Your web app's Firebase configuration

// Initialize Firebase
export const firebases = firebase
export const myFirebase = firebase.initializeApp(firebaseConfig);
export const db = myFirebase.firestore();
export const inventoryDb = db.collection("inventory").doc("inventory-doc")
firebase.analytics();
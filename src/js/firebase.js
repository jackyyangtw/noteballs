import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDcmuF0wSIZ8O01ZwwbtrlRPLrNbpcNpiM",
    authDomain: "noteballs-c5c1a.firebaseapp.com",
    projectId: "noteballs-c5c1a",
    storageBucket: "noteballs-c5c1a.appspot.com",
    messagingSenderId: "523240704672",
    appId: "1:523240704672:web:e08bee0d2c13d051a157c5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {
    db, auth
}
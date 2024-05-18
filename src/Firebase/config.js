import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDFCkzqr5I5r8zU7GQsOZp1hTFt4o8FJ7U",
    authDomain: "olx-clone-74d38.firebaseapp.com",
    projectId: "olx-clone-74d38",
    storageBucket: "olx-clone-74d38.appspot.com",
    messagingSenderId: "251982766745",
    appId: "1:251982766745:web:185dac27abb4d889b60e08",
    measurementId: "G-2QR4T0YDXT"
  };
 export default firebase.initializeApp(firebaseConfig)

// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
// import { getFirestore } from  "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";

//         import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN32a1S-vcwO8zMhBY29IZJaM6sAsqnEM",
    authDomain: "macalender-4afd4.firebaseapp.com",
    projectId: "macalender-4afd4",
    storageBucket: "macalender-4afd4.appspot.com",
    messagingSenderId: "514168980630",
    appId: "1:514168980630:web:454a2c9a2fbfe7e03daeb7",
    measurementId: "G-T6NF4XHEK5"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase;

/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
const firebaseConfig = {
  apiKey: "AIzaSyBk9KCTaVFXFeZLo5y3nLj2lMx_UU3yoVg",
  authDomain: "nina-ongley-12comp.firebaseapp.com",
  databaseURL: "https://nina-ongley-12comp-default-rtdb.firebaseio.com",
  projectId: "nina-ongley-12comp",
  storageBucket: "nina-ongley-12comp.firebasestorage.app",
  messagingSenderId: "514651150515",
  appId: "1:514651150515:web:c5bd54dd486ea33b8078c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This log prints the firebase object to the console to show that it is working.
// As soon as you have the script working, delete this log.
console.log("Firebase initialize finished:");
console.log(firebase);

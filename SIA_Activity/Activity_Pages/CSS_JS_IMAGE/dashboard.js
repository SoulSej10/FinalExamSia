// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyAKM98angSbdTOH7q6d2b7tcAB2fZF33G0",
  authDomain: "pipeline-885b6.firebaseapp.com",
  projectId: "pipeline-885b6",
  storageBucket: "pipeline-885b6.firebasestorage.app",
  messagingSenderId: "757099453629",
  appId: "1:757099453629:web:abc9bcbd8713328871ebd4",
  measurementId: "G-T24P5G3LCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// ** User Session Handling **
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (user && loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserFName").innerText = userData.firstName +"!";
        } else {
          console.log("No document found matching the ID");
        }
      })
      .catch((error) => {
        console.error("Error getting document: ", error);
      });
  } else {
    console.log("User ID not found in local storage. Redirecting...");
    window.location.href = "index.html";
  }
});

// ** Logout Functionality **
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
});

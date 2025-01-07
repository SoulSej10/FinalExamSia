// Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";



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
const db = getFirestore(app);

// Fetch and display users
async function fetchUsers() {
  try {
    const usersCollection = collection(db, "users");
    const userDocs = await getDocs(usersCollection);
    const tableBody = document.querySelector(".table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    userDocs.forEach((doc) => {
      const userData = doc.data();
      const row = `<tr>
                    <td>${doc.id}</td>
                    <td>${userData.firstName} ${userData.lastName}</td>
                    <td>${userData.email}</td>
                    <td>${userData.role || "User"}</td>
                   </tr>`;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
}

// Fetch users on page load
document.addEventListener("DOMContentLoaded", fetchUsers);

// ** Admin Logout Functionality **
document.getElementById("adminLogoutButton")?.addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html"; // Redirect to login page
});

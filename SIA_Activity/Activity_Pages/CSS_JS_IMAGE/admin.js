// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase configuration
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

async function fetchUsers() {
  try {
    // Access the 'users' collection from Firestore
    const usersCollection = collection(db, "users");
    const userDocs = await getDocs(usersCollection);
    
    console.log(userDocs); // Debugging log to check the returned data

    // Select the table body to insert data
    const tableBody = document.querySelector(".table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Iterate through the documents and add rows to the table
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

// Admin logout functionality
document.getElementById("adminLogoutButton")?.addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html"; // Redirect to login page
});

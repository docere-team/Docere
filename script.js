// app.js
const firebaseConfig = {
    apiKey: "AIzaSyDP-oScHd8G5bMJqjZ15atgQjrwwjdffrg",
    authDomain: "docere-16a25.firebaseapp.com",
    projectId: "docere-16a25",
    storageBucket: "docere-16a25.appspot.com",
    messagingSenderId: "25249080743",
    appId: "1:25249080743:web:238adc1be73839fa740282"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Simple authentication function
function startStudySession() {
    if (!auth.currentUser) {
        alert("Please log in first.");
    } else {
        alert("Starting your study session! Let's go, Doctor!");
    }
}

// Check if user is logged in (this will be enhanced later)
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById('attendance').innerText = "Attendance: 90% (Good Job!)";
    } else {
        document.getElementById('attendance').innerText = "Please log in.";
    }
});

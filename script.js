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
const quotes = [
  "Even your mitochondria believe in you.",
  "Cram like your grades depend on it. Oh wait, they do.",
  "Future Dr. Loading… Stay hydrated!",
  "Anatomy books fear your memory.",
  "Coffee: because adulting is hard."
];

document.addEventListener('DOMContentLoaded', () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("motivation").innerText = quote;
});
let pomoInterval;
let timeLeft = 0;
let isRunning = false;

function startTimer() {
    if (isRunning) return;

    const focusMinutes = parseInt(document.getElementById("focusInput").value) || 25;
    timeLeft = focusMinutes * 60;
    isRunning = true;

    pomoInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(pomoInterval);
            isRunning = false;

            const breakMinutes = parseInt(document.getElementById("breakInput").value) || 5;
            timeLeft = breakMinutes * 60;
            alert("Break time! Reset or go again?");
            updateTimerDisplay();
            return;
        }
        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(pomoInterval);
    isRunning = false;
    const focusMinutes = parseInt(document.getElementById("focusInput").value) || 25;
    timeLeft = focusMinutes * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

document.addEventListener('DOMContentLoaded', () => {
    resetTimer();
});

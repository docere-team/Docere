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

// Quote Magic
const quotes = [
    "Even your mitochondria believe in you.",
    "Cram like your grades depend on it. Oh wait, they do.",
    "Future Dr. Loading… Stay hydrated!",
    "Anatomy books fear your memory.",
    "Coffee: because adulting is hard.",
    "Today’s pain, tomorrow’s prescription pad.",
    "Rest when you must, but don't you dare quit.",
    "This Pomodoro is 100% med-student approved."
];

document.addEventListener('DOMContentLoaded', () => {
    // Motivational Quote
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteElement = document.getElementById("motivation");
    if (quoteElement) quoteElement.innerText = `"${quote}"`;

    // Initialize Pomodoro
    resetTimer();

    // Attendance check
    firebase.auth().onAuthStateChanged(user => {
        const attendanceElement = document.getElementById('attendance');
        if (attendanceElement) {
            attendanceElement.innerText = user
                ? "Attendance: 90% (Good Job!)"
                : "Please log in.";
        }
    });
});

// Study Session Starter
function startStudySession() {
    if (!auth.currentUser) {
        alert("Login first, hero!");
    } else {
        alert("Starting your study session! Channel your inner neuroanatomy beast.");
    }
}

// Pomodoro Timer Logic
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

            alert("Break time! Stretch, breathe, and avoid Instagram… maybe.");
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
    const timerDisplay = document.getElementById("timer");
    if (timerDisplay) timerDisplay.textContent = `${minutes}:${seconds}`;
}

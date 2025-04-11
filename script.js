// ===== Personalized Welcome Message =====
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userName") || "Doctor in the making";
  document.getElementById("welcomeBox").innerHTML = `Welcome back, <strong>${name}</strong>! Stay focused and heal the world.`;
});

// ===== Motivational Quote Popup =====
const quotes = [
  "Keep pushing, you're almost there!",
  "Small steps every day lead to big results.",
  "You were born to heal. Don't forget that.",
  "Stay hydrated. Stay focused. Stay kind.",
  "Even superheroes need rest. Take a break wisely!"
];

function showQuotePopup() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const popup = document.getElementById("quotePopup");
  popup.innerText = quote;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

setInterval(showQuotePopup, 60000); // Show every 60 seconds

// ===== Pomodoro Timer =====
let timer;
let timeLeft = 1500; // 25 minutes

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      alert("Pomodoro session complete!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = 1500;
  updateDisplay();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

updateDisplay(); // initial display

// ===== Do Not Disturb / Study Mode =====
let studyMode = false;
const toggleBtn = document.getElementById("studyModeToggle");

toggleBtn.addEventListener("click", () => {
  studyMode = !studyMode;
  document.body.style.filter = studyMode ? "grayscale(0.1)" : "none";
  toggleBtn.innerText = studyMode ? "Exit Study Mode" : "Enter Study Mode";
});

// ===== Attendance Tracker =====
function checkAttendance() {
  const theory = parseInt(document.getElementById("theoryInput").value);
  const practical = parseInt(document.getElementById("practicalInput").value);
  const alertBox = document.getElementById("attendanceAlert");

  if (theory < 75 || practical < 80) {
    alertBox.style.display = "block";
    alertBox.innerText = `Warning: Your attendance is below safe limit! (Theory: ${theory}%, Practical: ${practical}%)`;
  } else {
    alertBox.style.display = "none";
  }
}

document.getElementById("checkAttendanceBtn").addEventListener("click", checkAttendance);

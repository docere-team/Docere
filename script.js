// ===== Attendance Tracker =====
function updateAttendance(theory, practical) {
  const alertBox = document.getElementById("attendanceAlert");
  const theoryPercent = (theory.present / theory.total) * 100;
  const practicalPercent = (practical.present / practical.total) * 100;

  let alertMessage = "";

  if (theoryPercent < 75) {
    alertMessage += `Theory attendance is below 75% (${Math.round(theoryPercent)}%)! `;
  }

  if (practicalPercent < 80) {
    alertMessage += `Practical attendance is below 80% (${Math.round(practicalPercent)}%)!`;
  }

  if (alertMessage) {
    alertBox.style.display = "block";
    alertBox.innerText = alertMessage;
  } else {
    alertBox.style.display = "none";
  }

  document.getElementById("theoryProgress").style.width = theoryPercent + "%";
  document.getElementById("practicalProgress").style.width = practicalPercent + "%";
}

// Example Usage
updateAttendance(
  { present: 18, total: 24 },
  { present: 20, total: 25 }
);

// ===== Pomodoro Timer =====
let pomodoroTime = 25 * 60;
let timer;
let running = false;

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function updateTimerDisplay() {
  document.getElementById("timer").innerText = formatTime(pomodoroTime);
}

function startPomodoro() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      pomodoroTime--;
      if (pomodoroTime <= 0) {
        clearInterval(timer);
        alert("Pomodoro session completed!");
        running = false;
        pomodoroTime = 25 * 60;
      }
      updateTimerDisplay();
    }, 1000);
  }
}

function pausePomodoro() {
  clearInterval(timer);
  running = false;
}

function resetPomodoro() {
  clearInterval(timer);
  running = false;
  pomodoroTime = 25 * 60;
  updateTimerDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  updateTimerDisplay();

  document.getElementById("startTimer").addEventListener("click", startPomodoro);
  document.getElementById("pauseTimer").addEventListener("click", pausePomodoro);
  document.getElementById("resetTimer").addEventListener("click", resetPomodoro);
});

// ===== Study Mode / Do Not Disturb =====
let studyMode = false;
document.getElementById("studyModeToggle").addEventListener("click", () => {
  studyMode = !studyMode;
  document.body.style.filter = studyMode ? "grayscale(1)" : "none";
});

// ===== Motivational Quote Popup =====
window.onload = () => {
  const quotes = [
    "Keep going, future doctor!",
    "Every page brings you closer to your dream.",
    "Grind now, shine later!",
    "One step at a time, one beat at a time."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const popup = document.getElementById("quotePopup");
  popup.innerText = randomQuote;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 6000);
};

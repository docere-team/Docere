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
const wardAttendance = JSON.parse(localStorage.getItem("wardAttendance") || "{}");
let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const calendar = document.getElementById("calendarGrid");
  const monthYear = document.getElementById("currentMonthYear");
  calendar.innerHTML = "";
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  let grid = "<table><tr>";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(d => grid += `<th>${d}</th>`);
  grid += "</tr><tr>";

  let dayCounter = 1;
  for (let i = 0; i < 42; i++) {
    if (i < startDay || dayCounter > daysInMonth) {
      grid += "<td></td>";
    } else {
      const dateKey = `${year}-${month + 1}-${dayCounter}`;
      const weekday = new Date(year, month, dayCounter).getDay();
      const isSunday = weekday === 0;
      const savedStatus = wardAttendance[dateKey] || "";

      grid += `<td style="text-align:center;">
        <div>${dayCounter}</div>
        ${isSunday ? "<small>Holiday</small>" : `
        <select onchange="saveWardStatus('${dateKey}', this.value)">
          <option value="">--</option>
          <option value="present" ${savedStatus === "present" ? "selected" : ""}>P</option>
          <option value="absent" ${savedStatus === "absent" ? "selected" : ""}>A</option>
        </select>`}
      </td>`;
      dayCounter++;
    }
    if (i % 7 === 6) grid += "</tr><tr>";
  }
  grid += "</tr></table>";
  calendar.innerHTML = grid;
  updateWardSummary();
}

function saveWardStatus(dateKey, status) {
  wardAttendance[dateKey] = status;
  localStorage.setItem("wardAttendance", JSON.stringify(wardAttendance));
  updateWardSummary();
}

function updateWardSummary() {
  const values = Object.values(wardAttendance).filter(v => v);
  const total = values.length;
  const present = values.filter(v => v === "present").length;
  const absent = values.filter(v => v === "absent").length;
  const percent = total ? ((present / total) * 100).toFixed(1) : 0;
  document.getElementById("wardSummary").innerHTML = `
    <p>Total Days: ${total} | Present: ${present} | Absent: ${absent}</p>
    <p><strong>Attendance: ${percent}%</strong></p>
  `;
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

document.addEventListener("DOMContentLoaded", renderCalendar);

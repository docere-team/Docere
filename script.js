// Pomodoro Timer
let timerInterval;
function startPomodoro() {
  clearInterval(timerInterval);
  const duration = parseInt(document.getElementById("work-duration").value);
  let time = duration * 60;
  const timerDisplay = document.getElementById("pomodoro-timer");

  timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (time <= 0) {
      clearInterval(timerInterval);
      alert("Pomodoro Complete! Time for a break.");
    }
    time--;
  }, 1000);
}

// Save Daily Attendance
function saveAttendance() {
  const classSession = document.getElementById("classSession").value;
  const practicalSession = document.getElementById("practicalSession").value;
  const date = new Date().toLocaleDateString();

  let data = localStorage.getItem("dailyAttendance") || "{}";
  data = JSON.parse(data);
  data[date] = { classSession, practicalSession };
  localStorage.setItem("dailyAttendance", JSON.stringify(data));
  updateAttendanceSummary();
}

// Show saved attendance
function updateAttendanceSummary() {
  const summary = document.getElementById("attendanceSummary");
  const data = JSON.parse(localStorage.getItem("dailyAttendance") || "{}");
  summary.innerHTML = `<h4>Saved Records:</h4><ul>` +
    Object.entries(data).map(([date, record]) =>
      `<li><strong>${date}</strong>: Class - ${record.classSession}, Practical - ${record.practicalSession}</li>`).join("") +
    `</ul>`;
}
updateAttendanceSummary();

// Study Mode Toggle
let darkMode = false;
function toggleStudyMode() {
  document.body.style.background = darkMode ? "#fff" : "#c2e9fb";
  document.body.style.color = darkMode ? "#000" : "#003344";
  darkMode = !darkMode;
}

// Ward Calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const grid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("currentMonthYear");

function renderCalendar() {
  grid.innerHTML = "";
  const date = new Date(currentYear, currentMonth, 1);
  monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const savedStatus = JSON.parse(localStorage.getItem("wardCalendar") || "{}");

  for (let day = 1; day <= totalDays; day++) {
    const fullDate = `${currentYear}-${currentMonth + 1}-${day}`;
    const thisDate = new Date(currentYear, currentMonth, day);
    const weekday = thisDate.getDay(); // 0=Sunday

    const div = document.createElement("div");
    div.className = "calendar-day";

    if (weekday === 0) {
      div.innerText = `${day} (Sun)`;
      div.style.background = "#fdd";
    } else {
      div.innerText = day;
      const select = document.createElement("select");
      select.innerHTML = `<option value="">-</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="holiday">Holiday</option>`;
      select.value = savedStatus[fullDate] || "";
      select.onchange = () => {
        savedStatus[fullDate] = select.value;
        localStorage.setItem("wardCalendar", JSON.stringify(savedStatus));
        showWardSummary();
      };
      div.appendChild(select);
    }
    grid.appendChild(div);
  }

  showWardSummary();
}

function prevMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else currentMonth--;
  renderCalendar();
}
function nextMonth() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else currentMonth++;
  renderCalendar();
}

function showWardSummary() {
  const summary = document.getElementById("wardSummary");
  const data = JSON.parse(localStorage.getItem("wardCalendar") || "{}");
  const present = Object.values(data).filter(v => v === "present").length;
  const absent = Object.values(data).filter(v => v === "absent").length;
  const holiday = Object.values(data).filter(v => v === "holiday").length;
  summary.innerHTML = `<p><strong>Ward Summary:</strong> Present: ${present}, Absent: ${absent}, Holidays: ${holiday}</p>`;
}
renderCalendar();

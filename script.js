const humorousQuotes = [
  "Study mode activated. Brain cells, assemble!",
  "Don't worry, coffee understands you.",
  "Ward round calories: 0. Stress: max.",
  "Docere: Turning tears into degrees since day one.",
  "This is your sign to stop scrolling and start studying.",
  "Dear brain, kindly co-operate.",
  "Study hard. Sleep harder.",
  "You're not procrastinating, you're just buffering.",
  "Patient: *breathes* Interns: Panic mode activated.",
  "Study like your phone battery is at 1% and charger is far.",
  "You: 'I'll just revise this topic.' Universe: 'Lol, okay.'",
  "Medicine is 90% memorization, 10% panic.",
  "Is this syllabus or a punishment?",
  "Remember, caffeine and crying are free.",
  "Just a med student... standing in front of a textbook... begging it to make sense.",
  "Me: Opens book. Brain: Shuts down.",
  "Life hack: If you can’t convince them, confuse them.",
  "I don’t rise and shine, I caffeinate and hope.",
  "You’re doing amazing. Even if you feel like a lost neuron."
  // add more later!
];

function enterStudyMode() {
  const quoteText = document.getElementById("quoteText");
  const randomQuote = humorousQuotes[Math.floor(Math.random() * humorousQuotes.length)];

  quoteText.innerText = randomQuote;

  const popup = document.getElementById("studyPopup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}
function addWardDuty() {
  const dept = document.getElementById("ward-dept").value;
  const from = new Date(document.getElementById("start-date").value);
  const to = new Date(document.getElementById("end-date").value);

  if (!dept || isNaN(from) || isNaN(to)) {
    alert("Please fill all fields!");
    return;
  }

  const calendar = document.getElementById("ward-calendar");
  const dutyBlock = document.createElement("div");
  dutyBlock.className = "duty-entry";
  dutyBlock.innerHTML = `
    <strong>${dept}</strong><br>
    From <span>${from.toDateString()}</span> to <span>${to.toDateString()}</span>
    <hr>
  `;
  calendar.appendChild(dutyBlock);

  // Attendance list
  const attendanceList = document.getElementById("attendance-list");

  let currentDate = new Date(from);
  let totalDays = 0;
  while (currentDate <= to) {
    const dayDiv = document.createElement("div");
    dayDiv.innerHTML = `
      <label>
        <input type="checkbox" class="ward-check" onchange="calculateWardAttendance()"> 
        ${currentDate.toDateString()}
      </label>
    `;
    attendanceList.appendChild(dayDiv);
    totalDays++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  calculateWardAttendance();
}

function calculateWardAttendance() {
  const checks = document.querySelectorAll(".ward-check");
  const total = checks.length;
  const present = Array.from(checks).filter(c => c.checked).length;
  const percent = total > 0 ? (present / total) * 100 : 0;

  if (percent < 80) {
    showFunnyAlert(percent);
  }
}
function showFunnyAlert(percent) {
  const quotes = [
    "Oops! Your attendance is as missing as your motivation on Mondays!",
    "Ward? More like 'Wandered away', huh?",
    "Your attendance is lower than my will to get up for 8 AM classes!",
    "You’ve officially ghosted more than a toxic ex!",
    "Below 80%! Time to fake a ward posting selfie?"
    "Ward duty skipped? Even your stethoscope is judging you!",
    "80% is the new 100%. You're innovating education!",
    "Sir/Ma'am, your patient called. They said 'Where were you?'",
    "Wards below 80% – a silent prayer for your intern year.",
    "Skipping wards? Cool. Repeating year? Cooler."
  ];

  const random = quotes[Math.floor(Math.random() * quotes.length)];
  alert(`${random}\n(Current: ${percent.toFixed(1)}%)`);
}
function saveAttendanceState() {
  const checks = document.querySelectorAll(".ward-check");
  const data = Array.from(checks).map(check => ({
    date: check.dataset.date,
    checked: check.checked
  }));
  localStorage.setItem("wardAttendance", JSON.stringify(data));
}

function loadAttendanceState() {
  const saved = JSON.parse(localStorage.getItem("wardAttendance") || "[]");
  saved.forEach(item => {
    const checkbox = document.querySelector(`.ward-check[data-date="${item.date}"]`);
    if (checkbox) checkbox.checked = item.checked;
  });
  calculateWardAttendance();
}
function calculateWardAttendance() {
  const checks = document.querySelectorAll(".ward-check");
  const total = checks.length;
  const present = Array.from(checks).filter(c => c.checked).length;
  const percent = total > 0 ? (present / total) * 100 : 0;

  // Progress bar update
  const bar = document.getElementById("progress-bar-inner");
  bar.style.width = `${percent}%`;
  bar.style.backgroundColor = percent >= 80 ? "#4caf50" : "#f44336";

  if (percent < 80) showFunnyAlert(percent);

  saveAttendanceState();
}
function markDate() {
  const dateStr = new Date(document.getElementById("mark-date").value).toDateString();
  const check = document.querySelector(`.ward-check[data-date="${dateStr}"]`);
  if (check) {
    check.checked = true;
    calculateWardAttendance();
  } else {
    alert("Date not in ward range!");
  }
}
window.onload = () => {
  loadAttendanceState();
};
let assignedDates = [];

function assignWard(dept, startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    assignedDates = [];

    const calendarDiv = document.getElementById("ward-calendar");
    calendarDiv.innerHTML = ""; // clear previous

    while (start <= end) {
        let dateStr = start.toDateString();
        assignedDates.push(dateStr);

        const label = document.createElement("label");
        label.innerHTML = `
            <input type="checkbox" class="ward-check" data-date="${dateStr}">
            ${dateStr} (${dept})
        `;
        calendarDiv.appendChild(label);
        calendarDiv.appendChild(document.createElement("br"));

        start.setDate(start.getDate() + 1);
    }
}

// This is what you call after filling department and date range
// Example: assignWard('Medicine', '2025-04-10', '2025-04-15');

function markDate() {
    const inputDate = new Date(document.getElementById("mark-date").value);
    const dateStr = inputDate.toDateString();

    const checkboxes = document.querySelectorAll('.ward-check');
    let found = false;
    checkboxes.forEach((box) => {
        if (box.getAttribute('data-date') === dateStr) {
            box.checked = true;
            found = true;
        }
    });

    if (!found) {
        alert("Date not in assigned ward range!");
    }
}

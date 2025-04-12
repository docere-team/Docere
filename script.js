const motivationalQuotes = [
  "Push yourself, because no one else is going to do it for you.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Discipline is choosing between what you want now and what you want most.",
  "Study like your future patients are depending on you — because they are."
];

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

  // Progress bar update
  const bar = document.getElementById("progress-bar-inner");
  bar.style.width = `${percent}%`;
  bar.style.backgroundColor = percent >= 80 ? "#4caf50" : "#f44336";

  if (percent < 80) {
    showFunnyAlert(percent);
  }

  saveAttendanceState();
}

function showFunnyAlert(percent) {
  const quotes = [
    "Oops! Your attendance is as missing as your motivation on Mondays!",
    "Ward? More like 'Wandered away', huh?",
    "Your attendance is lower than my will to get up for 8 AM classes!",
    "You’ve officially ghosted more than a toxic ex!",
    "Below 80%! Time to fake a ward posting selfie?",
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
  calendarDiv.innerHTML = ""; // Clear previous assignments

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

// Utility functions for local storage
function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Global data
let wardAssignments = loadFromLocal('wardAssignments') || [];
let attendanceMarked = loadFromLocal('wardAttendance') || [];

// Add new ward duty
function addWardDuty() {
  const dept = document.getElementById('ward-dept').value;
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;

  if (!dept || !start || !end) {
    alert("Please fill all fields.");
    return;
  }

  const newDuty = { dept, start, end };
  wardAssignments.push(newDuty);
  saveToLocal('wardAssignments', wardAssignments);
  renderWardCalendar();
}

// Render assigned ward calendar
function renderWardCalendar() {
  const container = document.getElementById('ward-calendar');
  container.innerHTML = '';
  wardAssignments.forEach((duty, index) => {
    container.innerHTML += `
      <div class="duty-card">
        ${index + 1}. ${duty.dept} | ${duty.start} to ${duty.end}
      </div>
    `;
  });
}

// Mark attendance
function markDate() {
  const date = document.getElementById('mark-date').value;
  if (!date) {
    alert("Please select a date.");
    return;
  }

  if (!attendanceMarked.includes(date)) {
    attendanceMarked.push(date);
    saveToLocal('wardAttendance', attendanceMarked);
    renderAttendance();
  }
}

// Render attendance
function renderAttendance() {
  const list = document.getElementById('attendance-list');
  list.innerHTML = '';
  attendanceMarked.forEach((date, i) => {
    list.innerHTML += `<p>${i + 1}. ${date}</p>`;
  });

  const total = wardAssignments.reduce((sum, duty) => {
    const start = new Date(duty.start);
    const end = new Date(duty.end);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return sum + days;
  }, 0);

  const percentage = total ? Math.round((attendanceMarked.length / total) * 100) : 0;
  const bar = document.getElementById('progress-bar-inner');
  bar.style.width = percentage + '%';
  bar.innerText = percentage + '%';
}

function addWardDuty() {
  const dept = document.getElementById("ward-dept").value;
  const from = new Date(document.getElementById("ward-from").value);
  const to = new Date(document.getElementById("ward-to").value);
  const wardRecords = document.getElementById("ward-records");

  if (!dept || isNaN(from) || isNaN(to) || from > to) {
    alert("Please enter valid department and date range.");
    return;
  }

  const dutyId = `duty-${Date.now()}`; // unique ID for this duty block
  const dutyBlock = document.createElement("div");
  dutyBlock.style.border = "1px solid #ccc";
  dutyBlock.style.padding = "10px";
  dutyBlock.style.marginBottom = "10px";
  dutyBlock.style.borderRadius = "8px";
  dutyBlock.style.background = "#f9f9ff";

  dutyBlock.innerHTML = `
    <strong>${dept}</strong><br>
    From <span>${from.toDateString()}</span> to <span>${to.toDateString()}</span>
    <button onclick="deleteWardDuty('${dutyId}')"
      style="margin-left:10px;padding:2px 6px;background-color:red;color:white;border:none;border-radius:4px;">Delete</button>
    <div class="attendance-group" id="${dutyId}-attendance">
      <hr>
    </div>
  `;

  const attendanceGroup = dutyBlock.querySelector(`#${dutyId}-attendance`);

  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    const dayDiv = document.createElement("div");
    const
// Function to enter study mode and show a motivational quote in the popup
function enterStudyMode() {
  const quotes = [
    "Keep going, you're doing great!",
    "One step at a time.",
    "Believe in yourself!",
    "The future belongs to those who study hard."
  ];
  
  // Randomly choose a quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteText').textContent = randomQuote;

  // Show the popup
  document.getElementById('studyPopup').style.display = 'block';

  // Hide the popup after 5 seconds
  setTimeout(() => {
    document.getElementById('studyPopup').style.display = 'none';
  }, 5000);
}

// Function to add ward duty to the calendar
function addWardDuty() {
  const dept = document.getElementById('ward-dept').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  
  // Check if dates are valid
  if (startDate && endDate) {
    const dutyDiv = document.createElement('div');
    dutyDiv.classList.add('duty-entry');
    dutyDiv.textContent = `${dept} duty from ${startDate} to ${endDate}`;
    
    // Append the duty to the calendar
    document.getElementById('ward-calendar').appendChild(dutyDiv);
  } else {
    alert('Please select valid dates.');
  }
}

// Function to mark attendance
function markDate() {
  const markDate = document.getElementById('mark-date').value;
  
  // Ensure a date is selected
  if (markDate) {
    // Create an attendance entry
    const attendanceEntry = document.createElement('div');
    attendanceEntry.classList.add('attendance-entry');
    attendanceEntry.textContent = `Present on: ${markDate}`;
    
    // Append the attendance entry to the list
    document.getElementById('attendance-list').appendChild(attendanceEntry);
    
    // Update progress bar
    updateProgressBar();
  } else {
    alert('Please select a date to mark attendance.');
  }
}

// Function to update the progress bar
function updateProgressBar() {
  const totalDays = 30; // example total days of the month (adjust as necessary)
  const presentDays = document.querySelectorAll('.attendance-entry').length;
  
  const progress = (presentDays / totalDays) * 100;
  const progressBarInner = document.getElementById('progress-bar-inner');
  
  progressBarInner.style.width = progress + '%';
}
    

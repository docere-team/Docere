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
function startPomodoro() {
  let pomodoroTime = 25 * 60; // 25 minutes
  let breakTime = 5 * 60; // 5 minutes
  let timerType = "study"; // Either "study" or "break"

  const timerDisplay = document.getElementById("pomodoro-timer");
  const pomodoroBtn = document.getElementById("pomodoro-btn");
  const startBtn = document.getElementById("start-pomodoro");

  function updateTimer() {
    let minutes = Math.floor(pomodoroTime / 60);
    let seconds = pomodoroTime % 60;
    timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function switchMode() {
    if (timerType === "study") {
      pomodoroTime = breakTime;
      timerType = "break";
      pomodoroBtn.innerHTML = "Start Study Session";
      alert("Take a break!");
    } else {
      pomodoroTime = 25 * 60;
      timerType = "study";
      pomodoroBtn.innerHTML = "Start Break";
      alert("Start studying!");
    }
  }

  startBtn.addEventListener("click", () => {
    const interval = setInterval(() => {
      pomodoroTime--;
      updateTimer();
      if (pomodoroTime <= 0) {
        switchMode();
        clearInterval(interval);
        startPomodoro(); // Restart for the next session
      }
    }, 1000);
  });
}

function initStudyTracker() {
  const studyTracker = {
    subjects: [
      { name: "Anatomy", progress: 0 },
      { name: "Physiology", progress: 0 },
      { name: "Biochemistry", progress: 0 },
      { name: "Pathology", progress: 0 },
      { name: "Pharmacology", progress: 0 },
      { name: "Microbiology", progress: 0 },
      { name: "Forensic Medicine", progress: 0 }
    ],

    updateProgress(subject, progress) {
      const subjectObj = this.subjects.find(s => s.name === subject);
      if (subjectObj) {
        subjectObj.progress = progress;
      }
      this.displayProgress();
    },

    displayProgress() {
      const progressBarContainer = document.getElementById("study-progress");
      progressBarContainer.innerHTML = "";

      this.subjects.forEach(subject => {
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("progress-bar");
        subjectDiv.innerHTML = `
          <div class="subject-name">${subject.name}</div>
          <div class="progress" style="width: ${subject.progress}%"></div>
          <span class="progress-text">${subject.progress}%</span>
        `;
        progressBarContainer.appendChild(subjectDiv);
      });
    }
  };

  studyTracker.displayProgress();

  document.getElementById("update-progress-btn").addEventListener("click", () => {
    const subject = document.getElementById("subject-name").value;
    const progress = parseInt(document.getElementById("progress-input").value, 10);
    if (subject && !isNaN(progress)) {
      studyTracker.updateProgress(subject, progress);
    } else {
      alert("Please fill both fields!");
    }
  });
}

function setupStudyReminder() {
  const reminderTime = document.getElementById("study-reminder-time");

  reminderTime.addEventListener("change", () => {
    const time = new Date(reminderTime.value);
    const now = new Date();
    const diff = time - now;

    if (diff <= 0) {
      alert("Please choose a future time!");
      return;
    }

    setTimeout(() => {
      alert("Reminder: Time to study!");
    }, diff);
  });
}

function setupHydrationReminder() {
  const hydrationTime = document.getElementById("hydration-reminder-time");

  hydrationTime.addEventListener("change", () => {
    const time = new Date(hydrationTime.value);
    const now = new Date();
    const diff = time - now;

    if (diff <= 0) {
      alert("Please choose a future time!");
      return;
    }

    setTimeout(() => {
      alert("Reminder: Stay hydrated!");
    }, diff);
  });
}

function toggleFocusMode() {
  const focusModeBtn = document.getElementById("focus-mode-btn");
  const focusOverlay = document.getElementById("focus-overlay");

  focusModeBtn.addEventListener("click", () => {
    const isActive = focusOverlay.style.display === "block";
    focusOverlay.style.display = isActive ? "none" : "block";
    focusModeBtn.innerHTML = isActive ? "Activate Focus Mode" : "Deactivate Focus Mode";
  });
}

function init() {
  enterStudyMode();
  startPomodoro();
  initStudyTracker();
  setupStudyReminder();
  setupHydrationReminder();
  toggleFocusMode();
}

window.onload = init;
function createFlashcard() {
  const flashcardFront = document.getElementById("flashcard-front").value;
  const flashcardBack = document.getElementById("flashcard-back").value;

  if (flashcardFront && flashcardBack) {
    const flashcard = {
      front: flashcardFront,
      back: flashcardBack,
      createdAt: new Date().toISOString()
    };

    // Store flashcard in local storage or Firestore
    localStorage.setItem(`flashcard-${flashcard.createdAt}`, JSON.stringify(flashcard));
    alert("Flashcard Created!");
    clearFlashcardInputs();
  } else {
    alert("Please fill in both fields!");
  }
}

function clearFlashcardInputs() {
  document.getElementById("flashcard-front").value = "";
  document.getElementById("flashcard-back").value = "";
}

function studyFlashcards() {
  const flashcardsContainer = document.getElementById("flashcards-container");
  flashcardsContainer.innerHTML = "";

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("flashcard-")) {
      const flashcard = JSON.parse(localStorage.getItem(key));
      const flashcardDiv = document.createElement("div");
      flashcardDiv.classList.add("flashcard");
      flashcardDiv.innerHTML = `
        <div class="flashcard-front">${flashcard.front}</div>
        <div class="flashcard-back">${flashcard.back}</div>
      `;
      flashcardsContainer.appendChild(flashcardDiv);
    }
  });
}

function toggleFlashcardVisibility(flashcardDiv) {
  const front = flashcardDiv.querySelector(".flashcard-front");
  const back = flashcardDiv.querySelector(".flashcard-back");

  front.style.display = front.style.display === "none" ? "block" : "none";
  back.style.display = back.style.display === "none" ? "block" : "none";
}

function trackMood() {
  const moodSelect = document.getElementById("mood-select");
  const moodLogContainer = document.getElementById("mood-log");

  moodSelect.addEventListener("change", () => {
    const selectedMood = moodSelect.value;
    const moodLogItem = document.createElement("div");
    moodLogItem.classList.add("mood-log-item");
    moodLogItem.innerHTML = `<span>${new Date().toLocaleString()} - ${selectedMood}</span>`;
    moodLogContainer.appendChild(moodLogItem);
  });
}

function trackFocus() {
  const focusSelect = document.getElementById("focus-select");
  const focusLogContainer = document.getElementById("focus-log");

  focusSelect.addEventListener("change", () => {
    const selectedFocusLevel = focusSelect.value;
    const focusLogItem = document.createElement("div");
    focusLogItem.classList.add("focus-log-item");
    focusLogItem.innerHTML = `<span>${new Date().toLocaleString()} - Focus: ${selectedFocusLevel}</span>`;
    focusLogContainer.appendChild(focusLogItem);
  });
}

function setupDailyMotivation() {
  const motivationContainer = document.getElementById("motivation-container");

  // List of motivational quotes
  const quotes = [
    "The journey of a thousand miles begins with one step.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Believe you can and you're halfway there.",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you."
  ];

  // Display a random quote each day
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  motivationContainer.innerHTML = `<p>${randomQuote}</p>`;
}

function setupPomodoroTimer() {
  const pomodoroStartBtn = document.getElementById("pomodoro-start-btn");
  const pomodoroTimer = document.getElementById("pomodoro-timer");

  let timeRemaining = 25 * 60; // Start with 25 minutes

  function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    pomodoroTimer.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  pomodoroStartBtn.addEventListener("click", () => {
    const interval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();

      if (timeRemaining <= 0) {
        clearInterval(interval);
        alert("Pomodoro session finished! Take a break.");
      }
    }, 1000);
  });
}

function setupBookTracker() {
  const bookInput = document.getElementById("book-input");
  const bookContainer = document.getElementById("book-container");

  document.getElementById("add-book-btn").addEventListener("click", () => {
    const bookTitle = bookInput.value;

    if (bookTitle) {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-item");
      bookDiv.innerHTML = `
        <span>${bookTitle}</span>
        <button class="remove-book-btn">Remove</button>
      `;

      const removeBookBtn = bookDiv.querySelector(".remove-book-btn");
      removeBookBtn.addEventListener("click", () => {
        bookDiv.remove();
      });

      bookContainer.appendChild(bookDiv);
      bookInput.value = "";
    } else {
      alert("Please enter a book title.");
    }
  });
}

function setupRoutineTracker() {
  const routineInput = document.getElementById("routine-input");
  const routineContainer = document.getElementById("routine-container");

  document.getElementById("add-routine-btn").addEventListener("click", () => {
    const routineTask = routineInput.value;

    if (routineTask) {
      const routineDiv = document.createElement("div");
      routineDiv.classList.add("routine-item");
      routineDiv.innerHTML = `
        <span>${routineTask}</span>
        <input type="checkbox" class="routine-checkbox">
      `;

      routineContainer.appendChild(routineDiv);
      routineInput.value = "";
    } else {
      alert("Please enter a routine task.");
    }
  });
}

function init() {
  createFlashcard();
  studyFlashcards();
  trackMood();
  trackFocus();
  setupDailyMotivation();
  setupPomodoroTimer();
  setupBookTracker();
  setupRoutineTracker();
}

window.onload = init;

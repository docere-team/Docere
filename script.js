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
// Show popup quote on load
window.onload = function () {
  const quote = getMotivationalQuote();
  document.getElementById("quoteText").innerText = quote;
  document.getElementById("quotePopup").classList.remove("hidden");
};

   function getMotivationalQuote() {
  const quotes = [
    "Why study now when you can panic later?",
    "Your books miss you. Go say hi.",
    "Even Google doesn’t have all the answers—study anyway!",
    "You got this. Or you’ll get this after 2 more revisions.",
    "Sleep is for the weak—said no med student ever.",
    "Aftab, your notes are waiting. Be their hero.",
    "Today’s mood: pretending to study.",
    "Ward rounds don’t kill you. They make you wish they did.",
    "Eat. Sleep. Study. Cry. Repeat.",
    "You’re not lazy. You’re energy-efficient.",
    "You're not behind; you're fashionably late to the syllabus.",
    "Study hard or be a case study—your choice.",
    "They said 'be patient'—so you became one.",
    "Laugh now, panic during exams.",
    "Reminder: Even a snail gets to the finish line.",
    "Be like ECG—irregular but still going.",
    "Drink water. Then go pee 5 times. Then study.",
    "Stethoscope: fancy necklace of stress.",
    "Aftab, stop looking at this popup and open your textbook.",
    "You’re not procrastinating. You’re energy buffering.",
    "Life is short. So are neurons. Keep firing.",
    "No pain, no gain. No study, still pain.",
    "Every hour counts. Especially the ones you spent scrolling.",
    "You're almost there… just 200 pages left.",
    "It's not procrastination. It's strategic delay.",
    "If med school was easy, it’d be called art school.",
    "Aftab, coffee can’t replace actual study. Sadly.",
    "Study like the examiner is your ex.",
    "You're doing fine. The books? Not so much.",
    "One does not simply 'just revise' neuroanatomy.",
    "Every time you blink, a topic is forgotten.",
    "You think you're tired? The brain gave up yesterday.",
    "Study now or cry in HD later.",
    "You’re one nap away from greatness.",
    "Anki? More like anxiety cards.",
    "Aftab, stop diagnosing yourself and read.",
    "If sarcasm was a subject, you'd top it.",
    "Half knowledge is dangerous. The other half is in the next chapter.",
    "Why be normal when you can be a med student?",
    "Study tip: bribing your brain with snacks works.",
    "Behind every successful med student is a pile of unfinished notes.",
    "Attend today, regret tomorrow.",
    "Your syllabus is calling. You’ve got 37 missed calls.",
    "“Just one more video” – famous last words.",
    "Aftab, the study gods are watching.",
    "Reading a textbook is like climbing Everest in flip-flops.",
    "You're not alone. The whole class is crying.",
    "Ward duty = cardio + confusion.",
    "When in doubt, panic gently.",
    "Don’t worry, coffee has your back.",
    "One lecture closer to freedom (or madness).",
    "Today’s goal: Read one page without checking your phone.",
    "Textbooks have more plot twists than Netflix.",
    "That ‘aha’ moment after 3 hours of confusion—worth it.",
    "Clinical skills: 20% confidence, 80% guessing.",
    "You’re not procrastinating, you’re marinating in potential.",
    "Trust the process (even if it’s painful).",
    "Exam season: where dreams go to die.",
    "Dear brain, please cooperate.",
    "Don’t count the pages. Make the pages count.",
    "If studying was an Olympic sport, you'd still be watching it.",
    "“What chapter is this from?” – Med student motto.",
    "Every 5-minute break lasts 50 minutes.",
    "Take deep breaths. And maybe read too.",
    "One more topic and you’ll unlock superpowers.",
    "Even Einstein had bad days.",
    "Study mode: loading… (buffering indefinitely).",
    "Aftab, you’ve got this. Probably.",
    "Some students study. Others cry. You can do both.",
    "Your book has a crush on you—open it.",
    "Med school: 10% knowledge, 90% survival.",
    "Power nap = power failure.",
    "Breathe in motivation, breathe out fear.",
    "You’re doing better than you think. Probably.",
    "Eat. Revise. Repeat.",
    "Be the reason your seniors believe in hope.",
    "Every MCQ you solve saves a neuron.",
    "Why worry? Exams will come anyway.",
    "Real heroes don’t wear capes. They hold scalpels.",
    "You deserve a break—but not now.",
    "Medicine: the art of never finishing reading.",
    "You're one quote away from greatness. Hopefully this one.",
    "Exam tip: write with confidence, even if it’s wrong.",
    "Books won't bite. But they'll haunt you.",
    "Tomorrow is another day to panic.",
    "You snooze, you lose—attendance and sanity.",
    "You studied so hard, even your dreams are in Latin.",
    "No more ‘I’ll start at 5’. Start now.",
    "Trust yourself—your brain didn’t come this far to give up.",
    "You’re not tired. You’re transforming.",
    "Success smells like old books and coffee.",
    "Your pen misses you. Write something!",
    "Fear is temporary, med degree is forever.",
    "Nobody said it’d be easy. They were right.",
    "Every hour you study, karma claps for you.",
    "Fun fact: The brain likes effort (eventually).",
    "Be strong. Exams are temporary. Results are trauma.",
    "Aftab, breathe. Then study. Then breathe again.",
    "Pro tip: Stop scrolling. Start flipping pages.",
    "This is your sign. Do that revision now.",
    "Make today so productive, tomorrow gets jealous.",
    "You’re a legend in the making—now act like one.",
    "Less drama, more diagrams."
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
}
